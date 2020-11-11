<template>
  <v-app id="inspire">
    <div v-if="$store.state.auth.loggedIn">
      <span v-if="fab" class="user-info"
        >Id intra: {{ $store.state.auth.user.id }}</span
      >
      <v-speed-dial
        v-model="fab"
        top
        right
        direction="bottom"
        open-on-hover
        transition="slide-y-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="secondary" dark fab>
            <v-icon v-if="fab"> mdi-close </v-icon>
            <v-avatar v-else size="60">
              <img
                class="object-cover"
                :src="$store.state.auth.user.image_url"
                :alt="$store.state.auth.user.displayname"
              />
            </v-avatar>
          </v-btn>
        </template>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="primary"
              v-bind="attrs"
              elevation="7"
              @click="dialog = true"
              v-on="on"
            >
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </template>
          <span>Ajustes</span>
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
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Configuración</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="dialog = false">Guardar</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-tabs fixed-tabs>
            <v-tab>
              <v-icon left> mdi-cog </v-icon>
              General
            </v-tab>
            <v-tab>
              <v-icon left> mdi-incognito </v-icon>
              Privacidad
            </v-tab>
            <v-tab-item>
              <v-list three-line subheader>
                <v-subheader>Ajustes generales</v-subheader>
                <v-list-item>
                  <v-list-item-action>
                    <v-checkbox v-model="sound"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Sonido</v-list-item-title>
                    <v-list-item-subtitle
                      >Activar el sonido durante la
                      presentación</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-action>
                    <v-checkbox v-model="voting"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Votaciones</v-list-item-title>
                    <v-list-item-subtitle
                      >Notificarme cada vez que se realice una
                      votación</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-action>
                    <v-checkbox v-model="follow"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Seguir presentador</v-list-item-title>
                    <v-list-item-subtitle
                      >Seguir al presentador de forma
                      automática</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-tab-item>
            <v-tab-item> </v-tab-item>
          </v-tabs>
        </v-card>
      </v-dialog>
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
            Inicia sesión para obtener una experiencia
            completa.</v-toolbar-title
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
export default {
  name: "Enchanced",
  data: () => ({
    fab: false,
    sheet: false,
    dialog: false,
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
  top: 0;
  right: 0;
  font-size: 12px;
  color: white;
  opacity: 0.3;
  margin: 4px;
}
</style>
