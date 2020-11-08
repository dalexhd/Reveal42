const bodyParser = require("body-parser");
const app = require("express")();
const axios = require("axios");

app.use(bodyParser.urlencoded({ extended: true }));
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

module.exports = app;
