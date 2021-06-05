const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const json2csv = require("json2csv").Parser;

const WriteStream = fs.createWriteStream("webgreeks.csv");
const webGreeks = "http://webgeeks-3.herokuapp.com";
(async () => {
  let webGreeksData = [];

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
    let title1 = $("body > h1").text();
    let title2 = $("body > h2").text();
    WriteStream.write(`MainTitle: ${title1}, ${title2}`);
    // SubTitle
    let title3 = $("body > h3").each((i, el) => {
      const title = $(el).text();

      WriteStream.write(`subtitle: ${title}, `);
    });

    let paragraph = $("body > p").each((i, el) => {
      const para = $(el).text();

      WriteStream.write(`paragraph: ${para}, `);
    });

    let images = $("body > p > img").each((i, el) => {
      const img = $(el).attr("src");

      WriteStream.write(`images: ${img}, `);
    });
    let subimages = $("body > div > a > img").each(
      (i, el) => {
        const img = $(el).attr("src");
        const a = $(el).parent().attr("href");

        WriteStream.write(`images: ${img}, link: ${a}`);
      }
    );
  }
})();
