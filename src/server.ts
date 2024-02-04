import { initLogo } from "./utils/canvas";
import app from "./app";
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";

export const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const port = process.env.PORT || 5000;

initLogo()
  .then(() => {
    io.on("connection", (socket) => {
      console.log(`A new user just joined ${socket.request.url}`);
    });

    server.listen(port, () => {
      console.log(`Listening: *:${port}`);
    });
  })
  .catch(console.log);
