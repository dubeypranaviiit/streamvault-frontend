"use client";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import LoginForm from "../components/auth/LoginForm.jsx";
import SignupForm from "../components/auth/SignupForm.jsx";

export default function AuthPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const [mode, setMode] = useState("login");
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
 <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-zinc-900 to-black px-4">
  {mode === "login" ? (
    <LoginForm switchMode={() => setMode("signup")} />
  ) : (
    <SignupForm switchMode={() => setMode("login")} />
  )}
</div>

  );
}
