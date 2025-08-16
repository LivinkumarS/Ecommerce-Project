import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChechAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  const { isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="space-y-6 p-6 max-h-[100vh]">
        {/* Hero Section */}
        <Skeleton className="h-[200px] sm:h-400px w-full rounded-2xl" />

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-[50px] sm:h-[200px] w-full rounded-2xl" />
          <Skeleton className="h-[50px] sm:h-[200px] w-full rounded-2xl" />
          <Skeleton className="h-[50px] sm:h-[200px] w-full rounded-2xl" />
        </div>

        {/* Sidebar + Content */}
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

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/shop/home")
    )
  ) {
    return <Navigate to={"/auth/login"} />;
  }
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role == "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else {
      return <Navigate to={"/shop/home"} />;
    }
  }

  if (
    isAuthenticated &&
    user?.role == "user" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to={"unauth-page"} />;
  }

  if (
    isAuthenticated &&
    user?.role == "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  return <>{children}</>;
}
