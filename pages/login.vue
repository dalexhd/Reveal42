<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="text-center">
        <div>
          <v-icon size="250">$mdi42</v-icon>
        </div>
        <div class="w-full my-12 px-4">
          <v-btn color="primary" @click="$auth.loginWith('intra')">
            Login 42
          </v-btn>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  layout: "admin",
  mounted() {
    if (this.$store.state.auth.loggedIn) {
      this.$router.push("/");
    }
  },
};
</script>
