//sockets/socket.js
import { io } from "socket.io-client";

export const socket = io("http://172.16.46.34:4005", {
  autoConnect: false,
  transports: ["websocket"], // แนะนำ
});
