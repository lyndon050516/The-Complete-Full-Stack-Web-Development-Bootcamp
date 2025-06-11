import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: process.env.DB_PASSWORD,
  port: 5433,
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getItems() {
  const result = await db.query("SELECT * FROM items ORDER BY id ASC");
  return result.rows;
}

async function addItem(item) {
  const result = await db.query("INSERT INTO items (title) VALUES ($1)", [
    item,
  ]);
  return result.rows;
}

async function updateItem(id, title) {
  const result = await db.query("UPDATE items SET title = $1 WHERE id = $2", [
    title,
    id,
  ]);
  return result.rows;
}

async function deleteItem(id) {
  const result = await db.query("DELETE FROM items WHERE id = $1", [id]);
  return result.rows;
}

app.get("/", async (req, res) => {
  try {
    const items = await getItems();
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (error) {
    console.error("Error fetching items:", error);
  }
});

app.post("/add", (req, res) => {
  try {
    const item = req.body.newItem;
    addItem(item);
    res.redirect("/");
  } catch (error) {
    console.error("Error adding item:", error);
  }
});

app.post("/edit", (req, res) => {
  try {
    const updatedItemId = req.body.updatedItemId;
    const updatedItemTitle = req.body.updatedItemTitle;
    updateItem(updatedItemId, updatedItemTitle);
    res.redirect("/");
  } catch (error) {
    console.error("Error updating item:", error);
  }
});

app.post("/delete", (req, res) => {
  try {
    const deleteItemId = req.body.deleteItemId;
    deleteItem(deleteItemId);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting item:", error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
