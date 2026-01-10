import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function SignupForm({ switchMode }) {
   const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(form.name, form.email, form.password);
        navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };


  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10
      bg-zinc-900/70 backdrop-blur-xl shadow-2xl p-8">
   
      <h2 className="text-2xl font-bold text-center text-white">
        Create Account
      </h2>
      <p className="text-center text-sm text-zinc-400 mt-1">
        Start your workspace
      </p>

      {error && (
        <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          placeholder="Full name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
           className="w-full rounded-lg bg-zinc-800/80 px-4 py-3
            text-white placeholder-zinc-500
            border border-zinc-700
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40
            outline-none transition"
          required
          />

        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
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
          onChange={(e) => setForm({ ...form, password: e.target.value })}
           className="w-full rounded-lg bg-zinc-800/80 px-4 py-3
            text-white placeholder-zinc-500
            border border-zinc-700
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40
            outline-none transition"
          required
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-linear-to-r from-indigo-500 to-violet-600 hover:opacity-90 text-white font-semibold py-2.5 transition"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <button
          onClick={switchMode}
          className="text-indigo-400 hover:text-indigo-300 font-medium"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
