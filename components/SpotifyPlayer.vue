<template>
	<div></div>
</template>
<script>
const defaultVolume = 0.2;
export default {
	computed: {
		muted() {
			return this.$store.state.settings.muted;
			// Or return basket.getters.fruitsCount
			// (depends on your design decisions).
		}
	},
	watch: {
		muted(muted) {
			if (typeof window.SpotifyPlayer !== "undefined") {
				window.SpotifyPlayer.setVolume(muted ? 0 : defaultVolume);
				console.debug(
					`Spotify: Toggled player mute state to: ${
						muted ? "muted" : "unmuted"
					}`
				);
			}
		}
	},
	mounted() {
		window.onSpotifyWebPlaybackSDKReady = () => {
			// eslint-disable-next-line no-undef
			const player = new Spotify.Player({
				name: "42 Web Player",
				volume: defaultVolume,
				getOAuthToken: (cb) => {
					cb(this.$store.state.spotify.access_token);
				}
			});
			window.SpotifyPlayer = player;
			// eslint-disable-next-line camelcase

			// Error handling
			player.addListener("initialization_error", ({ message }) => {
				console.error(`Spotify: ${message}`);
			});
			player.addListener("authentication_error", ({ message }) => {
				console.error(`Spotify: ${message}`);
			});
			player.addListener("account_error", ({ message }) => {
				console.error(`Spotify: ${message}`);
			});
			player.addListener("playback_error", ({ message }) => {
				console.error(`Spotify: ${message}`);
			});

			// eslint-disable-next-line camelcase
			player.addListener("ready", ({ device_id }) => {
				// eslint-disable-next-line no-undef
				const socket = io("wss://spotify-widget.herokuapp.com", {
					transports: ["websocket"]
				});
				console.debug("Spotify: Ready with Device ID", device_id);
				socket.on("connect", () => {
					["initial_state", "track_change"].forEach((event) => {
						socket.on(event, (data) => {
							fetch(
								// eslint-disable-next-line camelcase
								`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
								{
									method: "PUT",
									body: JSON.stringify({ uris: [data.item.uri] }),
									headers: {
										"Content-Type": "application/json",
										Authorization: `Bearer ${this.$store.state.spotify.access_token}`
									}
								}
							).then((value) => {
								console.debug(
									`Spotify: Playing ${data.item.name} - ${data.item.artists[0].name}`
								);
								player.seek(data.progress_ms).then(() => {
									console.debug("Spotify: Changed player seek!");
								});
							});
						});
					});
					["seek"].forEach((event) => {
						socket.on(event, (data) => {
							// Here this timeout is well made. This is in order to fix the ms difference with the  presenter spotify account
							setTimeout(() => {
								player.seek(data).then(() => {
									console.debug("Spotify: Changed player seek!");
								});
							}, 500);
						});
					});

					socket.on("playback_paused", (data) => {
						player.pause().then(() => {
							console.debug("Spotify: Paused playback.");
						});
					});
				});
			});
			// Connect to the player!
			player.connect();
		};
	}
};
</script>
