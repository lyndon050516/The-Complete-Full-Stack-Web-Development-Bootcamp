//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express"; 
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
let authenticated = false;

const verifyPassword = (req, res, next) => {
  const password = req.body.password;
  if (password === "ILoveProgramming") {
    authenticated = true;
  } else {
    authenticated = false;
  }
  next();
};

app.use(express.urlencoded({ extended: true }));
app.use(verifyPassword);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (authenticated) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
