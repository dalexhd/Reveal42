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
  url: process.env.REDIS_URL || null,
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// eslint-disable-next-line prefer-const
let sessionObject = {
  store: new RedisStore({ client: RedisClient }),
  secret: process.env.APP_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000,
  },
};
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sessionObject.cookie.secure = true; // serve secure cookies
}
app.use(session(sessionObject));

const getUserData = (token) => {
  return new Promise((resolve, reject) => {
    axios
      .request({
        method: "GET",
        url: "https://api.intra.42.fr/v2/me",
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
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
          staff: data.staff,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

app.post("/intra", (req, res) => {
  axios
    .request({
      method: "POST",
      url: "https://api.intra.42.fr/oauth/token",
      data: {
        ...req.body,
        client_secret: process.env.CLIENT_SECRET,
      },
      headers: {
        Accept: "application/json",
      },
    })
    .then(async (response) => {
      req.session.user = await getUserData(
        `Bearer ${response.data.access_token}`
      );
      req.session.cookie.maxAge = 2 * 60 * 60 * 1000;
      req.session.save(() => {
        return res.status(200).send(response.data);
      });
    })
    .catch((error) => {
      res.status(403).send(error);
    });
});

app.get("/spotify/callback", (req, res) => {
  axios
    .request({
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      params: {
        code: req.query.code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        grant_type: "authorization_code",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
    })
    .then((response) => {
      res
        .cookie("spotify.access_token", response.data.access_token, {
          expires: new Date(Date.now() + response.data.expires_in * 1000),
        })
        .cookie("spotify.refresh_token", response.data.refresh_token, {
          expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        })
        .redirect("/");
    })
    .catch((error) => {
      res.status(403).send(error);
    });
});

app.get("/spotify", (req, res) => {
  const scopes = ["streaming", "user-read-email"];
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

app.get("/me", (req, res) => {
  if (typeof req.session.user === "undefined") {
    return res.status(401).send("Session not valid!");
  } else {
    return res.status(200).send(req.session.user);
  }
});

module.exports = app;
