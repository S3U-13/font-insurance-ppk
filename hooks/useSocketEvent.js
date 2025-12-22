import { useEffect } from "react";
import { socket } from "@/sockets/socket";

export const useSocketEvent = (eventName, handler) => {
  useEffect(() => {
    if (!socket) return;

    socket.on(eventName, handler);

    return () => {
      socket.off(eventName, handler);
    };
  }, [eventName, handler]);
};
