const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  getAllProducts,
  getProductByCategoryId,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductByDiscountedPourcentage,
  getProductById,
  getProductByGender,
} = require("../controllers/ProductsController");

router.get("/getAllProducts", getAllProducts);
router.get("/getProductByGender/:gender", getProductByGender);
router.get("/getProductsByCategoryId/:categoryId", getProductByCategoryId);
router.get("/getProductById/:id", getProductById);
router.post("/addProduct", upload.single("image"), addProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:productId", deleteProduct);

module.exports = router;
