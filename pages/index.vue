<template>
  <div id="app" class="reveal">
    <!-- Any section element inside of this container is displayed as a slide -->
    <Slides />
    <client-only>
      <Enchanced v-if="!isSpeakerNotesWindow()" />
    </client-only>
    <Particles v-if="$store.state.settings.particles" />
    <Snackbar />
    <client-only>
      <RevealScript />
    </client-only>
    <client-only>
      <Metomic />
    </client-only>
  </div>
</template>
<script>
import Slides from "../components/Slides";
import Particles from "../components/Particles";
import Snackbar from "../components/Snackbar";

export default {
  layout: "presentation",
  components: {
    Slides,
    Particles,
    Snackbar,
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
    Metomic() {
      if (process.client) {
        return import("../components/Metomic");
      }
    },
  },
  methods: {
    isSpeakerNotesWindow() {
      return process.client && !!window.location.search.match(/receiver/gi);
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/css/pages/index.scss";
</style>
