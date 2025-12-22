// hooks/useSocket.js
import { useEffect, useRef } from "react";
import { socket } from "../sockets/socket"; // ✅ ต้อง import แบบนี้

export const useSocket = (onUpdate) => {
  const callbackRef = useRef(onUpdate);

  useEffect(() => {
    callbackRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    const handler = (payload) => {
      callbackRef.current?.(payload);
    };

    socket.on("claim:listChanged", handler);

    return () => {
      socket.off("claim:listChanged", handler);
    };
  }, []);
};
