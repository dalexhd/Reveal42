import http from "http";
import SocketIO from "socket.io";
import axios from "axios";

export default function ({ $auth }) {
  this.nuxt.hook("render:before", (renderer) => {
    const server = http.createServer(this.nuxt.renderer.app);
    const io = SocketIO(server);

    // overwrite nuxt.server.listen()
    // For some reason, I need to get this config values.
    const { host, port } = this.nuxt.options.server;
    this.nuxt.server.listen = () =>
      new Promise((resolve) =>
        server.listen(port || 3000, host || "localhost", resolve)
      );
    // close this server on 'close' event
    this.nuxt.hook("close", () => new Promise(server.close));

    const adminNamespace = io.of("/admin");
    const publicNamespace = io.of("/public");

    adminNamespace.use(async (socket, next) => {
      const bearerToken = socket.handshake.headers.authorization;
      try {
        const { data } = await axios.request({
          method: "GET",
          url: "https://api.intra.42.fr/oauth/token/info",
          headers: {
            Accept: "application/json",
            Authorization: bearerToken,
          },
        });
        const { PRESENTER_INTRA_ID, BROADCASTER_INTRA_ID } = process.env;
        if (
          [
            parseInt(PRESENTER_INTRA_ID, 10),
            parseInt(BROADCASTER_INTRA_ID, 10),
          ].includes(data.resource_owner_id)
        ) {
          return next();
        } else {
          return next(new Error("Not authorized broadcaster or presenter"));
        }
      } catch (error) {
        if (error.response.data) {
          return next(
            new Error(
              "Intra authentication error: " +
                error.response.data.error_description
            )
          );
        }
        return next(new Error("Authentication error: " + error));
      }
    });

    adminNamespace.on("connection", (socket) => {
      console.log("Admin connected");
      socket.on("new-subscriber", (data) => {
        socket.broadcast.emit("new-subscriber", data);
      });

      socket.on("statechanged", (data) => {
        delete data.state.overview;
        socket.broadcast.emit("statechanged", data);
        delete data.notes;
        publicNamespace.emit("statechanged", data);
      });

      socket.on("statechanged-speaker", (data) => {
        delete data.state.overview;
        socket.broadcast.emit("statechanged-speaker", data);
      });

      // socket.on('plyrchanged', data => {
      //     socket.broadcast.emit('plyrchanged', data);
      // });

      socket.on("plyrchanged-speaker", (data) => {
        socket.broadcast.emit("plyrchanged-speaker", data);
      });

      socket.on("plyrchanged", (data) => {
        delete data.secret;
        publicNamespace.emit("plyrchanged", data);
      });
    });

    publicNamespace.on("connection", (socket) => {
      console.log("Client connected!");
      socket.on("disconnect", () => {
        console.log("Client disconnected!");
      });
    });
  });
}
