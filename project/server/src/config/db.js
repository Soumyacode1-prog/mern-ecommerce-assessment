const mongoose = require("mongoose");

const connectDB = async (mongoUri) => {
  if (!mongoUri) throw new Error("MongoDB URI is required");

  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB already connected.");
    return mongoose.connection;
  }

  if (mongoose.connection.readyState === 2) {
    console.log("MongoDB connection is in progress.");
    return mongoose.connection;
  }

  try {

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
    return mongoose.connection;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

module.exports = connectDB;