const path = require("path");
const express = require("express");

// database connection
const db = require("./db/config");

// importing routes
const todo = require("./routes/todo");

const app = express();
db();

app.use(express.json());

// Public Templates Middle Ware
app.use(express.static(path.join(__dirname, "./public")));

// App Using External Routes
app.use(todo);

// Listen to Server
app.listen(3000, () => {
  console.log("Server Started on PORT 3000");
});
