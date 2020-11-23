<template>
  <div>
    <Nuxt :style="widthStyle" />
    <v-app class="bg-transparent">
      <Settings />
      <Poll v-if="$store.state.auth.loggedIn" />
      <Snackbar />
    </v-app>
    <Particles v-if="$store.state.settings.particles" :style="widthStyle" />
  </div>
</template>
<script>
import Particles from "../components/Particles";
import Snackbar from "../components/Snackbar";
import Settings from "../components/Settings";
import Poll from "../components/Poll";
export default {
  components: {
    Particles,
    Settings,
    Snackbar,
    Poll,
  },
  computed: {
    widthStyle() {
      return !(
        this.$vuetify.breakpoint.mobile || this.$vuetify.breakpoint.tablet
      ) && this.$store.state.voting
        ? {
            width: (this.$vuetify.breakpoint.width - 520).toString() + "px",
            marginLeft: "520px",
          }
        : {};
    },
  },
};
</script>
