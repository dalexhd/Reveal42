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
    Reveal.role = this.$store.state.auth?.user?.role || "guest";
    if (
      ["presenter", "broadcaster"].includes(this.$store.state.auth?.user?.role)
    ) {
      adminConfig = {
        server: {
          secret: this.$auth.$storage.getLocalStorage("_token.intra"),
        },
      };
      adminPlugins = [RevealClient, RevealZoom];
    } else {
      guestPlugins = [RevealAnalytics, RevealGuest];
      guestConfig = {
        analytics: {
          enabled: true,
        },
      };
    }
    Reveal.initialize({
      controls: true,
      progress: true,
      center: true,
      hash: true,
      controlsTutorial: false,
      navigationMode: "linear",
      viewDistance: Number.MAX_VALUE,
      mobileViewDistance: Number.MAX_VALUE,
      menu: {
        themes: true,
        themesPath: "/dist/theme",
        markers: false,
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
        ...guestPlugins,
      ],
    });
  },
};
</script>
