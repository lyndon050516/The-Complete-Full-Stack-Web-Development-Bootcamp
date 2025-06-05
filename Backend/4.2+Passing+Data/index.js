import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let count = 0;

function countLetters(req, res, next) {
  const { fName, lName } = req.body;
  const name = fName + lName;
  const numLetters = name.length;
  count = numLetters;
  next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(countLetters);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  res.render("index.ejs", { count: count });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
