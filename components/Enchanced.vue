<template>
  <div>
    <div @keydown.esc="checkSpeedDial">
      <v-speed-dial
        v-model="fab"
        top
        right
        :direction="$vuetify.breakpoint.mobile ? 'left' : 'bottom'"
        transition="fab-transition"
        class="absolute"
      >
        <template #activator>
          <v-hover v-slot="{ hover }">
            <v-btn
              v-model="fab"
              class="border-solid border-2 border-white-600"
              dark
              fab
            >
              <v-icon v-if="fab">{{ icons.mdiClose }}</v-icon>
              <template v-else>
                <v-icon
                  v-if="
                    !$store.state.auth.loggedIn ||
                    (hover && !$vuetify.breakpoint.mobile)
                  "
                >
                  {{ icons.mdiMenu }}
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
              <v-icon>{{ icons.mdiLogout }}</v-icon>
            </v-btn>
          </template>
          <span>Cerrar sesión</span>
        </v-tooltip>
        <v-tooltip
          v-else
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
              color="warning"
              v-bind="attrs"
              elevation="7"
              @click.prevent="sheet = true"
              v-on="on"
            >
              <v-icon>{{ icons.mdiLoginVariant }}</v-icon>
            </v-btn>
          </template>
          <span>Iniciar sesión</span>
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
    <div v-if="!$store.state.auth.loggedIn">
      <v-bottom-sheet v-model="sheet" persistent>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>
            Inicia sesión con cualquira de estos métodos para obtener una
            experiencia completa.
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="sheet = false">
            <v-icon>{{ icons.mdiClose }}</v-icon>
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
  </div>
</template>

<script>
/* eslint-disable object-shorthand */
import { mapState } from "vuex";
import {
  mdiLoginVariant,
  mdiAccount,
  mdiClose,
  mdiLogout,
  mdiVolumeOff,
  mdiVolumeHigh,
  mdiSubtitles,
  mdiTeach,
  mdiTransition,
  mdiMenu,
} from "@mdi/js";
export default {
  name: "Enchanced",
  data: () => ({
    icons: {
      mdiLoginVariant,
      mdiAccount,
      mdiClose,
      mdiLogout,
      mdiMenu,
    },
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
        icon: [mdiVolumeOff, mdiVolumeHigh],
        tooltip: ["Activar sonido", "Desactivar sonido"],
      },
      {
        property: "subtitles",
        toggle: "toggleSubtitles",
        color: ["primary", "gray"],
        icon: [mdiSubtitles, mdiSubtitles],
        tooltip: ["Desactivar subtítulos", "Activar subtítulos"],
      },
      {
        property: "follow",
        toggle: "toggleFollow",
        color: ["primary", "gray"],
        icon: [mdiTeach, mdiTeach],
        tooltip: ["Desactivar seguimiento", "Activar seguimiento"],
      },
      {
        property: "particles",
        toggle: "toggleParticles",
        color: ["primary", "gray"],
        icon: [mdiTransition, mdiTransition],
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
    checkSpeedDial(event) {
      console.log(event);
      if (this.fab) {
        event.stopPropagation();
        this.fab = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
.login-btn {
  z-index: 1;
}
</style>
