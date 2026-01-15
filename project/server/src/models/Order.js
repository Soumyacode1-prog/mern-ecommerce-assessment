// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     orderItems: [
//       {
//         product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//         name: String,
//         price: Number,
//         qty: Number,
//       },
//     ],
//     shippingAddress: {
//       address: String,
//       city: String,
//       postalCode: String,
//       country: String,
//     },
//     totalPrice: Number,
//     paymentStatus: {
//       type: String,
//       default: "Pending",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        image: String,
        description: String,
        category: String,
        qty: Number,
      },
    ],
    shippingAddress: {
      name: String,
      phone: String,
      street: String,
      city: String,
      zip: String,
    },
    totalPrice: Number,
    paymentStatus: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
