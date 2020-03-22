// const rp = require("request-promise");
// const url = "https://www.reddit.com";

const fs = require("fs");

// rp(url)
//   .then(html => {
//     fs.writeFile("index.html", html, () => {
//       console.log("Completed");
//     });
//   })
//   .catch(err => {
//     console.log(err);
//   });

// USING PUPPETEER
console.log(html);
const puppetteer = require("puppeteer");

(async () => {
  const browser = await puppetteer.launch();
  const page = await browser.newPage();
  const html = await page.goto("https://news.ycombinator.com", {
    waitUntil: "networkidle2"
  });

  await browser.close();
})();
