import { imageUploadUtil } from "../../helpers/cloudinary.js";
import { Product } from "../../models/Product-Model.js";

export const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.status(201).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export const addNewProduct = async (req, res) => {
  if (!req.user=="admin") {
    return res.status(401).json({
      success: true,
      message: "Unauthorized!",
    });
  }
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  } = req.body;
  try {
    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newProduct.save();
    res.status(201).json({
      message: "Product added successfully!",
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export const fetchAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(201).json({ success: true, data: allProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export const editProduct = async (req, res) => {
  if (!req.user=="admin") {
    return res.status(401).json({
      success: true,
      message: "Unauthorized!",
    });
  }
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  } = req.body;
  try {
    const { id } = req.params;

    const findProduct = await Product.findById(id);

    if (!findProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product is not found!" });
    }

    findProduct.image = image || findProduct.image;
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.salePrice = salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;

    await findProduct.save();

    res.status(201).json({
      success: true,
      data: findProduct,
      message: "Product Data Updated Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export const deleteProduct = async (req, res) => {
  if (!req.user=="admin") {
    return res.status(401).json({
      success: true,
      message: "Unauthorized!",
    });
  }
  try {
    const { id } = req.params;

    const findProduct = await Product.findByIdAndDelete(id);

    if (!findProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product is not found!" });
    }

    res.status(201).json({
      success: true,
      message: "Product Deleted Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};
