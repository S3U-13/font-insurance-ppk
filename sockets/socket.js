//sockets/socket.js
import { io } from "socket.io-client";

export const socket = io("http://172.16.46.34:4003", {
  autoConnect: false,
  transports: ["websocket"], // แนะนำ
});
