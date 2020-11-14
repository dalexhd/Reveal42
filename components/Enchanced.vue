<template>
  <v-app id="inspire">
    <div>
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
                  <v-icon
                    v-if="
                      !$store.state.auth.loggedIn ||
                      (hover && !$vuetify.breakpoint.mobile)
                    "
                  >
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
          :open-delay="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              :small="!$vuetify.breakpoint.mobile"
              :x-small="$vuetify.breakpoint.mobile"
              :color="!settings.muted ? 'primary' : 'gray'"
              v-bind="attrs"
              elevation="7"
              @click.stop="toggleAudio(!settings.muted)"
              v-on="on"
            >
              <v-icon>{{
                settings.muted ? "mdi-volume-off" : "mdi-volume-high"
              }}</v-icon>
            </v-btn>
          </template>
          <span>{{ settings.muted ? "Activar" : "Desactivar" }} sonido</span>
        </v-tooltip>
        <v-tooltip
          :left="!$vuetify.breakpoint.mobile"
          :bottom="$vuetify.breakpoint.mobile"
          :open-delay="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              :small="!$vuetify.breakpoint.mobile"
              :x-small="$vuetify.breakpoint.mobile"
              :color="settings.subtitles ? 'primary' : 'gray'"
              v-bind="attrs"
              elevation="7"
              @click.stop="toggleSubtitles(!settings.subtitles)"
              v-on="on"
            >
              <v-icon>{{
                settings.subtitles ? "mdi-subtitles" : "mdi-subtitles"
              }}</v-icon>
            </v-btn>
          </template>
          <span
            >{{
              settings.subtitles ? "Desactivar" : "Activar"
            }}
            subtítulos</span
          >
        </v-tooltip>
        <v-tooltip
          :left="!$vuetify.breakpoint.mobile"
          :bottom="$vuetify.breakpoint.mobile"
          :open-delay="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              :small="!$vuetify.breakpoint.mobile"
              :x-small="$vuetify.breakpoint.mobile"
              :color="settings.follow ? 'primary' : 'gray'"
              v-bind="attrs"
              elevation="7"
              @click.stop="toggleFollow(!settings.follow)"
              v-on="on"
            >
              <v-icon>mdi-teach</v-icon>
            </v-btn>
          </template>
          <span
            >{{ settings.muted ? "Desactivar" : "Activar" }} seguimiento</span
          >
        </v-tooltip>
        <v-tooltip
          :left="!$vuetify.breakpoint.mobile"
          :bottom="$vuetify.breakpoint.mobile"
          :open-delay="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              :small="!$vuetify.breakpoint.mobile"
              :x-small="$vuetify.breakpoint.mobile"
              :color="settings.particles ? 'primary' : 'gray'"
              v-bind="attrs"
              elevation="7"
              @click.stop="toggleParticles(!settings.particles)"
              v-on="on"
            >
              <v-icon>mdi-transition</v-icon>
            </v-btn>
          </template>
          <span
            >{{
              settings.particles ? "Desactivar" : "Activar"
            }}
            partículas</span
          >
        </v-tooltip>
        <v-tooltip
          v-if="$store.state.auth.loggedIn"
          :left="!$vuetify.breakpoint.mobile"
          :bottom="$vuetify.breakpoint.mobile"
          :open-delay="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              :small="!$vuetify.breakpoint.mobile"
              :x-small="$vuetify.breakpoint.mobile"
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
      <span
        v-if="$store.state.auth.loggedIn && !$vuetify.breakpoint.mobile && fab"
        class="user-info"
        >Intra Id: {{ $store.state.auth.user.id }} | Role:
        {{ $store.state.auth.user.role }}</span
      >
    </div>
    <div class="text-center">
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
import { mapState } from "vuex";
export default {
  name: "Enchanced",
  data: () => ({
    fab: false,
    sheet: false,
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
  computed: {
    ...mapState(["settings"]),
  },
  methods: {
    logout() {
      this.$auth.logout();
    },
    toggleAudio(v) {
      this.$store.commit("toggleAudio", v);
    },
    toggleSubtitles(v) {
      this.$store.commit("toggleSubtitles", v);
    },
    toggleParticles(v) {
      this.$store.commit("toggleParticles", v);
    },
    toggleFollow(v) {
      this.$store.commit("toggleFollow", v);
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
