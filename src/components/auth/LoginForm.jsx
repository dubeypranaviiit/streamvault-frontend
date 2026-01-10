import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
export default function LoginForm({ switchMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
   const { login } = useContext(AuthContext);
   const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
        navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };


  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10
      bg-zinc-900/70 backdrop-blur-xl shadow-2xl p-8">
      <h2 className="text-3xl font-bold text-center text-white">
        Welcome Back
      </h2>
      <p className="text-center text-sm text-zinc-400 mt-1">
        Sign in to continue
      </p>
      {error && (
        <div className="mt-5 rounded-lg bg-red-500/10 text-red-400 px-4 py-2 text-sm border border-red-500/20">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg bg-zinc-800/80 px-4 py-3
            text-white placeholder-zinc-500
            border border-zinc-700
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40
            outline-none transition"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg bg-zinc-800/80 px-4 py-3
            text-white placeholder-zinc-500
            border border-zinc-700
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40
            outline-none transition"
          required
        />
        <button
          type="submit"
          className="w-full rounded-lg py-3 font-semibold text-white
            bg-linear-to-r from-indigo-500 to-violet-600
            hover:from-indigo-600 hover:to-violet-700
            shadow-lg shadow-indigo-500/25
            transition active:scale-[0.98]"
        >
          Sign In
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-400">
        Don’t have an account?{" "}
        <button
          onClick={switchMode}
          className="text-indigo-400 hover:text-indigo-300 font-medium"
        >
          Create one
        </button>
      </p>
    </div>
  );
}
