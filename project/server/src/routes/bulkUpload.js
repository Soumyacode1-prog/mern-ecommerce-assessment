
const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const XLSX = require("xlsx");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

const router = express.Router();

const upload = multer({ dest: "uploads/" });



router.post(
  "/products/bulk-upload",
  protect,
  isAdmin,
  upload.single("file"),
  async (req, res) => {
    const filePath = req.file.path;
    const fileExt = req.file.originalname.split(".").pop();

    let rows = [];

    try {
   
      if (fileExt === "csv") {
        rows = await new Promise((resolve, reject) => {
          const results = [];
          fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => resolve(results))
            .on("error", reject);
        });
      }

  
      if (fileExt === "xlsx") {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        rows = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );
      }

   
      let success = [];
      let failed = [];

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        const errors = [];

        if (!row.name) errors.push("Name is required");
        if (!row.price || isNaN(row.price)) errors.push("Invalid price");
        if (!row.category) errors.push("Category is required");
        if (row.stock === undefined || isNaN(row.stock))
          errors.push("Invalid stock");

        if (errors.length > 0) {
          failed.push({
            row: i + 1,
            data: row,
            errors
          });
          continue;
        }

        try {
          const product = await Product.create({
            name: row.name,
            price: Number(row.price),
            description: row.description || "",
            category: row.category,
            stock: Number(row.stock),
            imageUrl: row.imageUrl || ""
          });

          success.push(product);
        } catch (err) {
          failed.push({
            row: i + 1,
            data: row,
            errors: [err.message]
          });
        }
      }

      fs.unlinkSync(filePath);

      return res.json({
        totalRows: rows.length,
        successCount: success.length,
        failureCount: failed.length,
        failedRows: failed
      });
    } catch (error) {
      fs.unlinkSync(filePath);
      res.status(500).json({ message: "Bulk upload failed" });
    }
  }
);

module.exports = router;
