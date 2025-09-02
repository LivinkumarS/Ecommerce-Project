import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  isLoading: false,
};

export const fetchFilteredProducts = createAsyncThunk(
  "/products/fetchFilteredProducts",
  async ({ filterParams, sortParams, search }) => {

    const query = new URLSearchParams({ ...filterParams, sortBy: sortParams, search:search });
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
    );
    return result?.data;
  }
);

const shopProductSlice = createSlice({
  name: "adminProductSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default shopProductSlice.reducer;
