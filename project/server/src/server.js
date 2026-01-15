
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

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

app.use("/api/orders", require("./routes/orderRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
