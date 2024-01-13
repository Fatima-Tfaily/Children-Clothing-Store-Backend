const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const {
  getAllCategories,
  getCategoryByID,
  getCategoryByGender,
  updateCategory,
  deleteCategory,
  addCategory,
} = require("../controllers/CategoriesController");

router.get("/", getAllCategories);
router.get("/getByID/:categoryId", getCategoryByID);
router.get("/getByGender/:gender", getCategoryByGender);
router.post("/addCategory", upload.single("image"), addCategory);
router.put("/updateCategory/:categoryId", updateCategory);
router.delete("/deleteCategory/:categoryId", deleteCategory);

module.exports = router;
