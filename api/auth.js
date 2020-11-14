import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import axios from "axios";

const app = express();
const RedisStore = connectRedis(session);
const RedisClient = redis.createClient();

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

// Create express router
const router = express.Router();

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

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
          displayname: data.displayname,
          image_url: data.image_url,
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

app.get("/me", (req, res) => {
  if (typeof req.session.user === "undefined") {
    return res.status(401).send("Session not valid!");
  } else {
    return res.status(200).send(req.session.user);
  }
});

module.exports = app;
