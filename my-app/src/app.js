const path = require("path");
const birds = require("../routes/hello");

// Routing in Nodejs

// app.METHOD(PATH,HANDLER)

// get
// post
// put
// delete

const express = require("express");

const app = express();

// serving static files
app.use(express.static(path.join(__dirname, "../public")));
app.use("/static", express.static(path.join(__dirname, "../static")));

app.get("/", (req, res) => {
  res.send("<h1>Hello Welcome to Express</h1>");
});

app.all("/secret", (req, res, next) => {
  console.log("This is a Middle Ware Request");
  res.send("Congrats");
  next();
});

// match acd and abcd
app.get("/ab?cd", (req, res) => {
  res.send("Congrtars");
});

// + atleast once
// b+ atleast once matches abd abbbbbbd too

app.get("/ab+d", (req, res) => {
  res.send("Hello World ab+d");
});

// * anything
app.get("/ab*d", (req, res) => {
  res.send("Hello World ab*d");
});

// () combining
// ? optional
// This route path will match /abe and /abcde.
app.get("/ab(cd)?e", (req, res) => {
  res.send("ab(cd)?e");
});

app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
});

// Route path: /flights/:from-:to
// Request URL: http://localhost:3000/flights/LAX-SFO
// req.params: { "from": "LAX", "to": "SFO" }

// Route path: /plantae/:genus.:species
// Request URL: http://localhost:3000/plantae/Prunus.persica
// req.params: { "genus": "Prunus", "species": "persica" }

app.get("/user/:userId(\\d+)", (req, res) => {
  res.send(req.params);
});

// Route Handlers
app.get(
  "/example/b",
  (req, res, next) => {
    console.log("The Response Will be Send by the next function ...");
    next();
  },
  (req, res) => {
    res.send("Hello from B!");
  }
);

// an array of callbacks

var cb0 = (req, res, next) => {
  console.log("CB0");
  next();
};

var cb1 = (req, res, next) => {
  console.log("CB1");
  next();
};

var cb2 = (req, res, next) => {
  res.send("Hello From CB2");
};

app.get("/example/c", [cb0, cb1, cb2]);

// Response Methods
// res.download
// res.end
// res.json
// res.jsonp
// res.redirect
// res.send
// res.sendFile
// res.sendStatus

// Chainable Route Handlers
app
  .route("/book")
  .get((req, res) => {
    res.send("Get a Random Book");
  })
  .post((req, res) => {
    res.send("Add a Book");
  })
  .put((req, res) => {
    res.send("Update the Book");
  });

app.use("/birds", birds);

app.listen(3000, () => {
  console.log("Server Started on Port 3000");
});
