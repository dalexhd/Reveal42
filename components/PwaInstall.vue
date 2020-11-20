<template>
  <v-snackbar
    v-model="$store.state.pwa.prompt"
    multi-line
    :timeout="8000"
    light
    top
  >
    <v-icon>$mdiArrowDownBoldHexagonOutline</v-icon>
    Instalar presentación (recomendado)
    <template #action>
      <v-btn
        v-if="!$vuetify.breakpoint.mobile"
        color="primary"
        text
        @click="dismiss"
        >No, gracias</v-btn
      >
      <v-btn color="primary" text @click="install">Instalar</v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  name: "App",
  methods: {
    dismiss() {
      this.$store.state.pwa.prompt = false;
    },
    install() {
      this.$store.state.pwa.prompt = false;
      this.$store.state.pwa.event.prompt();
    },
  },
};
</script>
