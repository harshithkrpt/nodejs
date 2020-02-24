const express = require("express");
const router = express.Router(); // Create a Instance of Router for modularity

// middleware
router.use(function timeLog(req, res, next) {
  console.log("Time", Date.now());
  next();
});

// define the home page route
router.get("/", (req, res) => {
  res.send("Birds home page");
});

// define the about route
router.get("/about", function(req, res) {
  res.send("About birds");
});

module.exports = router;
