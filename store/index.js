import cookie from "cookie";
import axios from "axios";

export const state = () => ({
	settings: {
		muted: false,
		subtitles: true,
		particles: true,
		follow: true,
		theme: "dark"
	},
	menu: false,
	voting: false,
	spotify: {
		loggedIn: false,
		user: null,
		access_token: null
	},
	intra: {
		loggedIn: false,
		user: null,
		access_token: null
	}
});

export const getters = {
	settings: (state) => {
		return state.settings;
	},
	voting: (state) => state.voting,
	spotify: (state) => state.spotify
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
	toggleMenu(state, value) {
		state.menu = value;
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
	logoutFromIntra(state) {
		state.intra.loggedIn = false;
		state.intra.user = null;
		state.intra.access_token = null;
		if (process.client) {
			document.cookie =
				"intra.access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
			document.cookie =
				"intra.refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
		}
	},
	setIntraLoggedIn(state, value) {
		state.intra.loggedIn = value;
	},
	setIntraUser(state, value) {
		state.intra.user = value;
	},
	setIntraAccessToken(state, value) {
		state.intra.access_token = value;
	},
	manageCookies(state, enabled) {
		if (process.client) {
			// eslint-disable-next-line no-undef
			klaro.show();
		}
	}
};

export const actions = {
	async nuxtServerInit({ commit }, { req: { sessionID, headers }, res }) {
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
							}`
						}
					})
					.then((response) => {
						commit("setSpotifyLoggedIn", true);
						commit("setSpotifyUser", response.data);
						commit("setSpotifyAccessToken", cookies["spotify.access_token"]);
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
									refresh_token: cookies["spotify.refresh_token"]
								}
							}
						);
						res.setHeader("Set-Cookie", [
							`spotify.access_token=${response.data.access_token};Max-Age=${
								response.data.expires_in * 1000
							};HttpOnly`
						]);
						await getSpotifyUser(response.data.access_token);
					} catch (error) {
						res.setHeader("Set-Cookie", [
							`spotify.access_token=;Max-Age=-1`,
							`spotify.refresh_token=;Max-Age=-1`
						]);
					}
				}
			}
		}

		const getIntraUser = function (token = null) {
			return new Promise(function (resolve, reject) {
				axios
					.get(`${process.env.URL}/auth/intra/me`, {
						headers: {
							Accept: "application/json",
							Cookie: `connect.sid=${token || cookies["connect.sid"]};`
						},
						withCredentials: true
					})
					.then((response) => {
						commit("setIntraLoggedIn", true);
						commit("setIntraUser", response.data);
						commit("setIntraAccessToken", cookies["intra.access_token"]);
						resolve(true);
					})
					.catch((err) => {
						reject(err);
					});
			});
		};

		if (typeof cookies["intra.access_token"] !== "undefined") {
			try {
				await getIntraUser();
			} catch (err) {
				if (err.response.status === 401) {
					try {
						const response = await axios.get(
							`${process.env.URL}/auth/intra/refresh`,
							{
								params: {
									refresh_token: cookies["intra.refresh_token"]
								}
							}
						);
						res.setHeader("Set-Cookie", response.headers["set-cookie"]);
						await getIntraUser(
							response.headers["set-cookie"][2]
								.match("(^|;)\\s*connect.sid\\s*=\\s*([^;]+)")
								?.pop() || ""
						);
					} catch (error) {
						res.setHeader("Set-Cookie", [
							`intra.access_token=;Max-Age=-1`,
							`intra.refresh_token=;Max-Age=-1`
						]);
					}
				}
			}
		}
	}
};
