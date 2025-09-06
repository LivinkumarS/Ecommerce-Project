import express from "express";
import {
  fetchFilteredProducts,
  fetchProductDetails,
} from "../../controllers/shop/products-controller.js";

const router = express.Router();

router.get("/get", fetchFilteredProducts);
router.get("/get/:id", fetchProductDetails);

export default router;
