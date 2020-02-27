const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = 3000 || process.env.PORT;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

let count = 0;

io.on("connection", socket => {
  console.log("New WebSocker Connection");

  socket.emit("countUpdated", count);

  socket.on("increment", () => {
    count++;
    // this emits to single connection
    // socket.emit("countUpdated", count);
    // to every single connection
    io.emit("countUpdated", count);
  });
});

server.listen(port, () => {
  console.log("Server Started at PORT 3000");
});
