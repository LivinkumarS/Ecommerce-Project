import CommonForm from "@/components/common/form";
import { loginFormControl } from "@/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = () => {};

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Log in to your account
        </h1>
        <p>
          Don't have an account? <Link className="text-blue-400" to={"/auth/register"}>Register</Link>
        </p>
      </div>

      <CommonForm
        formData={formData}
        formControls={loginFormControl}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttunText={"Log in"}
      />
    </div>
  );
}
