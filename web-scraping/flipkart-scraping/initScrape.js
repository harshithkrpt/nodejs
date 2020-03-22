const puppeteer = require("puppeteer");
const fs = require("fs");

const initScrape = async url => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    //   Return The Browser Context
    let store = await page.evaluate(() => {
      const images = [];
      const titles = [];
      const prizes = [];
      const flipKartImageList = document.querySelectorAll("._3togXc");
      const flipKartTitlList = document.querySelectorAll("._2mylT6");
      const flipKartPriceList = document.querySelectorAll("._1vC4OE");

      flipKartImageList.forEach(image => {
        images.push(image.src);
      });
      flipKartTitlList.forEach(title => {
        titles.push(title.title);
      });
      flipKartPriceList.forEach(prize => {
        prizes.push(prize.innerText);
      });
      return [images, prizes, titles];
    });
    await browser.close();
    //   Save to File

    let newStore = [];
    store[0].forEach((image, index) => {
      newStore.push({
        imageLink: image,
        prize: store[1][index],
        title: store[2][index]
      });
    });

    console.log(newStore);

    await fs.writeFile("flipkart-data.json", JSON.stringify(newStore), () => {
      console.log("Success");
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = initScrape;

initScrape(
  "https://www.flipkart.com/mens-clothing/tshirts/pr?sid=2oq,s9b,j9y&otracker=nmenu_sub_Men_0_T-Shirts"
);
