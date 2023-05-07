const fs = require("fs");
const server = require("http").createServer();

// // Normal way of reading a large file takes a long time.
server.on("request", (req, res) => {
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  // });

  // // Solution 2
  // const readable = fs.createReadStream("test-file.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });

  // Best Solution
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});
server.listen(8080, () => console.log("Listening..."));
