<template>
  <div>
    <v-snackbar
      v-if="showSnackbar"
      :top="snackbar.position == 'top' || false"
      :bottom="snackbar.position == 'bottom' || false"
      :right="snackbar.position == 'right' || false"
      :left="snackbar.position == 'left' || false"
      :color="snackbar.color || undefined"
      :timeout="
        snackbar.timeout ||
        (typeof snackbar.timeout == 'number' ? snackbar.timeout : 2000)
      "
    >
      {{ snackbar.message }}
      <v-btn text color="accent" @click.native="showSnackbar = false">
        {{ $t("message.close") }}
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showSnackbar: false,
    };
  },
  computed: {
    ...mapGetters(["snackbar"]),
  },
  watch: {
    snackbar(newValue, oldValue) {
      if (this.showSnackbar) {
        this.showSnackbar = false;
        setTimeout(() => {
          this.showSnackbar = true;
        }, 100);
      } else {
        this.showSnackbar = true;
      }
    },
  },
};
</script>
