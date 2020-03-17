const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

// Call Back has 2 params IncomingMessage and ServerResponse

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
