import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import adminProductReducer from "./admin/products-slice/index.js";
import shopProductReducer from "./shop/product-slice/index.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductReducer,
    shopProducts: shopProductReducer,
  },
});

export default store;
