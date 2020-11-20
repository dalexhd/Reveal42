export const state = () => ({
  settings: {
    muted: false,
    subtitles: true,
    particles: true,
    follow: true,
  },
  pwa: {
    prompt: false,
    event: null,
  },
});

export const getters = {
  settings: (state) => {
    return state.settings;
  },
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
  showPwaInstallationMessage(state, data) {
    console.log(state, data);
    state.pwa.prompt = true;
    state.pwa.event = data;
  },
};
