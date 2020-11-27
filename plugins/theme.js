export default ({ store, $vuetify }) => {
  const theme = store.state.settings.theme;
  if (theme) {
    if (theme === "system" && process.client) {
      const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      $vuetify.theme.isDark = dark;
    } else if (theme === "dark") {
      $vuetify.theme.isDark = true;
    } else {
      $vuetify.theme.isDark = false;
    }
  }
};
