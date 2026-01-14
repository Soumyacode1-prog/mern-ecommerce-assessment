const User = require("../models/User");


exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const admin = await User.create({
      name,
      email,
      password,
      role: "admin"
    });

 
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      createdAt: admin.createdAt
    });
  } catch (error) {
    console.error("CREATE ADMIN ERROR:", error);
    res.status(500).json({ message: "Server error while creating admin" });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(admins);
  } catch (error) {
    console.error("GET ADMINS ERROR:", error);
    res.status(500).json({ message: "Server error while fetching admins" });
  }
};
