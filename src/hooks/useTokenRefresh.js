import { useEffect } from "react";
import api from "../api/axios";

const REFRESH_INTERVAL = 14 * 60 * 1000;

export const useRefreshToken = (user) => {
  useEffect(() => {
    if (!user) return; 

    const refresh = async () => {
      try {
        await api.post("/auth/refresh");
      } catch {
        console.error("Failed to refresh token");
      }
    };

    const interval = setInterval(refresh, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [user]);
};
