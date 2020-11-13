<template>
  <v-app id="inspire">
    <div v-if="$store.state.auth.loggedIn">
      <v-speed-dial
        v-model="fab"
        top
        right
        :direction="$vuetify.breakpoint.mobile ? 'left' : 'bottom'"
        transition="fab-transition"
      >
        <template v-slot:activator>
          <v-hover v-slot="{ hover }">
            <v-btn v-model="fab" color="secondary" dark fab>
              <v-icon v-if="fab"> mdi-close </v-icon>
              <div v-else>
                <v-avatar
                  size="60"
                  class="border-solid border-2 border-white-600"
                >
                  <v-icon v-if="hover && !$vuetify.breakpoint.mobile">
                    mdi-menu
                  </v-icon>
                  <img
                    v-else
                    class="object-cover"
                    :src="$store.state.auth.user.image_url"
                    :alt="$store.state.auth.user.displayname"
                  />
                </v-avatar>
              </div>
            </v-btn>
          </v-hover>
        </template>
        <v-tooltip
          :left="!$vuetify.breakpoint.mobile"
          :bottom="$vuetify.breakpoint.mobile"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="primary"
              v-bind="attrs"
              elevation="7"
              @click.stop="sound = !sound"
              v-on="on"
            >
              <v-icon>{{
                $store.state.settings.audio
                  ? "mdi-volume-high"
                  : "mdi-volume-off"
              }}</v-icon>
            </v-btn>
          </template>
          <span
            >{{
              $store.state.settings.audio ? "Desactivar" : "Activar"
            }}
            sonido</span
          >
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="primary"
              v-bind="attrs"
              elevation="7"
              @click.stop="sound = !sound"
              v-on="on"
            >
              <v-icon>{{
                $store.state.settings.audio ? "mdi-teach" : "mdi-teach"
              }}</v-icon>
            </v-btn>
          </template>
          <span
            >{{
              $store.state.settings.audio ? "Desactivar" : "Activar"
            }}
            seguimiento</span
          >
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="red"
              v-bind="attrs"
              elevation="7"
              @click.prevent="logout"
              v-on="on"
            >
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>Cerrar sesión</span>
        </v-tooltip>
      </v-speed-dial>
      <span v-if="!$vuetify.breakpoint.mobile && fab" class="user-info"
        >Intra Id: {{ $store.state.auth.user.id }} | Role:
        {{ $store.state.auth.user.role }}</span
      >
    </div>
    <div v-else class="text-center">
      <v-bottom-sheet v-model="sheet" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="purple"
            dark
            v-bind="attrs"
            style="z-index: 99999"
            v-on="on"
          >
            Iniciar sesión
          </v-btn>
        </template>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>
            Inicia sesión con cualquira de estos métodos para obtener una
            experiencia completa.</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn icon @click="sheet = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list>
          <v-list-item
            v-for="tile in tiles"
            :key="tile.title"
            @click.prevent="$auth.loginWith(tile.with)"
          >
            <v-list-item-avatar>
              <v-avatar size="32px" tile>
                <img :src="tile.img" :alt="tile.title" />
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-title>{{ tile.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-bottom-sheet>
    </div>
  </v-app>
</template>

<script>
/* eslint-disable object-shorthand */
import { mapMutations } from "vuex";
export default {
  name: "Enchanced",
  data: () => ({
    fab: false,
    sheet: false,
    sound: false,
    voting: true,
    follow: true,
    tiles: [
      {
        img: require("@/static/icon.png"),
        title: "Intranet",
        with: "intra",
      },
    ],
  }),
  watch: {
    sound: function (enabled) {
      const self = this;
      if (enabled) {
        self.$store.commit("activateAudio");
      } else {
        self.$store.commit("muteAudio");
      }
    },
  },
  mounted() {
    const audioEnabled = localStorage.getItem("audio-enabled") === "true";
    if (audioEnabled) {
      this.sound = true;
      window.addEventListener("load", () => {
        this.$store.commit("activateAudio");
      });
    } else {
      this.sound = false;
      window.addEventListener("load", () => {
        this.$store.commit("muteAudio");
      });
    }
  },
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};
</script>
<style lang="scss" scoped>
.v-application {
  background: none !important;
}
.v-speed-dial {
  position: absolute;
}
.user-info {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 12px;
  color: black;
  opacity: 0.5;
  margin: 4px;
  padding: 0 4px;
  text-transform: capitalize;
  background: white;
  z-index: 4;
}
</style>
