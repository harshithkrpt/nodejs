const express = require("express");

const taskRoute = require("./routes/task");
const userRoute = require("./routes/user");

require("./db/mongoose");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use(userRoute);
app.use(taskRoute);

app.listen(port, () => {
  console.log(`Server Started on PORT ${port}`);
});
