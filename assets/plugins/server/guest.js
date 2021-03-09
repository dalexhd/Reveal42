/* global spotifyUrl */
/* global Reveal */

const initClient = function (Reveal) {
  const socket = require("./socket").default;
  socket.on("statechanged", function (data) {
    // Ignore events if we are not following the pressenter. By default we follow the pressenter.
    if (!window.$nuxt.$store.app.store.state.settings.follow) return;
    Reveal.setState(data.state);
  });

  socket.on(
    "plyrchanged",
    function ({ event, data: { id, currentTime, paused, playing, ended } }) {
      // Ignore events if we are not following the pressenter. By default we follow the pressenter.
      if (!window.$nuxt.$store.app.store.state.settings.follow) return;
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
    }
  );
};

export default () => {
  return {
    id: "RevealClient",
    init(Reveal) {
      initClient(Reveal);
    },
  };
};
