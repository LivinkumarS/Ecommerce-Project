import CommonForm from "@/components/common/form";
import { loginFormControl } from "@/config";
import { setLoading, setUser } from "@/store/auth-slice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const [noSubmit, setNoSubmit] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setNoSubmit(true);
    dispatch(setLoading(true));
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
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
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        setNoSubmit(false);
      } else {
        toast.error(res.data.message);
        setNoSubmit(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
    setNoSubmit(false);
    dispatch(setLoading(false));
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Log in to your account
        </h1>
        <p>
          Don't have an account?{" "}
          <Link className="text-blue-400" to={"/auth/register"}>
            Register
          </Link>
        </p>
      </div>

      <CommonForm
        formData={formData}
        formControls={loginFormControl}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttunText={isLoading ? "Loading..." : "Log in"}
        noSubmit={noSubmit}
      />
    </div>
  );
}
