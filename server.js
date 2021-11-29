const express = require("express");
const port = 3000;
const cheerio = require("cheerio");
const cors = require("cors");
const axios = require("axios");
const { html } = require("cheerio/lib/api/manipulation");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.status(200).send(`
  <h1> AXLR8 Github Leaderboard API </h1>
  <a href="#" target="_blank">Click me to see something</a>
  `);
});

app.get("/members", async (req, res) => {
  // convert to array later
  var userID = "Sedem1738";

  await axios.get(`https://github.com/Bheny`).then((response) => {
    const plainHtml = response.data;
    // console.log(plainHtml);

    try {
      const $ = cheerio.load(plainHtml);
      const activityList = $(".TimelineItem")
        // .first()
        .children(".TimelineItem-body")
        .text()
        .replace(/\s\s+/g, "\n");

      console.log(activityList);
      res.json(activityList);
    } catch (err) {
      console.log(err, "test failed");
    }
    res.status(200).json("Web Page Scraped Succesfully");
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
