const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
const xlsx = require("xlsx");
const Product = require("../models/Product");
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/isAdmin");

const router = express.Router();


router.post(
  "/bulk-preview",
  protect,
  isAdmin,
  upload.single("file"),
  async (req, res) => {
    try {
      let rows = [];

      if (req.file.mimetype.includes("csv")) {
        fs.createReadStream(req.file.path)
          .pipe(csv())
          .on("data", (data) => rows.push(data))
          .on("end", () => res.json(rows));
      } else {
        const workbook = xlsx.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        rows = xlsx.utils.sheet_to_json(sheet);
        res.json(rows);
      }
    } catch (err) {
      res.status(500).json({ message: "Failed to parse file" });
    }
  }
);


router.post(
  "/bulk-save",
  protect,
  isAdmin,
  async (req, res) => {
    const products = req.body; 
    const results = [];

    for (let p of products) {
      try {
        await Product.create({
          name: p.name,
          price: p.price,
          description: p.description,
          category: p.category,
          stock: p.stock,
          imageUrl: p.imageUrl
        });
        results.push({ name: p.name, status: "SUCCESS" });
      } catch (err) {
        results.push({
          name: p.name,
          status: "FAILED",
          error: err.message
        });
      }
    }

    res.json({
      message: "Bulk upload completed",
      results
    });
  }
);

module.exports = router;
