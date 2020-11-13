export const state = () => ({
  settings: {
    audio: process.client && localStorage.getItem("audio-enabled") === "true",
  },
});

export const mutations = {
  muteAudio(state) {
    state.settings.audio = false;
    if (process.client) {
      document.querySelectorAll("video").forEach(function (element) {
        element.plyr.muted = true;
        element.setAttribute("muted", "muted");
      });
      localStorage.setItem("audio-enabled", false);
    }
  },
  activateAudio(state) {
    state.settings.audio = true;
    if (process.client) {
      document.querySelectorAll("video[muted]").forEach(function (element) {
        element.plyr.muted = false;
        element.setAttribute("muted", false);
        element.setAttribute("controls", "controls");
      });
      localStorage.setItem("audio-enabled", true);
    }
  },
};
