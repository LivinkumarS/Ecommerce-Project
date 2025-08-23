import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    brand: String,
    category: String,
    description: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
