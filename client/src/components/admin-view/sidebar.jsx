import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ListOrdered,
  ShoppingBasket,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

export default function AdminSidebar({ open, setOpen }) {
  const adminSidebarMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      id: "products",
      label: "Products",
      path: "/admin/products",
      icon: <ShoppingBasket />,
    },
    {
      id: "orders",
      label: "Orders",
      path: "/admin/orders",
      icon: <ListOrdered />,
    },
  ];

  const navigate = useNavigate();

  function MenuItems() {
    return (
      <nav className="mt-8 flex flex-col gap-2">
        {adminSidebarMenuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setOpen ? setOpen(false) : null;
              navigate(item.path);
            }}
            className="cursor-pointer flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    );
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle
                onClick={() => {
                  setOpen(false);
                  navigate("/admin/dashboard");
                }}
                className="flex items-center justify-start gap-2"
              >
                <ChartNoAxesCombined />
                Admin Panel
              </SheetTitle>
            </SheetHeader>
            <MenuItems />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="w-64 hidden flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => {
            navigate("dashboard");
          }}
          className="cursor-pointer flex items-center gap-2"
        >
          <ChartNoAxesCombined />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
}
