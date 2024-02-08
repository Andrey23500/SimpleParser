const cheerio = require("cheerio");
const axios = require("axios");
const fs = require('fs');

async function performScraping(link) {
   const axiosResponse = await axios.request({
      method: "GET",
      url: link,
   })

   const $ = cheerio.load(axiosResponse.data);
   const productName = $("body").find('h1').text();
   const price = $("body").find(".product-buy__data .product-buy__price-value").first().text();
   const vendor = ($("body").find(".product-buy__code").text()).split(" ")[1];

   const scrapedData = [productName, price, vendor];
   const arrayCSV = scrapedData.join(';') + '\n';
   fs.appendFile("LogsParser.csv", arrayCSV, (err) => {
      console.log(err || "done");
   });
}

let arrLinks = [
   "https://www.kuvalda.ru/catalog/6435/product-75080/",
   "https://www.kuvalda.ru/catalog/6435/product-45703/",
   "https://www.kuvalda.ru/catalog/2074/product-145868/",
   "https://www.kuvalda.ru/catalog/1871/product-111363/",
   "https://www.kuvalda.ru/catalog/7763/product-27617/",
   "https://www.kuvalda.ru/catalog/7763/product-27616/",
   "https://www.kuvalda.ru/catalog/7038/product-140566/",
   "https://www.kuvalda.ru/catalog/6114/product-135380/",
   "https://kuvalda.ru/catalog/4607/product-64880/",
   "https://www.kuvalda.ru/catalog/5473/product-93826/",
   "https://www.kuvalda.ru/catalog/8938/product-93276/",
   "https://www.kuvalda.ru/catalog/3539/product-82634/",
];
for(let link of arrLinks) {
   performScraping(link);
}
