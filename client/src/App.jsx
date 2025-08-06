import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";

export default function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* Common Comp */}

      <h1>Header Component</h1>

      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </div>
  );
}
