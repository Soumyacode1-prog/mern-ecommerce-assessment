
// // //   return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
// // //     expiresIn: "7d"
// // //   });
// // // };
// // // exports.registerUser = async (req, res) => {

// // //   const { name, email, password } = req.body;
// // // if (!name || !email || !password) {
// // //   return res.status(400).json({ message: "All fields are required" });
// // // }
// // // const userExists = await User.findOne({ email });
// // // res.status(201).json({
// // //   _id: user._id,
// // //   name: user.name,
// // //   email: user.email,
// // //   role: user.role,
// // //   token: generateToken(user._id)
// // // });
// // // exports.loginUser = async (req, res) => {
// // //   const { email, password } = req.body;
// // // const user = await User.findOne({ email });
// // // if (!user || !(await user.matchPassword(password))) {
// // //   return res.status(401).json({ message: "Invalid credentials" });
// // // }
// // // }}
// // const jwt = require("jsonwebtoken");
// // const User = require("../models/User");
// // const generateToken = (userId) => {
// //   return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
// //     expiresIn: "7d",
// //   });
// // };

// // exports.registerUser = async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;

// //     if (!name || !email || !password) {
// //       return res.status(400).json({ message: "All fields are required" });
// //     }

// //     const userExists = await User.findOne({ email });
// //     if (userExists) {
// //       return res.status(400).json({ message: "User already exists" });
// //     }

// //     const user = await User.create({ name, email, password });

// //     res.status(201).json({
// //       _id: user._id,
// //       name: user.name,
// //       email: user.email,
// //       role: user.role,
// //       token: generateToken(user._id),
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // exports.loginUser = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({ email });
// //     if (!user || !(await user.matchPassword(password))) {
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }

// //     res.json({
// //       _id: user._id,
// //       name: user.name,
// //       email: user.email,
// //       role: user.role,
// //       token: generateToken(user._id),
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // Generate JWT
// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// // REGISTER
// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // ✅ Validate input
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // ✅ Check existing user
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // ✅ Create user
//     const user = await User.create({
//       name,
//       email,
//       password,
//     });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.error("REGISTER ERROR:", error);
//     res.status(500).json({ message: "Server error during registration" });
//   }
// };

// // LOGIN
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password required" });
//     }

//     const user = await User.findOne({ email });

//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.error("LOGIN ERROR:", error);
//     res.status(500).json({ message: "Server error during login" });
//   }
// };
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};


exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

 
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
