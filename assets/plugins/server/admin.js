import io from "socket.io-client";
import marked from "marked";
import * as Cookies from "js-cookie";
(function () {
	let notes;
	let notesValue;
	let controls;
	let currentState;
	const currentSlide = document.getElementById("current-slide");
	const upcomingSlide = document.getElementById("upcoming-slide");
	let layoutLabel;
	let layoutDropdown;
	let connected = false;
	let lastEvent = new Date();

	// alert volume notice
	const lastNoticeValue = sessionStorage.getItem("volume-noticed");
	if (!lastNoticeValue) {
		alert("Remember to mute your browser before going live!");
		sessionStorage.setItem("volume-noticed", true);
	}
	const socket = io.connect("/admin", {
		transportOptions: {
			polling: {
				extraHeaders: {
					// eslint-disable-next-line no-undef
					Authorization: `Bearer ${Cookies.get("intra.access_token")}`
				}
			}
		}
	});

	/**
	 * Called when the main window sends an updated state.
	 */
	const handleStateMessage = debounce((data) => {
		// Store the most recently set state to avoid circular loops
		// applying the same state
		currentState = JSON.stringify(data.state);

		// No need for updating the notes in case of fragment changes
		if (data.notes) {
			notes.classList.remove("d-none");
			if (data.markdown) {
				notes.innerHTML = marked(data.notes);
			} else {
				notes.innerHTML = data.notes;
			}
		} else {
			notes.classList.add("d-none");
		}

		// Update the note slides
		currentSlide.contentWindow.postMessage(
			JSON.stringify({ method: "setState", args: [data.state] }),
			"*"
		);
		upcomingSlide.contentWindow.postMessage(
			JSON.stringify({ method: "setState", args: [data.state] }),
			"*"
		);
		upcomingSlide.contentWindow.postMessage(
			JSON.stringify({ method: "next" }),
			"*"
		);
	}, 200);

	socket.on("statechanged", function (data) {
		if (connected === false) {
			connected = true;
			setupKeyboard();
			setupNotes();
			// setupTimer();
		}
		handleStateMessage(data);
	});

	// Load our presentation controls
	// setupControls();

	// Once the iframes have loaded, emit a signal saying there's
	// a new subscriber which will trigger a 'statechanged'
	// message to be sent back
	window.addEventListener("message", function (event) {
		const data = JSON.parse(event.data);
		if (data) {
			switch (data.namespace) {
				case "reveal":
					if (/ready/.test(data.eventName)) {
						socket.emit("new-subscriber");
					}
					if (
						/slidechanged|fragmentshown|fragmenthidden|overviewshown|overviewhidden|paused|resumed/.test(
							data.eventName
						) &&
						currentState !== JSON.stringify(data.state) &&
						new Date() - lastEvent > 400
					) {
						socket.emit("statechanged-speaker", { state: data.state });
						lastEvent = new Date();
					}
					break;
				case "plyr":
					if (
						/ready|play|pause|seeked|volumechange|timeupdate|currentState/.test(
							data.type
						)
					) {
						socket.emit("plyrchanged-speaker", { event: data.type, ...data });
					}
					break;
				default:
					break;
			}
		}
	});

	/**
	 * Forward keyboard events to the current slide window.
	 * This enables keyboard events to work even if focus
	 * isn't set on the current slide iframe.
	 */
	function setupKeyboard() {
		document.addEventListener("keydown", function (event) {
			currentSlide.contentWindow.postMessage(
				JSON.stringify({ method: "triggerKey", args: [event.keyCode] }),
				"*"
			);
		});
	}

	/**
	 * Setup the notes UI.
	 */
	function setupNotes() {
		notes = document.querySelector("#speaker-notes");
	}

	/**
	 * Setup the notes UI.
	 */
	// function setupControls() {
	//   const sideMenu = document.querySelector(".speaker-controls #side-menu");
	//   const slide = currentSlide.contentWindow;
	//   slide.addEventListener("menu-ready", function (event) {
	//     const open = slide.document.querySelector("div.slide-menu-button a");
	//     const close = slide.document.querySelector("li#close");
	//     sideMenu.onclick = function () {
	//       const active = slide.document
	//         .querySelector(".slide-menu")
	//         .classList.contains("active");
	//       if (!active) {
	//         open.click();
	//       } else {
	//         close.click();
	//       }
	//     };
	//   });
	// }

	/**
	 * Create the timer and clock and start updating them
	 * at an interval.
	 */
	function setupTimer() {
		let start = new Date();
		const timeEl = document.querySelector(".speaker-controls-time");
		const clockEl = timeEl.querySelector(".clock-value");
		const hoursEl = timeEl.querySelector(".hours");
		const minutesEl = timeEl.querySelector(".minutes");
		const secondsEl = timeEl.querySelector(".seconds");

		function _updateTimer() {
			const now = new Date();

			const diff = now.getTime() - start.getTime();
			const hours = Math.floor(diff / (1000 * 60 * 60));
			const minutes = Math.floor((diff / (1000 * 60)) % 60);
			const seconds = Math.floor((diff / 1000) % 60);

			clockEl.innerHTML = now.toLocaleTimeString("en-US", {
				hour12: true,
				hour: "2-digit",
				minute: "2-digit"
			});
			hoursEl.innerHTML = zeroPadInteger(hours);
			hoursEl.className = hours > 0 ? "" : "mute";
			minutesEl.innerHTML = `:${zeroPadInteger(minutes)}`;
			minutesEl.className = minutes > 0 ? "" : "mute";
			secondsEl.innerHTML = `:${zeroPadInteger(seconds)}`;
		}

		// Update once directly
		_updateTimer();

		// Then update every second
		setInterval(_updateTimer, 1000);

		timeEl.addEventListener("click", function () {
			start = new Date();
			_updateTimer();
			return false;
		});
	}

	function zeroPadInteger(num) {
		const str = `00${parseInt(num)}`;
		return str.substring(str.length - 2);
	}

	/**
	 * Limits the frequency at which a function can be called.
	 */
	function debounce(fn, ms) {
		let lastTime = 0;
		let timeout;

		return function () {
			const args = arguments;
			const context = this;

			clearTimeout(timeout);

			const timeSinceLastCall = Date.now() - lastTime;
			if (timeSinceLastCall > ms) {
				fn.apply(context, args);
				lastTime = Date.now();
			} else {
				timeout = setTimeout(function () {
					fn.apply(context, args);
					lastTime = Date.now();
				}, ms - timeSinceLastCall);
			}
		};
	}
})();
