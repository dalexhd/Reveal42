import cookie from "cookie";
import axios from "axios";
import * as Cookies from "js-cookie";

export const state = () => ({
  settings: {
    muted: false,
    subtitles: true,
    particles: true,
    follow: true,
    theme: "system",
  },
  voting: false,
  spotify: {
    loggedIn: false,
    user: null,
    access_token: null,
  },
});

export const getters = {
  settings: (state) => {
    return state.settings;
  },
  voting: (state) => state.voting,
  spotify: (state) => state.spotify,
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
  setSpotifyLoggedIn(state, value) {
    state.spotify.loggedIn = value;
  },
  setSpotifyUser(state, value) {
    state.spotify.user = value;
  },
  setSpotifyAccessToken(state, value) {
    state.spotify.access_token = value;
  },
};

export const actions = {
  async nuxtServerInit({ commit }, { req: { headers }, res }) {
    if (typeof headers.cookie === "undefined") return;
    const cookies = cookie.parse(headers.cookie);
    if (typeof cookies["spotify.access_token"] !== "undefined") {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${cookies["spotify.access_token"]}`,
          },
        });
        commit("setSpotifyLoggedIn", true);
        commit("setSpotifyLoggedIn", true);
        commit("setSpotifyAccessToken", cookies["spotify.access_token"]);
      } catch (response) {
        if (
          response.status === 401 &&
          typeof cookies["spotify.refresh_token"] !== "undefined"
        ) {
          try {
            const response = await axios.request({
              method: "POST",
              url: "https://accounts.spotify.com/api/token",
              params: {
                grant_type: "refresh_token",
                refresh_token: cookies["spotify.refresh_token"],
              },
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(
                  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                ).toString("base64")}`,
              },
            });
            res.setHeader("Set-Cookie", [
              `spotify.access_token=${response.data.access_token};Max-Age=${
                response.data.expires_in * 1000
              };HttpOnly`,
            ]);
          } catch (error) {
            res.setHeader("Set-Cookie", [
              `spotify.access_token=;Max-Age=-1`,
              `spotify.refresh_token=;Max-Age=-1`,
            ]);
          }
        }
      }
    }
  },
};
