import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "sonner";
import { setLoading, clearUser, setUser } from "./store/auth-slice";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/check-auth",
          {
            withCredentials: true,
            headers: {
              "Cache-Control":
                "no-store,no-cache,must-revalidate,proxy-revalidate",
              Expires: "0",
            },
          }
        );

        if (res?.data?.success) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        dispatch(clearUser());
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6 p-6 max-h-[100vh]">
        <Skeleton className="h-[200px] sm:h-400px w-full rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-[50px] sm:h-[200px] w-full rounded-2xl" />
          <Skeleton className="h-[50px] sm:h-[200px] w-full rounded-2xl" />
          <Skeleton className="h-[50px] sm:h-[200px] w-full rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <Skeleton className="h-[150px] w-full rounded-xl" />
            <Skeleton className="h-[150px] w-full rounded-xl" />
            <Skeleton className="h-[150px] w-full rounded-xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-[80px] w-full rounded-xl" />
            <Skeleton className="h-[80px] w-full rounded-xl" />
            <Skeleton className="h-[80px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Navigate to="/shop/home" />} />
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
