/* global spotifyUrl */
/* global Reveal */
import io from "socket.io-client";

const initClient = function (Reveal) {
  const socket = io.connect("/public");

  socket.on("statechanged", function (data) {
    Reveal.setState(data.state);
  });

  socket.on("plyrchanged", function ({
    event,
    data: { id, currentTime, paused, playing, ended },
  }) {
    const player = document.getElementById(id);
    switch (event) {
      case "play":
        player.play();
        break;
      case "pause":
        player.pause();
        break;
      case "currentState":
        if (Math.abs(currentTime - player.currentTime) > 0.3)
          player.currentTime = currentTime;
        if (player.paused !== paused && paused === true) player.pause();
        if (player.play !== playing && playing === true) player.play();
        break;
      case "seeked":
        player.currentTime = currentTime;
        break;
      default:
    }
  });
};

export default () => {
  return {
    id: "RevealClient",
    init(Reveal) {
      initClient(Reveal);
    },
  };
};