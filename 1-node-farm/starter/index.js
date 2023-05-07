const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replace-template");
const slugify = require("slugify");
// // Blocking, synchronious way
// const textIn = fs.readFile("./txt/input.txt", "utf8", (err, data1) => {});
// console.log(textIn);

// const textOut = `This is what we know about the avokado ${textIn}.\nCreated on ${Date.now()} `;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File Written!");
// // Non-blocking, asynchronious way

// fs.readFile("./txt/start.txt", "utf8", (err, data1) => {
//   if (err) console.log("Error reading start.txt file");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     fs.readFile("./txt/append.txt", "utf8", (err, data3) => {
//       if (err) consonle.log("Error reading append.txt");
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, (err) => {
//         if (err) console.log("Problem writing to the file!!!!");
//         console.log("Your file has been written!");
//       });
//     });
//   });
// });

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);
const slugs = productData.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  // OVERVIEW_PAGE
  if (pathname === "/" || pathname === "/overview") {
    const cardsHtml = productData
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(output);
  }
  //PRODUCT_PAGE
  else if (pathname === "/product") {
    const product = productData[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(output);
  }
  // API
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
    //NOT_FOUND
  } else res.end("<h1>Page not Found!!!</h1>");
});

server.listen(8000, () => console.log("Listening Port..."));
