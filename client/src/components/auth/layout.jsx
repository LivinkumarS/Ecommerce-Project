import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Section 1 */}
      <div className="hidden lg:flex items-center justify-center bg-black flex-1 w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-[#f8fafc]">
          <h1 className="font-extrabold text-4xl tracking-tight">
            Welcome to eCommerce Shopping
          </h1>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-white  px-4 py-12 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}
