<template>
  <div
    class="min-h-screen flex items-center justify-center bg-dark sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full shadow-md py-12 px-4 bg-white">
      <div
        class="border-t-4 border-teal-500 rounded-b text-teal-900 px-4 text-center animate-pulse"
        role="alert"
      >
        <i class="fas fa-lock pr-3 pb-4 fa-3x"></i>
        <h1>Wait... Authentication is processing!</h1>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "admin",
};
</script>
<style lang="scss">
@import "@/assets/css/pages/callback.scss";
</style>
