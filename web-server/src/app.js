const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup for Handle bars and customizing to look into templates
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Static Directives
app.use(express.static(path.join(__dirname, "../public"))); // middleware -> customize your server

// set a route for index.hbs
app.get("", (req, res) => {
  res.render("index", {
    name: "Hello"
  });
});

app.get("/about", (req, res) => {
  res.send("<h1>About</h1>");
});

app.get("/help/*", (req, res) => {
  res.send("Help Article Not Found");
});

app.get("/products", (req, res) => {
  console.log(req.query.name);
  res.send("Hello");
});

// 404 Match
app.get("*", (req, res) => {
  res.send("404");
});

app.listen(3000, () => {
  console.log("Server Started at Port 3000");
});
