import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "user_login",
  password: process.env.DB_PASSWORD,
  port: 5433,
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getUsers() {
  const result = await db.query("SELECT * FROM users");
  return result.rows;
}

async function getUser(email) {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows;
}

async function addUser(email, password) {
  const result = await db.query(
    "INSERT INTO users (email, password) VALUES ($1, $2)",
    [email, password]
  );
  return result.rows;
}

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    addUser(email, password);
    res.redirect("/login");
  } catch (error) {
    console.error("Error adding user:", error);
  }
 
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const user = await getUser(email);
    if (user.length > 0 && user[0].password === password) {
      res.render("secrets.ejs");
    } else {
      console.log("Invalid email or password");
      res.render("login.ejs");
    }
  } catch (error) {
    console.error("Error getting users:", error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
