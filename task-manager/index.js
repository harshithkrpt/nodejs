const express = require("express");
const taskRoute = require("./routes/task");
const userRoute = require("./routes/user");

// Data base Connection Mongodb
require("./db/mongoose");

const app = express();

// FOR JSON Parsing Middle Ware
app.use(express.json());

// Routes
app.use(userRoute);
app.use(taskRoute);

module.exports = app;
