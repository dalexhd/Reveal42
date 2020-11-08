<template>
  <div id="app" class="reveal">
    <!-- Any section element inside of this container is displayed as a slide -->
    <Slides />
    <div id="particles"></div>
    <client-only>
      <RevealScript />
    </client-only>
  </div>
</template>
<script>
import Slides from "../components/Slides";

export default {
  layout: "presentation",
  components: {
    Slides,
    RevealScript() {
      if (process.client) {
        return import("../components/RevealScript");
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/css/reset.scss";
@import "@/assets/css/reveal.scss";
@import "@/assets/css/custom.scss";
@import "@/assets/css/layout.scss";
@import "@/assets/css/theme/source/black.scss";
@import "@/assets/css/menu.scss";
@import "~/node_modules/highlight.js/scss/monokai.scss";
@import "~/node_modules/plyr/src/sass/plyr.scss";
@import "~/node_modules/@fortawesome/fontawesome-free/css/all.css";
</style>
