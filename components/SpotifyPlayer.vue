<template>
  <div></div>
</template>
<script>
/* eslint-disable camelcase */
export default {
  mounted() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      // eslint-disable-next-line no-undef
      const player = new Spotify.Player({
        name: "42 Web Player",
        volume: 0.01,
        getOAuthToken: (cb) => {
          cb(this.$store.state.spotify.access_token);
        },
      });
      window.SpotifyPlayer = player;
      // Connect to the player!
      player.connect();
      // eslint-disable-next-line camelcase

      player.addListener("ready", ({ device_id }) => {
        // eslint-disable-next-line no-undef
        const socket = io("wss://spotify-widget.herokuapp.com", {
          transports: ["websocket"],
        });
        socket.on("connect", () => {
          console.log("Ready with Device ID", device_id);
          ["initial_state", "track_change"].forEach((event) => {
            socket.on(event, (data) => {
              fetch(
                `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
                {
                  method: "PUT",
                  body: JSON.stringify({ uris: [data.item.uri] }),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.$store.state.spotify.access_token}`,
                  },
                }
              ).then((value) => {
                console.log("Playing...");
              });
            });
          });
          ["seek"].forEach((event) => {
            socket.on(event, (data) => {
              player.seek(data).then(() => {
                console.log("Changed player seek!");
              });
            });
          });
        });
      });
    };
  },
};
</script>
