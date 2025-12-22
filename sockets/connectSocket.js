import { socket } from "./socket";

export const connectSocket = (role) => {
  if (!role) return;
  if (socket.connected) return;

  socket.auth = { role }; // ต้อง set ก่อน connect
  socket.connect();
};