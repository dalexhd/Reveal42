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
import RevealParticles from "~/assets/plugins/particles.js/plugin";
import RevealMenu from "~/assets/plugins/menu/plugin";
import RevealClient from "~/assets/plugins/server/client";
import RevealGuest from "~/assets/plugins/server/guest";
Reveal.role = "Admin";
let adminPlugins = [];
let guestPlugins = [];
let adminConfig = {};
let guestConfig = {};

export default {
  mounted() {
    if (this.$store.state.auth.loggedIn) {
      adminConfig = {
        menu: {
          themes: true,
          themesPath: "/dist/theme",
          markers: false,
        },
        server: {
          secret: this.$auth.$storage.getLocalStorage("_token.intra"),
        },
      };
      adminPlugins = [RevealMenu, RevealClient];
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
      particlesJS: {
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 5,
            },
            image: {
              src: "img/github.svg",
              width: 300,
              height: 100,
            },
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: true,
              speed: 0.2,
              opacity_min: 0,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0,
              sync: false,
            },
          },
          line_linked: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        retina_detect: true,
      },
      chart: {},
      ...guestConfig,
      ...adminConfig,
      plugins: [
        RevealZoom,
        RevealSearch,
        RevealMarkdown,
        RevealHighlight,
        RevealParticles,
        RevealChart,
        ...adminPlugins,
        ...guestPlugins,
      ],
    });
  },
};
</script>
