const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

async function main(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });
  const tab = await browser.newPage();
  await tab.goto(url, {waitUntil:'networkidle0'});
  console.log("done");
  browser.close();
}


app.get('/', (req, res) => {
    main(req.query.url);
    res.json({
        status: true,
        url: req.query.url
    });
});

app.listen(process.env.PORT || 3000);