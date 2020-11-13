<template>
  <div id="app" class="reveal">
    <!-- Any section element inside of this container is displayed as a slide -->
    <Slides />
    <client-only>
      <Enchanced />
    </client-only>
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
    Enchanced() {
      if (process.client) {
        return import("../components/Enchanced");
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/css/pages/index.scss";
</style>
