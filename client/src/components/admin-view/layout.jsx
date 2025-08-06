import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

export default function AdminLayout() {
  return (
    <div className="flex min-h-full w-full">
      {/* Admin Sidebar */}
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        {/* Admin Header */}
        <AdminHeader />
        <main className="flex-1 flex bg-gray-100/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
