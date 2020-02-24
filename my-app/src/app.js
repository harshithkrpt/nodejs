const express = require("express");
const mware = require("../middleware/my-middleware");

const app = express();

// setting a view engine
app.set("view engine", "pug");

const myLogger = function(req, res, next) {
  console.log("LOGGED");
  next();
};

// A Request Time Middle Ware
const requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

app.use(myLogger);
app.use(requestTime);
app.use(mware({ name: "Harshith" }));

app.get("/", function(req, res) {
  res.render("index", { title: "Hello", message: "World" });
});

app.get("/time", (req, res) => {
  var responseText = `<small>Time : ${new Date(req.requestTime)}</small>`;
  res.send(responseText);
});

app.listen(3000, () => {
  console.log("Server Stared At Port 3000");
});
