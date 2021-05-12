<template>
	<div></div>
</template>
<script>
import Reveal from "~/assets/reveal.js";
import RevealAnalytics from "~/assets/plugins/analytics/plugin";
import RevealChart from "~/assets/plugins/chart/plugin";
import RevealHighlight from "~/assets/plugins/highlight/plugin";
import RevealZoom from "~/assets/plugins/zoom/plugin";
import RevealSearch from "~/assets/plugins/search/plugin";
import RevealMarkdown from "~/assets/plugins/markdown/plugin";
import RevealMenu from "~/assets/plugins/menu/plugin";
import RevealClient from "~/assets/plugins/server/client";
import RevealGuest from "~/assets/plugins/server/guest";
let adminPlugins = [];
let guestPlugins = [];
let adminConfig = {};
let guestConfig = {};

export default {
	mounted() {
		function getCookie(cname) {
			const name = `${cname}=`;
			const decodedCookie = decodeURIComponent(document.cookie);
			const ca = decodedCookie.split(";");
			for (let i = 0; i < ca.length; i++) {
				let c = ca[i];
				while (c.charAt(0) === " ") {
					c = c.substring(1);
				}
				if (c.indexOf(name) === 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		}

		Reveal.role = this.$store.state.intra?.user?.role || "guest";
		if (
			["presenter", "broadcaster"].includes(this.$store.state.intra?.user?.role)
		) {
			adminConfig = {
				server: {
					secret: `Bearer ${getCookie("intra.access_token")}`
				}
			};
			adminPlugins = [RevealClient, RevealZoom];
		} else {
			guestPlugins = [RevealAnalytics, RevealGuest];
			guestConfig = {
				analytics: {
					enabled: true
				}
			};
		}
		Reveal.initialize({
			controls: true,
			progress: true,
			center: true,
			hash: true,
			controlsTutorial: false,
			navigationMode: "linear",
			touch: false,
			// viewDistance: Number.MAX_VALUE,
			// mobileViewDistance: Number.MAX_VALUE,
			menu: {
				themes: Reveal.role === "presenter",
				themesPath: "/themes",
				markers: false
			},
			chart: {},
			...guestConfig,
			...adminConfig,
			plugins: [
				RevealSearch,
				RevealMarkdown,
				RevealHighlight,
				RevealChart,
				RevealMenu,
				...adminPlugins,
				...guestPlugins
			]
		});
	}
};
</script>
