import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import axios from "axios";

const app = express();
const RedisStore = connectRedis(session);
const RedisClient = redis.createClient({
	url: process.env.REDIS_URL || null
});

RedisClient.on("error", (error) => {
	console.error(error.message);
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// eslint-disable-next-line prefer-const
let sessionObject = {
	store: new RedisStore({ client: RedisClient }),
	secret: process.env.APP_SECRET,
	resave: true,
	saveUninitialized: true,
	credentials: true,
	cookie: {
		maxAge: 30 * 60 * 60 * 1000
	}
};
if (process.env.NODE_ENV === "production") {
	app.set("trust proxy", 1); // trust first proxy
	sessionObject.cookie.secure = true; // serve secure cookies
}
app.use(session(sessionObject));

// app.post("/intra", (req, res) => {
// 	axios
// 		.request({
// 			method: "POST",
// 			url: "https://api.intra.42.fr/oauth/token",
// 			data: {
// 				...req.body,
// 				client_secret: process.env.CLIENT_SECRET
// 			},
// 			headers: {
// 				Accept: "application/json"
// 			}
// 		})
// 		.then(async (response) => {
// 			req.session.user = await getIntraUserData(
// 				`Bearer ${response.data.access_token}`
// 			);
// 			req.session.cookie.maxAge = 30 * 60 * 60 * 1000;
// 			req.session.save(() => {
// 				return res.status(200).send(response.data);
// 			});
// 		})
// 		.catch((error) => {
// 			res.status(403).send(error);
// 		});
// });

// app.get("/me", async (req, res) => {
//   try {
//     const data = await getIntraUserData(req.cookies["auth._token.intra"]);
//     return res.status(200).send(data);
//   } catch (error) {
//     try {
//       const response = await getRefreshToken(
//         req.cookies["auth._refresh_token.intra"]
//       );
//       req.session.user = await getIntraUserData(
//         `Bearer ${response.data.access_token}`
//       );
//       req.session.cookie.maxAge = 2 * 60 * 60 * 1000;
//       req.session.save(() => {
//         return res.status(200).send(response.data);
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// });

app.get("/me", (req, res) => {
	if (typeof req.session.user === "undefined") {
		return res.status(401).send("Session not valid!");
	} else {
		return res.status(200).send(req.session.user);
	}
});

app.get("/spotify/callback", (req, res) => {
	axios
		.request({
			method: "POST",
			url: "https://accounts.spotify.com/api/token",
			params: {
				code: req.query.code,
				redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
				grant_type: "authorization_code"
			},
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${Buffer.from(
					`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
				).toString("base64")}`
			}
		})
		.then((response) => {
			res
				.cookie("spotify.access_token", response.data.access_token, {
					expires: new Date(Date.now() + response.data.expires_in * 1000)
				})
				.cookie("spotify.refresh_token", response.data.refresh_token, {
					expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
				})
				.redirect("/");
		})
		.catch((error) => {
			res.status(403).send(error);
		});
});

app.get("/spotify/me", (req, res) => {
	axios
		.get("https://api.spotify.com/v1/me", {
			headers: {
				Accept: "application/json",
				Authorization: req.headers.authorization
			}
		})
		.then((response) => {
			return res.status(200).json(response.data);
		})
		.catch((err) => {
			return res
				.status(err.response.status || 400)
				.send(err.response.data.error);
		});
});

app.get("/spotify/refresh", (req, res) => {
	axios
		.request({
			method: "POST",
			url: "https://accounts.spotify.com/api/token",
			params: {
				grant_type: "refresh_token",
				refresh_token: req.query.refresh_token
			},
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${Buffer.from(
					`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
				).toString("base64")}`
			}
		})
		.then((response) => {
			return res.status(200).json(response.data);
		})
		.catch((err) => {
			return res
				.status(err.response.status || 400)
				.send(err.response.data.error);
		});
});

app.get("/spotify", (req, res) => {
	const scopes = ["streaming", "user-read-email", "user-read-private"];
	// redirect to Spotify login page
	res.redirect(
		`${
			`https://accounts.spotify.com/authorize` +
			`?client_id=${process.env.SPOTIFY_CLIENT_ID}` +
			`&response_type=code` +
			`&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}`
		}${scopes.length > 0 ? `&scope=${scopes.join(" ")}` : ""}&show_dialog=true`
	);
});

const getIntraUserData = (token) => {
	return new Promise((resolve, reject) => {
		axios
			.request({
				method: "GET",
				url: "https://api.intra.42.fr/v2/me",
				headers: {
					Accept: "application/json",
					Authorization: token
				}
			})
			.then(({ data }) => {
				if (data.id === parseInt(process.env.PRESENTER_INTRA_ID, 10)) {
					data.role = "presenter";
				} else if (data.id === parseInt(process.env.BROADCASTER_INTRA_ID, 10)) {
					data.role = "broadcaster";
				} else {
					data.role = "viewer";
				}
				resolve({
					id: data.id,
					email: data.email,
					role: data.role,
					login: data.login,
					first_name: data.first_name,
					last_name: data.last_name,
					url: data.url,
					display_name: data.display_name,
					image_url: data.image_url,
					image_url_small: data.image_url.replace(
						data.login,
						`small_${data.login}`
					),
					staff: data.staff
				});
			})
			.catch((error) => {
				reject(error);
			});
	});
};

app.get("/intra/callback", (req, res) => {
	axios
		.request({
			method: "POST",
			url: "https://api.intra.42.fr/oauth/token",
			data: {
				code: req.query.code,
				client_secret: process.env.CLIENT_SECRET,
				client_id: process.env.CLIENT_ID,
				redirect_uri: `${process.env.URL}/auth/intra/callback`,
				grant_type: "authorization_code"
			},
			headers: {
				Accept: "application/json"
			}
		})
		.then(async (response) => {
			req.session.user = await getIntraUserData(
				`Bearer ${response.data.access_token}`
			);
			req.session.cookie.maxAge = new Date(
				Date.now() + response.data.expires_in * 1000
			);
			req.session.save(() => {
				return res
					.cookie("intra.access_token", response.data.access_token, {
						expires: new Date(Date.now() + response.data.expires_in * 1000)
					})
					.cookie("intra.refresh_token", response.data.refresh_token, {
						expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
					})
					.redirect("/");
			});
		})
		.catch((error) => {
			res.status(403).send(error);
		});
});

app.get("/intra/me", (req, res) => {
	if (typeof req.session.user === "undefined") {
		return res.status(401).send("Session not valid!");
	} else {
		return res.status(200).send(req.session.user);
	}
});

app.get("/intra/refresh", (req, res) => {
	axios
		.request({
			method: "POST",
			url: "https://api.intra.42.fr/oauth/token",
			params: {
				refresh_token: req.query.refresh_token,
				client_secret: process.env.CLIENT_SECRET,
				client_id: process.env.CLIENT_ID,
				redirect_uri: `${process.env.URL}/auth/intra/callback`,
				grant_type: "refresh_token"
			},
			headers: {
				Accept: "application/json"
			}
		})
		.then((response) => {
			req.session.save(async (session) => {
				req.session.user = await getIntraUserData(
					`Bearer ${response.data.access_token}`
				);
				req.session.cookie.maxAge = new Date(
					Date.now() + response.data.expires_in * 1000
				);
				req.session.save(() => {
					return res
						.cookie("intra.access_token", response.data.access_token, {
							expires: new Date(Date.now() + response.data.expires_in * 1000)
						})
						.cookie("intra.refresh_token", response.data.refresh_token, {
							expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
						})
						.status(200)
						.send(response.data);
				});
			});
		})
		.catch((err) => {
			return res
				.status(err.response.status || 400)
				.send(err.response.data.error);
		});
});

app.get("/intra", (req, res) => {
	const scopes = [
		"public"
		// "projects",
		// "profile",
		// "elearning"
	];
	// redirect to Intra login page
	res.redirect(
		`${
			`https://api.intra.42.fr/oauth/authorize` +
			`?client_id=${process.env.CLIENT_ID}` +
			`&response_type=code` +
			`&redirect_uri=${process.env.URL}/auth/intra/callback`
		}${scopes.length > 0 ? `&scope=${scopes.join(" ")}` : ""}`
	);
});

module.exports = app;
