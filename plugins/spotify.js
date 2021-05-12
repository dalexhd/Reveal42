export default () => {
	const spotifyUrl = "https://spotify-widget.herokuapp.com";
	window.addEventListener("message", ({ origin, data }) => {
		if (origin.startsWith(spotifyUrl)) {
			if (data.event === "color") {
				document.documentElement.style.setProperty(
					"--spotify-background",
					data.data.backgroundColor
				);
				document.documentElement.style.setProperty(
					"--spotify-color",
					data.data.color
				);
				document.documentElement.style.setProperty(
					"--spotify-alternative",
					data.data.alternativeColor
				);
			}
		}
	});
};
