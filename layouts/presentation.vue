<template>
	<div>
		<Nuxt :style="widthStyle" />
		<v-app class="bg-transparent">
			<Settings />
			<!-- <Poll v-if="$store.state.intra.loggedIn && $auth.hasRole('viewer')" /> -->
			<Poll v-if="$store.state.intra.loggedIn" />
			<Snackbar />
			<v-overlay
				:value="loading"
				:opacity="1"
				z-index="10"
				class="text-center loading-overlay"
			>
				<div class="animate-pulse">
					<v-icon size="150">$mdi42</v-icon>
					<div class="text-2xl">Cargando vista del {{ $auth.getRole() }}</div>
				</div>
			</v-overlay>
		</v-app>
		<Particles v-if="$store.state.settings.particles" :style="widthStyle" />
		<SpotifyPlayer v-if="$store.state.spotify.loggedIn" />
	</div>
</template>
<script>
import Particles from "../components/Particles";
import Snackbar from "../components/Snackbar";
import Settings from "../components/Settings";
import Poll from "../components/Poll";
import SpotifyPlayer from "../components/SpotifyPlayer";
export default {
	components: {
		Particles,
		Settings,
		Snackbar,
		Poll,
		SpotifyPlayer
	},
	data() {
		return {
			loading: true
		};
	},
	computed: {
		widthStyle() {
			return (
				!this.$vuetify.breakpoint.smAndDown &&
				(this.$store.state.voting
					? {
							width: `${(this.$vuetify.breakpoint.width - 520).toString()}px`,
							marginLeft: "520px"
					  }
					: this.$store.state.menu
					? {
							width: `${(this.$vuetify.breakpoint.width - 300).toString()}px`,
							marginRight: "300px"
					  }
					: {})
			);
		}
	},
	mounted() {
		window.addEventListener("load", () => {
			this.loading = false;
		});
	}
};
</script>
<style>
.v-overlay--active:not(.loading-overlay) {
	z-index: 0 !important;
	display: none !important;
}
</style>
