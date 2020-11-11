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
  middleware: "auth",
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
@import "@/assets/css/pages/index.scss";
</style>
