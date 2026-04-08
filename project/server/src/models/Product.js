// 
const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: String,
//     price: Number,
//     image: String, // Will store base64 image data or URL
//     imageData: String, // Base64 encoded image data
//     description: String,
//     category: String,
//     stock: Number,
//   },
//   { timestamps: true }
// );
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: String,
  stock: { type: Number, required: true },
  image: { type: String, required: true }
}, { timestamps: true });


module.exports = mongoose.model("Product", productSchema);
