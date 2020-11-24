export const state = () => ({
  settings: {
    muted: false,
    subtitles: true,
    particles: true,
    follow: true,
    theme: "system",
  },
  voting: false,
});

export const getters = {
  settings: (state) => {
    return state.settings;
  },
  voting: (state) => state.voting,
};

export const mutations = {
  toggleAudio(state, enabled) {
    state.settings.muted = enabled;
    if (process.client) {
      document.querySelectorAll("video").forEach(function (element) {
        element.plyr.muted = enabled;
        element.setAttribute("muted", enabled);
      });
    }
  },
  toggleSubtitles(state, enabled) {
    state.settings.subtitles = enabled;
    if (process.client) {
      document.querySelectorAll("video").forEach(function (element) {
        element.plyr.currentTrack = enabled ? 0 : -1;
      });
    }
  },
  toggleParticles(state, enabled) {
    state.settings.particles = enabled;
  },
  toggleFollow(state, enabled) {
    state.settings.follow = enabled;
  },
  toggleTheme(state, value) {
    state.settings.theme = value;
  },
  toggleVoting(state, value) {
    state.voting = value;
  },
};
