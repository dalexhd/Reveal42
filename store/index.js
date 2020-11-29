import cookie from "cookie";
import axios from "axios";
import * as Cookies from "js-cookie";

export const state = () => ({
  settings: {
    muted: false,
    subtitles: true,
    particles: true,
    follow: true,
    theme: "dark",
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
  logoutFromSpotify(state) {
    state.spotify.loggedIn = false;
    state.spotify.user = null;
    state.spotify.access_token = null;
    if (process.client) {
      document.cookie =
        "spotify.access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie =
        "spotify.refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
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

    const getSpotifyUser = function (token = null) {
      return new Promise(function (resolve, reject) {
        axios
          .get(`${process.env.URL}/auth/spotify/me`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${
                token || cookies["spotify.access_token"]
              }`,
            },
          })
          .then((response) => {
            commit("setSpotifyLoggedIn", true);
            commit("setSpotifyUser", response.data);
            resolve(true);
          })
          .catch((err) => {
            reject(err);
          });
      });
    };

    if (typeof cookies["spotify.access_token"] !== "undefined") {
      try {
        await getSpotifyUser();
      } catch (err) {
        if (err.response.status === 401) {
          try {
            const response = await axios.get(
              `${process.env.URL}/auth/spotify/refresh`,
              {
                params: {
                  refresh_token: cookies["spotify.refresh_token"],
                },
              }
            );
            res.setHeader("Set-Cookie", [
              `spotify.access_token=${response.data.access_token};Max-Age=${
                response.data.expires_in * 1000
              };HttpOnly`,
            ]);
            await getSpotifyUser(response.data.access_token);
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
