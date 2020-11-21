<template>
  <div>
    <v-app class="bg-transparent">
      <Settings />
      <SettingsV2 />
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
export default {
  components: {
    Particles,
    Settings,
    Snackbar,
  },
};
</script>
