<template>
	<div>
		<v-hover v-slot="{ hover }">
			<v-btn
				v-model="fab"
				class="border-solid border-2 border-white-600"
				top
				right
				fab
				fixed
				aria-label="ajustes"
				@click.stop="menu = !menu"
			>
				<v-icon v-if="fab">$mdiClose</v-icon>
				<template v-else>
					<v-icon
						v-if="
							!$store.state.intra.loggedIn ||
							(hover && !$vuetify.breakpoint.mobile)
						"
					>
						$mdiMenu
					</v-icon>
					<v-avatar v-else size="55">
						<img
							class="object-cover"
							:src="$store.state.intra.user.image_url_small"
							:alt="$store.state.intra.user.display_name"
						/>
					</v-avatar>
				</template>
			</v-btn>
		</v-hover>
		<v-navigation-drawer
			v-model="menu"
			fixed
			temporary
			right
			:width="
				$vuetify.breakpoint.smAndDown ? $vuetify.breakpoint.width - 70 : 300
			"
		>
			<v-toolbar class="v-bar--underline" flat>
				<div class="text-h6 font-weight-medium text--primary">Ajustes</div>
				<v-spacer />
				<v-btn icon @click="menu = !menu">
					<v-icon>$mdiClose</v-icon>
				</v-btn>
			</v-toolbar>
			<v-container>
				<div v-if="!installed">
					<div class="text-subtitle-2">Aplicación (PWA)</div>
					<v-item-group class="mx-auto row row--dense" mandatory>
						<v-btn
							v-if="!installed"
							:text="false"
							block
							:color="`grey ${$vuetify.theme.dark ? 'darken-4' : 'lighten-3'}`"
							depressed
							:loading="installing"
							:disabled="installing"
							class="my-2"
							@click.stop="install"
						>
							<span>
								Instalar aplicación
								<v-icon right size="20">$mdiPlusCircle</v-icon>
							</span>
						</v-btn>
					</v-item-group>
				</div>
				<div v-if="!installed" class="mt-2 mb-3 mx-n3">
					<v-divider />
				</div>
				<div>
					<div class="text-subtitle-2">Integraciones</div>
					<v-sheet
						:color="`grey ${$vuetify.theme.dark ? 'darken' : 'lighten'}-3`"
						class="my-3"
					>
						<v-item-group class="mx-auto row row--dense" mandatory>
							<div class="flex justify-around">
								<v-col cols="6">
									<v-hover v-slot="{ hover }">
										<v-btn
											depressed
											color="#292D39"
											:dark="!$vuetify.theme.dark"
											class="py-5 w-full"
											small
											rounded
											@click.stop="
												$store.state.intra.loggedIn ? logout() : login('intra')
											"
										>
											<span>{{
												hover
													? $store.state.intra.loggedIn
														? "Salir"
														: "Entrar"
													: "Intranet"
											}}</span>
											<v-icon v-if="hover">{{
												$store.state.intra.loggedIn ? "$mdiLogout" : "$mdiLogin"
											}}</v-icon>
											<v-icon v-else>$mdi42</v-icon>
										</v-btn>
									</v-hover>
								</v-col>
								<v-col cols="6">
									<v-hover v-slot="{ hover }">
										<v-btn
											depressed
											color="#191414"
											:dark="!$vuetify.theme.dark"
											class="py-5 w-full"
											small
											rounded
											@click.stop="
												$store.state.spotify.loggedIn
													? spotifyLogout()
													: login('spotify')
											"
										>
											<span>{{
												hover
													? $store.state.intra.loggedIn
														? "Entrar"
														: "Salir"
													: "Spotify"
											}}</span>
											<v-icon v-if="hover">{{
												$store.state.spotify.loggedIn
													? "$mdiLogout"
													: "$mdiLogin"
											}}</v-icon>
											<v-icon v-else>$mdiSpotify</v-icon>
										</v-btn>
									</v-hover>
								</v-col>
							</div>
						</v-item-group>
					</v-sheet>
				</div>
				<div class="mt-2 mb-3 mx-n3">
					<v-divider />
				</div>
				<div>
					<div class="text-subtitle-2">Sonido</div>
					<v-item-group v-model="audio" class="my-2 row row--dense" mandatory>
						<v-col :cols="audio ? 9 : 3">
							<v-item :value="true">
								<template #default="{ active, toggle }">
									<v-card
										:color="
											active
												? 'primary'
												: `grey ${$vuetify.theme.dark ? 'darken' : 'lighten'}-3`
										"
										:dark="!$vuetify.theme.dark && active"
										class="v-card--group py-3 px-4 text-center position-relative cursor-pointer d-flex align-center justify-space-between"
										rounded
										flat
										@click="toggle"
									>
										<span v-if="audio">Desactivado</span>
										<v-icon>$mdiVolumeOff</v-icon>
									</v-card>
								</template>
							</v-item>
						</v-col>
						<v-col :cols="!audio ? 9 : 3">
							<v-item :value="false">
								<template #default="{ active, toggle }">
									<v-card
										:color="
											active
												? 'primary'
												: `grey ${$vuetify.theme.dark ? 'darken' : 'lighten'}-3`
										"
										:dark="!$vuetify.theme.dark && active"
										class="v-card--group py-3 px-4 text-center position-relative cursor-pointer d-flex align-center justify-space-between"
										rounded
										flat
										@click="toggle"
									>
										<span v-if="!audio">Activado</span>
										<v-icon>$mdiVolumeHigh</v-icon>
									</v-card>
								</template>
							</v-item>
						</v-col>
					</v-item-group>
				</div>
				<div class="mt-2 mb-3 mx-n3">
					<v-divider />
				</div>
				<div>
					<div class="text-subtitle-2">Ajustes generales</div>
					<v-list subheader three-line flat>
						<v-list-item>
							<template #default>
								<v-list-item-content>
									<v-list-item-title>Subtítulos</v-list-item-title>
									<v-list-item-subtitle
										>Mostrar los subtítulos en los vídeos.</v-list-item-subtitle
									>
								</v-list-item-content>
								<v-list-item-action>
									<v-switch v-model="subtitles" inset></v-switch>
								</v-list-item-action>
							</template>
						</v-list-item>
						<v-divider inset></v-divider>
						<v-list-item>
							<template #default>
								<v-list-item-content>
									<v-list-item-title>Partículas</v-list-item-title>
									<v-list-item-subtitle
										>Activar el efecto de partíclas en el
										fondo.</v-list-item-subtitle
									>
								</v-list-item-content>
								<v-list-item-action>
									<v-switch v-model="particles" inset></v-switch>
								</v-list-item-action>
							</template>
						</v-list-item>
						<v-divider inset></v-divider>
						<v-list-item>
							<template #default>
								<v-list-item-content>
									<v-list-item-title>Seguimiento</v-list-item-title>
									<v-list-item-subtitle
										>Activar seguimiento junto al
										presentador.</v-list-item-subtitle
									>
								</v-list-item-content>
								<v-list-item-action>
									<v-switch v-model="follow" inset></v-switch>
								</v-list-item-action>
							</template>
						</v-list-item>
						<v-divider inset></v-divider>
						<v-list-item>
							<template #default>
								<v-list-item-content>
									<v-list-item-title>Cookies</v-list-item-title>
									<v-list-item-subtitle
										>Configurar cookies del navegador.</v-list-item-subtitle
									>
								</v-list-item-content>
								<v-list-item-action>
									<v-btn icon ripple @click="showCookieModal()">
										<v-icon color="grey lighten-1">$mdiCookieCog</v-icon>
									</v-btn>
								</v-list-item-action>
							</template>
						</v-list-item>
					</v-list>
				</div>
				<div class="mb-3 mx-n3">
					<v-divider />
				</div>
				<div>
					<div class="text-subtitle-2">Tema</div>
					<v-item-group v-model="theme" class="my-2 row row--dense" mandatory>
						<v-col cols="6">
							<v-item value="light">
								<template #default="{ active, toggle }">
									<v-card
										:color="
											active
												? 'primary'
												: `grey ${$vuetify.theme.dark ? 'darken' : 'lighten'}-3`
										"
										:dark="!$vuetify.theme.dark && active"
										class="v-card--group py-3 px-4 text-center position-relative cursor-pointer d-flex align-center justify-space-between"
										rounded
										flat
										@click="toggle"
									>
										<span>Claro</span>
										<v-icon>$mdiWhiteBalanceSunny</v-icon>
									</v-card>
								</template>
							</v-item>
						</v-col>
						<v-col cols="6">
							<v-item value="dark">
								<template #default="{ active, toggle }">
									<v-card
										:color="
											active
												? 'primary'
												: `grey ${$vuetify.theme.dark ? 'darken' : 'lighten'}-3`
										"
										:dark="!$vuetify.theme.dark && active"
										class="v-card--group py-3 px-4 text-center position-relative cursor-pointer d-flex align-center justify-space-between"
										rounded
										flat
										@click="toggle"
									>
										<span>Oscuro</span>
										<v-icon>$mdiWeatherNight</v-icon>
									</v-card>
								</template>
							</v-item>
						</v-col>
						<v-col cols="12">
							<v-item value="system">
								<template #default="{ active, toggle }">
									<v-card
										:color="
											active
												? 'primary'
												: `grey ${$vuetify.theme.dark ? 'darken' : 'lighten'}-3`
										"
										:dark="!$vuetify.theme.dark && active"
										class="v-card--group py-3 px-4 text-center position-relative cursor-pointer d-flex align-center justify-space-between"
										rounded
										flat
										@click="toggle"
									>
										<span>Sistema</span>
										<v-icon>$mdiDesktopTowerMonitor</v-icon>
									</v-card>
								</template>
							</v-item>
						</v-col>
					</v-item-group>
				</div>
				<div class="mb-2 mx-n3">
					<v-divider />
				</div>
				<div v-if="installed" class="d-flex">
					<div class="text-subtitle-2 text--disabled">
						<v-icon>$mdiHarddisk</v-icon> {{ size }}
					</div>
					<div class="ml-2 text-subtitle-2 text--disabled">
						<v-icon>$mdiBattery</v-icon> {{ battery }}%
					</div>
				</div>
			</v-container>
		</v-navigation-drawer>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "Settings",
	data: () => ({
		fab: false,
		tiles: [
			{
				img: require("@/static/icon.png"),
				title: "Intranet",
				with: "intra"
			}
		],
		installed: true,
		installing: false,
		deferredPrompt: null,
		size: 0,
		battery: 0
	}),
	computed: {
		...mapState(["settings"]),
		menu: {
			get() {
				return this.$store.state.menu;
			},
			set(value) {
				this.$store.commit("toggleMenu", value);
			}
		},
		subtitles: {
			get() {
				return this.$store.state.settings.subtitles;
			},
			set(value) {
				if (navigator.vibrate) navigator.vibrate(7);
				this.$store.commit("toggleSubtitles", value);
			}
		},
		particles: {
			get() {
				return this.$store.state.settings.particles;
			},
			set(value) {
				if (navigator.vibrate) navigator.vibrate(7);
				this.$store.commit("toggleParticles", value);
			}
		},
		follow: {
			get() {
				return this.$store.state.settings.follow;
			},
			set(value) {
				if (navigator.vibrate) navigator.vibrate(7);
				this.$store.commit("toggleFollow", value);
			}
		},
		audio: {
			get() {
				return this.$store.state.settings.muted;
			},
			set(value) {
				if (navigator.vibrate) navigator.vibrate(7);
				this.$store.commit("toggleAudio", value);
			}
		},
		theme: {
			get() {
				return this.$store.state.settings.theme;
			},
			set(value) {
				if (navigator.vibrate) navigator.vibrate(7);
				this.$store.commit("toggleTheme", value);
				const theme = this.$store.state.settings.theme;
				if (theme) {
					if (theme === "system" && process.client) {
						// eslint-disable-next-line nuxt/no-globals-in-created
						const dark = window.matchMedia("(prefers-color-scheme: dark)")
							.matches;
						this.$vuetify.theme.dark = dark;
					} else if (theme === "dark") {
						this.$vuetify.theme.dark = true;
					} else {
						this.$vuetify.theme.dark = false;
					}
				}
			}
		}
	},
	watch: {
		menu(status) {
			if (navigator.vibrate) navigator.vibrate(7);
		}
	},
	created() {
		if (process.client) {
			const self = this;
			// eslint-disable-next-line nuxt/no-globals-in-created
			window.addEventListener("appinstalled", (e) => {
				console.log("PWA installed");
				this.installed = true;
			});
			// eslint-disable-next-line nuxt/no-globals-in-created
			window.addEventListener("beforeinstallprompt", (e) => {
				if (navigator.getInstalledRelatedApps) {
					e.preventDefault(); // Stop automated install prompt.
					navigator.getInstalledRelatedApps().then((relatedApps) => {
						if (relatedApps.length === 0) {
							this.installed = false;
							this.installing = false;
							this.deferredPrompt = e;
						}
					});
				}
			});
			function bytesToSize(bytes) {
				const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
				if (bytes === 0) return "0 Byte";
				const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
				return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
			}
			if ("storage" in navigator && "estimate" in navigator.storage) {
				setInterval(() => {
					navigator.storage.estimate().then((estimate) => {
						self.size = bytesToSize(estimate.usage);
					});
				}, 2000);
			}

			if (
				"getBattery" in navigator ||
				("battery" in navigator && "Promise" in window)
			) {
				function handleChange(change) {
					console.log(change);
				}

				function onChargingChange() {
					handleChange(
						`Battery charging changed to ${
							this.charging ? "charging" : "discharging"
						}`
					);
				}

				function onLevelChange() {
					self.battery = this.level * 100;
				}

				let batteryPromise;

				if ("getBattery" in navigator) {
					batteryPromise = navigator.getBattery();
				} else {
					batteryPromise = Promise.resolve(navigator.battery);
				}
				batteryPromise.then(function (battery) {
					battery.addEventListener("chargingchange", onChargingChange);
					battery.addEventListener("levelchange", onLevelChange);
					self.battery = battery.level * 100;
				});
			}
		}
	},
	methods: {
		logout() {
			this.$auth.logout().then((value) => {
				this.$store.commit("toggleMenu", false);
			});
		},
		checkSpeedDial(event) {
			if (this.fab) {
				event.stopPropagation();
				this.fab = false;
			}
		},
		install() {
			if (this.deferredPrompt !== null) {
				this.installing = true;
				this.deferredPrompt.prompt();
			}
		},
		showCookieModal() {
			window.klaro.show();
		},
		login(provider) {
			window.location.href = `/auth/${provider}`;
		},
		spotifyLogout() {
			// eslint-disable-next-line no-undef
			window.SpotifyPlayer.disconnect();
			this.$store.commit("logoutFromSpotify");
		}
	}
};
</script>
<style lang="scss" scoped>
.theme--light .v-bar--underline,
.theme--dark .v-bar--underline {
	border-width: 0 0 thin 0;
	border-style: solid;
}

.theme--light .v-bar--underline.theme--light,
.theme--dark .v-bar--underline.theme--light {
	border-bottom-color: #0000001f !important;
}

.theme--light .v-bar--underline.theme--dark,
.theme--dark .v-bar--underline.theme--dark {
	border-bottom-color: #ffffff1f !important;
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
.v-navigation-drawer {
	z-index: 30 !important;
}
.login-btn {
	z-index: 1;
}
</style>
