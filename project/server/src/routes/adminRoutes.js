const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");
const { createAdmin, getAllAdmins } = require("../controllers/adminControllers");


router.post("/create-admin", protect, isAdmin, createAdmin);


router.get("/admins", protect, isAdmin, getAllAdmins);

module.exports = router;
