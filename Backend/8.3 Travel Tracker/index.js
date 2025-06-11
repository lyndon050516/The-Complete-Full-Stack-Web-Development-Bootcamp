import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  password: process.env.DB_PASS,
  host: "localhost",
  port: 5432,
  database: "world",
});

db.connect();

async function getVisitedCountries() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const visitedCountries = await getVisitedCountries();
  res.render("index.ejs", {
    countries: visitedCountries,
    total: visitedCountries.length,
  });
});

app.post("/add", async (req, res) => {
  const inputCountry = req.body.country;
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE LOWER($1)",
      [inputCountry.toLowerCase()]
    );
    let inputCode = result.rows[0].country_code;
    try {
      await db.query(
        `INSERT INTO visited_countries (country_code) VALUES ('${inputCode}')`
      );
      res.redirect("/");
    } catch (error) {
      const visitedCountries = await getVisitedCountries();
      res.render("index.ejs", {
        countries: visitedCountries,
        total: visitedCountries.length,
        error: "Country already added, try again",
      });
      return;
    }
  } catch (error) {
    const visitedCountries = await getVisitedCountries();
    res.render("index.ejs", {
      countries: visitedCountries,
      total: visitedCountries.length,
      error: "Country not found, try again",
    });
    return;
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
