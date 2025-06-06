// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";

const app = express();

app.use(express.static("public"));

const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";


app.get("/", async (req, res) => {
  try {
    const URL = `${API_URL}/random`;
    const response = await axios.get(URL);
    const { secret, username } = response.data;
    res.render("index.ejs", { secret: secret, user: username });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error fetching secret"); 
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
