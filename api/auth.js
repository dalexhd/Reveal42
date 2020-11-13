import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import axios from "axios";

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// eslint-disable-next-line prefer-const
let sessionObject = {
  secret: process.env.APP_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000,
  },
};
if (typeof process.env.PORT !== "undefined") {
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

const getUserData = async (token) => {
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
        resolve({
          id: data.id,
          email: data.email,
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
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(403).send(error);
    });
});

app.get("/me", async (req, res) => {
  if (typeof req.session.user === "undefined") {
    try {
      req.session.user = await getUserData(req.headers.authorization);
      req.session.cookie.maxAge = 2 * 60 * 60 * 1000;
      req.session.save(() => {
        return res.status(200).send(req.session.user);
      });
    } catch (error) {
      return res.status(401).send(error);
    }
  } else {
    return res.status(200).send(req.session.user);
  }
});

module.exports = app;
