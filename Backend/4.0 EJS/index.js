import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  res.render("index.ejs", {
    dayType: dayOfWeek >= 1 && dayOfWeek <= 5 ? "weekday" : "weekend",
    advice:
      dayOfWeek >= 1 && dayOfWeek <= 5
        ? "it's time to work hard!"
        : "it's time to have fun!",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
