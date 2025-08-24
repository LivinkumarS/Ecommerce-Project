import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-[100vh] w-full">
      {/* Admin Sidebar */}
      <AdminSidebar className="min-h-full" open={open} setOpen={setOpen} />
      <div className="flex flex-1 flex-col">
        {/* Admin Header */}
        <AdminHeader setOpen={setOpen}/>
        <main className="flex-1 bg-gray-100/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
