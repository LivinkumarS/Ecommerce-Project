import { Product } from "../../models/Product-Model.js";

export const fetchFilteredProducts = async (req, res) => {
  const {
    category = [],
    brand = [],
    sortBy = "price-lowtohigh",
    search = "",
  } = req.query;

  let filters = {};

  if (category.length) {
    filters.category = { $in: category.split(",") };
  }

  if (brand.length) {
    filters.brand = { $in: brand.split(",") };
  }

  if (search.trim()) {
    filters.$or = [
      { title: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  let sort = {};

  switch (sortBy) {
    case "price-lowtohigh":
      sort.price = 1;
      break;
    case "price-hightolow":
      sort.price = -1;
      break;
    case "title-ztoa":
      sort.title = -1;
      break;

    case "title-atoz":
      sort.title = 1;
      break;
    default:
      sort.price = 1;
      break;
  }

  try {
    const allProducts = await Product.find(filters).sort(sort);
    res.status(201).json({ success: true, data: allProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const fetchProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const productDetails = await Product.findById(id);
    if (productDetails._id) {
      return res.status(201).json({ success: true, data: productDetails });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
