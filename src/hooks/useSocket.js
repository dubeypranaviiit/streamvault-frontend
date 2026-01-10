import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;


export const useSocket = (userId, onProgress, onComplete) => {
  const completedRef = useRef(false);

  useEffect(() => {
    if (!userId) return;

    const socket = io(SOCKET_URL, {
      withCredentials: true,
    });

    socket.emit("join", userId);

    socket.on("video-progress", (data) => {
      if (completedRef.current) return;
      onProgress(data);
    });

    socket.on("video-complete", (data) => {
      completedRef.current = true; // 🔒 lock state
      onComplete(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);
};
