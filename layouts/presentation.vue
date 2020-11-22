<template>
  <div>
    <Nuxt />
    <v-app class="bg-transparent">
      <Settings />
      <Snackbar />
    </v-app>
    <Particles v-if="$store.state.settings.particles" />
  </div>
</template>
<script>
import Particles from "../components/Particles";
import Snackbar from "../components/Snackbar";
import Settings from "../components/Settings";
export default {
  components: {
    Particles,
    Settings,
    Snackbar,
  },
};
</script>
