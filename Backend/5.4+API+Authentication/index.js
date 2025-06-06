import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "lyndon";
const yourPassword = "1234";
const yourAPIKey = "64fb1ea1-f87c-4d04-8a11-5d402eca96a2";
const yourBearerToken = "f0e83f7d-1079-4d18-8fd4-de1abed88e19";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", (req, res) => {
  axios
    .get(`${API_URL}random`)
    .then((response) => {
      const stringData = JSON.stringify(response.data);
      res.render("index.ejs", { content: stringData });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

app.get("/basicAuth", (req, res) => {
  const URL = `${API_URL}all?page=2`;
  axios
    .get(URL, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    })
    .then((response) => {
      const stringData = JSON.stringify(response.data);
      res.render("index.ejs", { content: stringData });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

app.get("/apiKey", (req, res) => {
  const URL = `${API_URL}filter`;
  axios
    .get(URL, {
      params: {
        score: 5, 
        apiKey: yourAPIKey,
      },
    })
    .then((response) => {
      const stringData = JSON.stringify(response.data);
      res.render("index.ejs", { content: stringData });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

app.get("/bearerToken", (req, res) => {
  const URL = `${API_URL}secrets/42`;
  axios
    .get(URL, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    })
    .then((response) => {
      const stringData = JSON.stringify(response.data);
      res.render("index.ejs", { content: stringData });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
