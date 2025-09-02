import {
  HousePlug,
  LogIn,
  LogOutIcon,
  Menu,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingVieewHeadersMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { clearUser, setLoading } from "@/store/auth-slice";
import { toast } from "sonner";
import axios from "axios";

function MenuItems({ setSheetOpen }) {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingVieewHeadersMenuItems.map((item) => (
        <Link
          className="text-sm font-medium"
          onClick={() => setSheetOpen(false)}
          key={item.id}
          to={item.path}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function HeaderRightContent({ user }) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (response?.data?.success) {
        toast.success(response.data.message);
        dispatch(clearUser());
        navigate("/auth/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button className="w-8 h-8" variant="outline" size="icon">
        <ShoppingCart className="h-6 w-6" />
        <span className="sr-only">User cart</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName.split(" ").map((item) => {
                let ans = "";
                ans += item[0].toUpperCase();
                return ans;
              })}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" className="w-56 px-3 lg:mt-5">
          <DropdownMenuLabel className="font-semibold">
            Logged in as {user?.userName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigate("/shop/account");
            }}
          >
            <UserCog className="mr2 w-4 h-4" />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOutIcon className="mr2 w-4 h-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen} className="lg:hidden">
        <SheetTrigger asChild>
          <Button varient="outline" size="icon" className="lg:hidden order-1">
            <Menu />
            <span className="sr-only">Toggle menu icon</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-[250px]">
          <MenuItems setSheetOpen={setSheetOpen} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 w-full z-40 border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to={"/shop/home"} className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold ">Ecommerce</span>
        </Link>

        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {isAuthenticated ? (
          <HeaderRightContent user={user} />
        ) : (
          <Button>
            <Link to={"/auth/login"} className="flex items-center gap-2">
              <LogIn className="w-6 h-6" />
              Login
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
