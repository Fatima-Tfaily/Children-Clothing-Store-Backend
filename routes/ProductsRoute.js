const express = require("express");
const router = express.Router();

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
router.post("/add", addProduct);
router.put("/update/:productId", updateProduct);
router.delete("/delete/:productId", deleteProduct);

module.exports = router;
