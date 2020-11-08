<template>
  <div>
    <h1>Login Page</h1>
    <button @click="$auth.loginWith('intra')">Login 42</button>
    <button @click="$auth.loginWith('github')">Login Github</button>
  </div>
</template>

<script>
export default {
  layout: "admin",
  mounted() {
    if (this.$auth.user) {
      this.$router.push("/");
    }
  },
};
</script>
