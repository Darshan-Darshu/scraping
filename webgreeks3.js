const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const json2csv = require("json2csv").Parser;

const WriteStream = fs.createWriteStream("webgreeks.csv");
const webGreeks =
  "http://webgeeks-3.herokuapp.com/sonnet1.html";
(async () => {
  {
    const response = await request({
      uri: webGreeks,
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language":
          "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
      },
      // json: true,
    });

    let $ = cheerio.load(response);
    // Title
    let html = $("html");
    console.log(html);
  }
})();
