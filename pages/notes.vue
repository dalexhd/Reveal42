<template>
	<v-app id="inspire">
		<v-app-bar app color="deep-dark accent-4" dark dense>
			<v-toolbar-title>Panel de control</v-toolbar-title>

			<v-spacer></v-spacer>
			<div v-if="$store.state.intra.loggedIn">
				<span class="mr-2">{{ $store.state.intra.user.login }}</span>
				<v-avatar size="40">
					<img
						class="object-cover"
						:src="$store.state.intra.user.image_url_small"
						:alt="$store.state.intra.user.display_name"
					/>
				</v-avatar>
				<v-btn class="ml-4" icon @click="$auth.logout()">
					<v-icon>$mdiLogout</v-icon>
				</v-btn>
			</div>
		</v-app-bar>
		<v-main>
			<v-container fill-height>
				<v-row class="fill-height">
					<v-col cols="12" lg="8" md="12">
						<iframe
							id="current-slide"
							frameborder="0"
							:src="currentUrl"
							title="Current slide"
						></iframe>
					</v-col>
					<v-row>
						<v-col class="w-full" cols="12" xs="12">
							<iframe
								id="upcoming-slide"
								frameborder="0"
								:src="upcomingUrl"
								title="Upcoming slide"
							></iframe>
						</v-col>
						<v-col cols="12"
							><v-card id="speaker-notes" outlined tile></v-card
						></v-col>
					</v-row>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
export default {
	middleware: "auth",
	data: () => ({
		links: ["Panel de control"],
		params: [
			"receiver",
			"progress=false",
			"history=false",
			"transition=none",
			"backgroundTransition=none"
		].join("&")
	}),
	computed: {
		currentUrl() {
			return `/?${this.params}&postMessageEvents=true`;
		},
		upcomingUrl() {
			return `/?${this.params}&controls=false`;
		}
	},
	mounted() {
		require("~/assets/plugins/server/admin");
	},
	methods: {
		logout() {
			this.$store.commit("logoutFromIntra");
		}
	}
};
</script>
<style lang="scss">
@import "~/assets/css/pages/notes";
</style>
