const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());

// i made a basic api  here fr checking
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

module.exports = app;
