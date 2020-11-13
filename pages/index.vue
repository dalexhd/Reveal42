<template>
  <div id="app" class="reveal">
    <!-- Any section element inside of this container is displayed as a slide -->
    <Slides />
    <Enchanced />
    <div id="particles"></div>
    <RevealScript />
  </div>
</template>
<script>
import Slides from "../components/Slides";
import Enchanced from "../components/Enchanced";
import RevealScript from "../components/RevealScript";

export default {
  layout: "presentation",
  components: {
    Slides,
    Enchanced,
    RevealScript,
  },
};
</script>
<style lang="scss">
@import "@/assets/css/pages/index.scss";
</style>
