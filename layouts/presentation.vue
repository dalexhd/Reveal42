<template>
  <div>
    <v-app class="bg-transparent">
      <PwaInstall />
      <Settings />
      <Nuxt />
      <Particles v-if="$store.state.settings.particles" />
      <Snackbar />
    </v-app>
  </div>
</template>
<script>
import Particles from "../components/Particles";
import Snackbar from "../components/Snackbar";
import Settings from "../components/Settings";
import PwaInstall from "../components/PwaInstall";
export default {
  components: {
    Particles,
    Settings,
    Snackbar,
    PwaInstall,
  },
};
</script>
