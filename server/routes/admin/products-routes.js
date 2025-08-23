import express from "express";
import { upload } from "../../helpers/cloudinary.js";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
  handleImageUpload,
} from "../../controllers/admin/products-controller.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add-new-product", addNewProduct);
router.get("/get-all-products", fetchAllProducts);
router.put("/update-product/:id", editProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;
