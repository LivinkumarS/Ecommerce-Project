import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import AdminFeatures from "./pages/admin-view/feature";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingAccount from "./pages/shopping-view/account";
import ChechAuth from "./components/common/chechAuth";
import UnAuthPage from "./pages/un-auth";
import { useSelector } from "react-redux";

export default function App() {

  const authData=useSelector(state=>state.auth)

  console.log(authData);
  

  const isAuthenticated = false;
  const user = null;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <ChechAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </ChechAuth>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route
          path="/admin"
          element={
            <ChechAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </ChechAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <ChechAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </ChechAuth>
          }
        >
          <Route path="*" element={<NotFound />} />
          <Route path="home" element={<ShoppingHome />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        <Route path="/unauth-page" element={<UnAuthPage />} />
      </Routes>
    </div>
  );
}
