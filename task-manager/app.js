const express = require("express");

// Routes for User and Task
const taskRoute = require("./routes/task");
const userRoute = require("./routes/user");

// Data base Connection Mongodb
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

// FOR JSON Parsing Middle Ware
app.use(express.json());

// Routes
app.use(userRoute);
app.use(taskRoute);

app.listen(port, () => {
  console.log(`Server Started at PORT ${port}`);
});
