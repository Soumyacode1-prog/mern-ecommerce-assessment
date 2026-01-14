
const express = require("express");
const rateLimit = require("express-rate-limit");
const OpenAI = require("openai"); // require the package
const Product = require("../models/Product");

const router = express.Router();


if (!process.env.OPENAI_API_KEY) {
  console.warn("⚠️ WARNING: OPENAI_API_KEY is not set in environment variables. Chatbot will not work.");
}

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
});

router.post("/", limiter, async (req, res) => {
  const { message, user } = req.body;

  if (!message || message.trim().length < 2) {
    return res.json({ reply: "Please enter a valid question 😊" });
  }


  if (!openai) {
    return res.json({
      reply: "⚠️ Chatbot service is not configured. Please set OPENAI_API_KEY in your environment variables."
    });
  }

  try {
   
    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You extract intent from shopping queries.
Return ONLY JSON:

{
  "intent": "...",
  "product": "",
  "category": "",
  "price": null
}

Possible intents:
availability, search, details, cheapest, categories, help, policy
          `,
        },
        { role: "user", content: message },
      ],
      temperature: 0,
    });

    // Parse response
    const parsed = JSON.parse(ai.choices[0].message.content);

    let reply = "";

    switch (parsed.intent) {
      case "availability": {
        const p = await Product.findOne({ name: new RegExp(parsed.product, "i") });
        if (!p) reply = `Sorry, we don't have ${parsed.product}`;
        else if (p.stock === 0) reply = `${p.name} is currently out of stock`;
        else reply = `Yes! ${p.name} is in stock (${p.stock} available)`;
        break;
      }

      case "search": {
        const products = await Product.find({
          category: parsed.category,
          price: { $lte: parsed.price || Infinity },
        });

        if (!products.length) reply = "No products found matching your criteria.";
        else reply = products.map((p) => `${p.name} — ₹${p.price}`).join("\n");
        break;
      }

      case "details": {
        const p = await Product.findOne({ name: new RegExp(parsed.product, "i") });
        if (!p) reply = `Sorry, we don't have ${parsed.product}`;
        else reply = `${p.name}\n₹${p.price}\n${p.description}`;
        break;
      }

      case "cheapest": {
        const p = await Product.findOne().sort({ price: 1 });
        reply = p ? `Cheapest: ${p.name} — ₹${p.price}` : "No products found.";
        break;
      }

      case "categories": {
        const cats = await Product.distinct("category");
        reply = `We sell: ${cats.join(", ")}`;
        break;
      }

      case "help":
        reply = "Add items to cart → Checkout → Enter address → Confirm order.";
        break;

      case "policy":
        reply = "We offer 7-day returns on unused products with original packaging.";
        break;

      default:
        reply = "Sorry, I couldn't understand your request.";
    }

    return res.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return res.json({
      reply: "⚠️ Our assistant is temporarily unavailable. Please try again later.",
    });
  }
});

module.exports = router;