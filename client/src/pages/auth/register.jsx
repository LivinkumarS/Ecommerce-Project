import CommonForm from "@/components/common/form";
import { registerFormControl } from "@/config";
import { setLoading } from "@/store/auth-slice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function RegisterPage() {
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        { withCredentials: true }
      );

      if (response?.data?.success) {
        toast.success(response.data.message);
        navigate("/auth/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }

    dispatch(setLoading(false));
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create a new account
        </h1>
        <p>
          Already have an account?{" "}
          <Link className="text-blue-400" to={"/auth/login"}>
            Sign in
          </Link>
        </p>
      </div>

      <CommonForm
        formData={formData}
        formControls={registerFormControl}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttunText={isLoading ? "Loading..." : "Register"}
      />
    </div>
  );
}
