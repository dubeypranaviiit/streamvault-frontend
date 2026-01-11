
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  console.log("AUTH EFFECT START");

  const loadUser = async () => {
    try {
      console.log("CALLING /auth/me");
      const { data } = await api.get("/auth/me");
      console.log("AUTH SUCCESS:", data.user);
      setUser(data.user);
    } catch (err) {
      console.log("AUTH FAILED");
      setUser(null);
    } finally {
      console.log("AUTH LOADING FALSE");
      setLoading(false);
    }
  };

  loadUser();
}, []);
const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setUser(data.user);
  };

  const signup = async (name, email, password) => {
    const { data } = await api.post("/auth/signup", {
      name,
      email,
      password,
    });
    setUser(data.user);
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
       isAuthenticated: !!user ,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
