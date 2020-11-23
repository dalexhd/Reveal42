import io from "socket.io-client";

const socket = io.connect("/public");

socket.on("connect", () => {
  console.log("Connected to public socket");
});

export default socket;
