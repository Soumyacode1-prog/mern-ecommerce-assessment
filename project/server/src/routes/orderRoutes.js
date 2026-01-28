
const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/", protect, async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user._id,
      ...req.body,
    });
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to create order" });
  }
});

router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;
