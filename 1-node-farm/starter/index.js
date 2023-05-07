const fs = require("fs");
const http = require("http");
const url = require("url");

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
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview")
    res.end("This is the OVERVIEW page");
  else if (pathName === "/product") res.end("This is th PRODUCT page");
  else res.end("<h1>Page not Found!!!</h1>");
});

server.listen(8000, () => console.log("Listening Port..."));
