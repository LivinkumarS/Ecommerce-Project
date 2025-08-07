import CommonForm from "@/components/common/form";
import { registerFormControl } from "@/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const onSubmit = () => {};

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create a new account
        </h1>
        <p>
          Already have an account? <Link to={"/auth/login"}>Sign in</Link>
        </p>
      </div>

      <CommonForm
        formData={formData}
        formControls={registerFormControl}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttunText={"Register"}
      />
    </div>
  );
}
