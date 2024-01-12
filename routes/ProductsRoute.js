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
  getProductByPrice,
} = require("../controllers/ProductsController");

router.get("/getAllProducts", getAllProducts);
router.get("/getProductsByCategoryId/:categoryId", getProductByCategoryId);
router.get(
  "/getProductByDiscountedPourcentage/:discountedPourcentage",
  getProductByDiscountedPourcentage
);
router.get("/getProductByPrice/:price", getProductByPrice);
router.post("/addProduct", upload.single("image"), addProduct);
router.put("/update/:productId", updateProduct);
router.delete("/delete/:productId", deleteProduct);

module.exports = router;
