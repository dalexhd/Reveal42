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
        <template #activator>
          <v-hover v-slot="{ hover }">
            <v-btn
              v-model="fab"
              class="border-solid border-2 border-white-600"
              dark
              fab
            >
              <v-icon v-if="fab">mdi-close</v-icon>
              <template v-else>
                <v-icon
                  v-if="
                    !$store.state.auth.loggedIn ||
                    (hover && !$vuetify.breakpoint.mobile)
                  "
                >
                  mdi-menu
                </v-icon>
                <v-avatar v-else size="55">
                  <img
                    class="object-cover"
                    :src="$store.state.auth.user.image_url_small"
                    :alt="$store.state.auth.user.display_name"
                  />
                </v-avatar>
              </template>
            </v-btn>
          </v-hover>
        </template>
        <v-tooltip
          v-for="(menuItem, index) in menu"
          :key="index"
          :left="!$vuetify.breakpoint.mobile"
          :bottom="$vuetify.breakpoint.mobile"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              fab
              dark
              :small="!$vuetify.breakpoint.mobile"
              :x-small="$vuetify.breakpoint.mobile"
              :color="
                settings[menuItem.property]
                  ? menuItem.color[0]
                  : menuItem.color[1]
              "
              v-bind="attrs"
              elevation="7"
              @click.stop="
                $store.commit(menuItem.toggle, !settings[menuItem.property])
              "
              v-on="on"
            >
              <v-icon>
                {{
                  settings[menuItem.property]
                    ? menuItem.icon[0]
                    : menuItem.icon[1]
                }}
              </v-icon>
            </v-btn>
          </template>
          <span>
            {{
              settings[menuItem.property]
                ? menuItem.tooltip[0]
                : menuItem.tooltip[1]
            }}
          </span>
        </v-tooltip>
        <v-tooltip
          v-if="$store.state.auth.loggedIn"
          :left="!$vuetify.breakpoint.mobile"
          :bottom="$vuetify.breakpoint.mobile"
          :open-delay="500"
        >
          <template #activator="{ on, attrs }">
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
      >
        Intra Id: {{ $store.state.auth.user.id }} | Role:
        {{ $store.state.auth.user.role }}
      </span>
    </div>
    <div v-if="!$store.state.auth.loggedIn" class="text-center">
      <v-bottom-sheet v-model="sheet" persistent>
        <template #activator="{ on, attrs }">
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
            experiencia completa.
          </v-toolbar-title>
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
    tiles: [
      {
        img: require("@/static/icon.png"),
        title: "Intranet",
        with: "intra",
      },
    ],
    menu: [
      {
        property: "muted",
        toggle: "toggleAudio",
        color: ["gray", "primary"],
        icon: ["mdi-volume-off", "mdi-volume-high"],
        tooltip: ["Activar sonido", "Desactivar sonido"],
      },
      {
        property: "subtitles",
        toggle: "toggleSubtitles",
        color: ["primary", "gray"],
        icon: ["mdi-subtitles", "mdi-subtitles"],
        tooltip: ["Desactivar subtítulos", "Activar subtítulos"],
      },
      {
        property: "follow",
        toggle: "toggleFollow",
        color: ["primary", "gray"],
        icon: ["mdi-teach", "mdi-teach"],
        tooltip: ["Desactivar seguimiento", "Activar seguimiento"],
      },
      {
        property: "particles",
        toggle: "toggleParticles",
        color: ["primary", "gray"],
        icon: ["mdi-transition", "mdi-transition"],
        tooltip: ["Desactivar partículas", "Activar partículas"],
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
