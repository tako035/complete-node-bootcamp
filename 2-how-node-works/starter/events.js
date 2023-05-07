const eventEmitter = require("events");
const http = require("http");
class Sales extends eventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new Sales();

myEmitter.on("NewSale", () => console.log("A new sale emitted"));
myEmitter.on("NewSale", () => console.log("Customer name: Tahir"));
myEmitter.emit("NewSale");

/////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request recieved by the server");
  res.end("Request received.");
});

server.on("close", (req, res) => console.log("Server connection closed!"));
server.listen(8080, () => console.log("Listening on port 8080 !"));
