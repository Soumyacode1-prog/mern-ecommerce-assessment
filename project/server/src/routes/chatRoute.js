
const express = require("express");
const rateLimit = require("express-rate-limit");
const OpenAI = require("openai");
const Product = require("../models/Product");

const router = express.Router();


const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
});


const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});


router.post("/", limiter, async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim().length < 2) {
    return res.json({ reply: "Please ask a valid question 😊" });
  }

  try {
   
    const ai = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      temperature: 0,
      messages: [
        {
          role: "system",
          content: `
You are a store assistant. Extract intent from the user's query and return ONLY JSON:

{
  "intent": "",
  "product": "",
  "category": "",
  "price": null
}

Allowed intents:
availability, details, search, cheapest, categories, policy, help
`
        },
        { role: "user", content: message },
      ],
    });

    let parsed;
    try {
      parsed = JSON.parse(ai.choices[0].message.content);
    } catch {
      return res.json({ reply: "❌ Sorry, I couldn't understand your question." });
    }

    let reply = "";

    switch (parsed.intent) {
      case "availability": {
        if (!parsed.product) {
          reply = "Please specify a product name to check availability.";
          break;
        }
        const p = await Product.findOne({ name: new RegExp(parsed.product, "i") });
        if (!p) reply = `❌ "${parsed.product}" is not available.`;
        else if (p.countInStock <= 0) reply = `${p.name} is currently out of stock.`;
        else reply = `✅ ${p.name} is in stock (${p.countInStock} left).`;
        break;
      }

      case "details": {
        if (!parsed.product) {
          reply = "Please specify a product name to get details.";
          break;
        }
        const p = await Product.findOne({ name: new RegExp(parsed.product, "i") });
        reply = p
          ? `🛍 ${p.name}\n💰 ₹${p.price}\n📦 Stock: ${p.countInStock}\n📝 ${p.description}`
          : `❌ Product "${parsed.product}" not found.`;
        break;
      }

      case "search": {
        const query = {};
        if (parsed.category) query.category = new RegExp(parsed.category, "i");
        if (parsed.price) query.price = { $lte: parsed.price };

        const products = await Product.find(query).limit(5);
        reply = products.length
          ? products.map(p => `${p.name} — ₹${p.price}`).join("\n")
          : "No matching products found.";
        break;
      }

      case "cheapest": {
        const p = await Product.findOne().sort({ price: 1 });
        reply = p
          ? `💸 Cheapest product: ${p.name} — ₹${p.price}`
          : "No products available.";
        break;
      }

      case "categories": {
        const cats = await Product.distinct("category");
        reply = cats.length
          ? `📦 We sell: ${cats.join(", ")}`
          : "No categories available.";
        break;
      }

      case "policy":
        reply = "🔁 We offer a 7-day return policy on unused items.";
        break;

      case "help":
        reply = "🛒 Add products → Go to cart → Checkout → Enter address → Place order.";
        break;

      default:
        reply = "Sorry, I can only answer store-related questions.";
    }

    return res.json({ reply });

  } catch (err) {
    console.error("OpenRouter error:", err);
    return res.json({ reply: "⚠️ Chatbot is temporarily unavailable. Please try again later." });
  }
});

module.exports = router;
