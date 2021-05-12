export default ({ store, isDev }) => {
	window.addEventListener("beforeinstallprompt", (e) => {
		e.preventDefault();
		console.log("PWA install prompt fired: ", e);
		store.commit("showPwaInstallationMessage", e);
	});
};
