<template>
  <div>
    <v-btn
      v-model="fab"
      class="border-solid border-2 border-white-600"
      top
      left
      fab
      fixed
      persistent
      @click.stop="voting = !voting"
    >
      <v-icon>$mdiPoll</v-icon>
    </v-btn>
    <v-navigation-drawer
      v-model="voting"
      fixed
      temporary
      left
      :width="
        $vuetify.breakpoint.mobile || $vuetify.breakpoint.tablet
          ? $vuetify.breakpoint.width
          : 520
      "
    >
      <v-toolbar class="v-bar--underline" flat>
        <div class="text-h6 font-weight-medium text--primary">Votaciones</div>
        <v-spacer />
        <v-btn icon @click="voting = !voting">
          <v-icon>$mdiClose</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <iframe
          v-if="toggled"
          src="https://pollev-embeds.com/alexborbolla056"
          frameborder="0"
          title="Poll"
          :height="height"
          :width="width"
        ></iframe>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Settings",
  data: () => ({
    fab: false,
    toggled: false,
  }),
  computed: {
    voting: {
      get() {
        return this.$store.state.voting;
      },
      set(value) {
        this.$store.commit("toggleVoting", value);
        this.toggled = true;
      },
    },
    height() {
      return this.$vuetify.breakpoint.mobile || this.$vuetify.breakpoint.tablet
        ? this.$vuetify.breakpoint.height - 90
        : 875;
    },
    width() {
      return this.$vuetify.breakpoint.mobile || this.$vuetify.breakpoint.tablet
        ? this.$vuetify.breakpoint.width - 20
        : 500;
    },
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.v-navigation-drawer {
  z-index: 30;
}
</style>
