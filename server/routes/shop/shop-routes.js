import express from "express";
import { fetchFilteredProducts } from "../../controllers/shop/products-controller.js";

const router = express.Router();

router.get("/get", fetchFilteredProducts);

export default router;
