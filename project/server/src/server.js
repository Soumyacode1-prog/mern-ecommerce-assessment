
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const path = require("path");
const app = express();

const _dirname=path.resolve();

app.use(cors({
  origin: true, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


app.use('/uploads', express.static('uploads'));

// DB
connectDB(process.env.MONGO_URI);


app.use("/api/products", require("./routes/productRoutes"));

app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/chat", require("./routes/chatRoute"));

app.use("/api/admin", require("./routes/adminProductRoutes"));

app.use("/api/admin/users", require("./routes/adminRoutes"));

// app.use("/api/orders", require("./routes/orderRoutes"));
app.use(express.static(path.join(__dirname, "../../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/build/index.html"));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
