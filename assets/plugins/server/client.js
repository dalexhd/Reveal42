/* global spotifyUrl */
/* global Reveal */
import io from "socket.io-client";

const initClient = function (Reveal) {
	// don't emit events from inside the previews themselves

	if (window.location.search.match(/receiver/gi)) return;
	const server = Reveal.getConfig().server;
	const socket = io.connect("/admin", {
		transportOptions: {
			polling: {
				extraHeaders: {
					Authorization: server.secret
				}
			}
		}
	});
	socket.on("error", (e) => console.error(e));

	console.log(`View presenter notes at ${window.location.origin}/notes`);

	let spotifyIframe = null;
	const removeSpotifyÌframe = function () {
		spotifyIframe = document.querySelector("iframe[src*='/player']");
		if (spotifyIframe !== null) spotifyIframe.remove();
		spotifyIframe = null;
	};

	window.onbeforeunload = function () {
		removeSpotifyÌframe();
	};

	/**
	 * Posts the current slide data to the viewers
	 */
	function postServer() {
		socket.emit("statechanged", {
			state: Reveal.getState()
		});
	}

	/**
	 * Posts the current slide data to the notes window
	 */
	function post() {
		const slideElement = Reveal.getCurrentSlide();
		const notesElement = slideElement.querySelector("aside.notes");

		const messageData = {
			notes: "",
			markdown: false,
			state: Reveal.getState()
		};

		// Look for notes defined in a slide attribute
		if (slideElement.hasAttribute("data-notes")) {
			messageData.notes = slideElement.getAttribute("data-notes");
		}

		// Look for notes defined in an aside element
		if (notesElement) {
			messageData.notes = notesElement.innerHTML;
			messageData.markdown =
				typeof notesElement.getAttribute("data-markdown") === "string";
		}
		socket.emit("statechanged", messageData);
	}

	// When a new notes window connects, post our current state
	socket.on("new-subscriber", function (data) {
		post();
	});

	// When the state changes from inside of the speaker view
	socket.on("statechanged-speaker", function (data) {
		Reveal.setState(data.state);
	});

	// Monitor events that trigger a change in state
	["slidechanged", "ready"].forEach((event) => {
		Reveal.on(event, (data) => {
			if (data.indexh === 0 || data.indexh === 2) {
				removeSpotifyÌframe();
			} else if (
				data.indexh === 1 &&
				spotifyIframe === null &&
				typeof spotifyUrl !== "undefined"
			) {
				const iframe = document.createElement("iframe");
				iframe.style.display = "none";
				iframe.setAttribute("allow", "encrypted-media, autoplay");
				iframe.src = `${spotifyUrl}/player`;
				document.body.appendChild(iframe);
			}
			post();
		});
	});
	[
		"fragmentshown",
		"fragmenthidden",
		"overviewhidden",
		"overviewshown",
		"paused",
		"resumed"
	].forEach((event) => {
		Reveal.on(event, post);
	});

	socket.on(
		"plyrchanged-speaker",
		function ({
			event,
			data,
			data: { id, currentTime, paused, playing, ended, volume }
		}) {
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
				case "seeked":
					player.currentTime = currentTime;
					break;
				case "currentState":
					// TODO: Here we need to fix the loop.
					if (Math.abs(currentTime - player.currentTime) > 1)
						player.currentTime = currentTime;
					if (player.paused !== paused && paused === true) player.pause();
					if (player.play !== playing && playing === true) player.play();
					break;
				case "volumechange":
					player.volume = volume;
					break;
				default:
					return;
			}

			if (
				/ready|play|pause|seeked|volumechange|timeupdate|currentState/.test(
					event
				)
			) {
				const messageData = {
					data,
					event
				};
				socket.emit("plyrchanged", messageData);
			}
		}
	);
};

export default () => {
	return {
		id: "RevealClient",
		init(Reveal) {
			initClient(Reveal);
		}
	};
};
