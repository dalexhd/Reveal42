import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import axios from "axios";
import firebaseAdmin from "firebase-admin";

const app = express();
const RedisStore = connectRedis(session);
const RedisClient = redis.createClient({
  url: process.env.REDIS_URL || null,
});

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
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
      .then(async ({ data }) => {
        if (data.id === parseInt(process.env.PRESENTER_INTRA_ID, 10)) {
          data.role = "presenter";
        } else if (data.id === parseInt(process.env.BROADCASTER_INTRA_ID, 10)) {
          data.role = "broadcaster";
        } else {
          data.role = "viewer";
        }
        const result = {
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
        };
        try {
          // eslint-disable-next-line camelcase
          const { id, login, image_url_small, email } = result;
          // Create or update the user account.
          const userCreationTask = firebaseAdmin
            .auth()
            .updateUser(id.toString(), {
              displayName: login,
              photoURL: image_url_small,
            })
            .catch((error) => {
              // If user does not exists we create it.
              if (error.code === "auth/user-not-found") {
                return firebaseAdmin.auth().createUser({
                  uid: id.toString(),
                  displayName: login,
                  photoURL: image_url_small,
                  email,
                  emailVerified: true,
                });
              }
              throw error;
            });
          await userCreationTask;
          const firebaseToken = await firebaseAdmin
            .auth()
            .createCustomToken(result.id.toString(), {
              role: result.role,
            });
          result.firebaseToken = firebaseToken;
        } catch (error) {
          console.log(error);
        }
        resolve(result);
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
      response.data.firebaseToken = req.session.user.firebaseToken;
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
