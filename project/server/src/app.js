
const express = require("express");
const cors = require("cors");

const app = express();

//cors
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);

module.exports = app;
