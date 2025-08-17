import { AlignJustify, LogOut } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { clearUser, setLoading } from "@/store/auth-slice";
import { toast } from "sonner";
import axios from "axios";

export default function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
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
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        className="lg:hidden cursor-pointer"
      >
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex flex-1 justify-end">
        <Button onClick={logout}>
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}
