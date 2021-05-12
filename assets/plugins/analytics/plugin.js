/* global gtag amplitude */
/**
 * Reveal Plugin
 * https://revealjs.com/creating-plugins/
 */

let amplitudeLoaded = false;

const initAmplitude = function () {
	amplitude.init(
		"9d398f1472cdb68138c3d0202f72b2d4",
		undefined,
		{
			includeReferrer: true,
			includeUtm: true
		},
		() => {
			amplitudeLoaded = true;
		}
	);
};

const addEvent = function (action, attributes) {
	if (typeof gtag !== "undefined") {
		let eventObj = {
			category: "reveal-js",
			label: ""
		};

		attributes = attributes || {};
		// Make sure eventValue is an integer, or GA won't register the event
		if ("eventValue" in attributes) {
			attributes.eventValue = parseInt(attributes.eventValue);
		}
		eventObj = Object.assign(eventObj, attributes);

		gtag("event", action, eventObj);
	}
	if (typeof amplitude !== "undefined") {
		if (!amplitudeLoaded) initAmplitude();
		else {
			let eventObj = {
				category: "reveal-js",
				label: ""
			};

			attributes = attributes || {};
			// Make sure eventValue is an integer, or GA won't register the event
			if ("eventValue" in attributes) {
				attributes.eventValue = parseInt(attributes.eventValue);
			}
			eventObj = Object.assign(eventObj, attributes);

			amplitude.logEvent(action, eventObj);
		}
	}
};

const getSlideLabel = function ({ indexh, indexv }) {
	return `(${indexh}-${indexv})`;
};

const initAnalytics = function (Reveal) {
	const config = Reveal.getConfig().analytics || {};
	if (config.enabled === true) {
		Reveal.addEventListener("slidechanged", (ev) => {
			addEvent("change_slide", {
				label: `Change current slide ${getSlideLabel(ev)}`
			});
		});
		Reveal.addEventListener("overviewshown", (ev) => {
			addEvent("overview_shown", {
				label: `Slide overview shown ${getSlideLabel(ev)}`
			});
		});
		Reveal.addEventListener("overviewhidden", (ev) => {
			addEvent("overview_hidden", {
				label: `Slide overview hidden ${getSlideLabel(ev)}`
			});
		});
		Reveal.on("slidetransitionend", (ev) => {
			addEvent("slide_transitioned", {
				label: `Slide transitioned ${getSlideLabel(ev)}`
			});
		});
		Reveal.on("resize", ({ scale, oldScale, size }) => {
			addEvent("resize", {
				label: "Presentation resized",
				scale,
				oldScale,
				size
			});
		});
	}
};

export default () => {
	return {
		id: "RevealAnalytics",
		init(deck) {
			initAnalytics(deck);
		}
	};
};
