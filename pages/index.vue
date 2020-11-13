<template>
  <div id="app" class="reveal">
    <!-- Any section element inside of this container is displayed as a slide -->
    <Slides />
    <Enchanced />
    <div id="particles"></div>
    <client-only>
      <RevealScript />
    </client-only>
  </div>
</template>
<script>
import Slides from "../components/Slides";
import Enchanced from "../components/Enchanced";

export default {
  layout: "presentation",
  components: {
    Slides,
    Enchanced,
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
