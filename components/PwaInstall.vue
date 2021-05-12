<template>
	<v-snackbar v-model="snackbar" multi-line :timeout="8000" light top>
		<v-icon>$mdiArrowDownBoldHexagonOutline</v-icon>
		Instalar presentación (recomendado)
		<template #action>
			<v-btn
				v-if="!$vuetify.breakpoint.mobile"
				color="primary"
				text
				@click="dismiss"
				>No, gracias</v-btn
			>
			<v-btn color="primary" text @click="install">Instalar</v-btn>
		</template>
	</v-snackbar>
</template>
<script>
export default {
	name: "PwaInstall",
	data() {
		return {
			snackbar: false,
			deferredPrompt: null
		};
	},
	beforeMount() {
		window.addEventListener("beforeinstallprompt", (e) => {
			e.preventDefault();
			this.deferredPrompt = e;
			setTimeout(() => {
				this.snackbar = true;
			}, 1500);
		});
		window.addEventListener("appinstalled", () => {
			this.deferredPrompt = null;
		});
	},
	methods: {
		dismiss() {
			this.snackbar = false;
		},
		install() {
			this.snackbar = false;
			this.deferredPrompt.prompt();
		}
	}
};
</script>
