const fs = require("fs");
const crypto = require("node:crypto");
crypto.DEFAULT_ENCODING = "hex";
setTimeout(() => console.log("Timeout 1 is finished"), 0);
setImmediate(() => console.log("Immediate 1 is finished"));

fs.readFile("./test-file.txt", "utf-8", () => {
  console.log("Reading file is finished");
  console.log("------------------------");
  setTimeout(() => console.log("Timeout 2 is finished"), 0);
  setTimeout(() => console.log("Timeout 3 is finished"), 3000);
  setImmediate(() => console.log("Immediate 2 is finished"));
  crypto.pbkdf2(
    "Asli seni çok seviyorum",
    "tahir",
    100000,
    512,
    "sha512",
    (err, buffer) => {
      if (!err) console.log(buffer);
    }
  );
  crypto.pbkdf2(
    "Asli seni çok seviyorum",
    "tahir",
    100000,
    512,
    "sha512",
    (err, buffer) => {
      if (!err) console.log(buffer);
    }
  );
  crypto.pbkdf2(
    "Asli seni çok seviyorum",
    "tahir",
    100000,
    512,
    "sha512",
    (err, buffer) => {
      if (!err) console.log(buffer);
    }
  );
  crypto.pbkdf2(
    "Asli seni çok seviyorum",
    "tahir",
    100000,
    512,
    "sha512",
    (err, buffer) => {
      if (!err) console.log(buffer);
    }
  );
});
console.log("Hello from top-level code !!!");
