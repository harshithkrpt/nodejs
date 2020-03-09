const express = require("express");
const redis = require("redis");

const client = redis.createClient();
const { promisify } = require("util");

const getAsync = promisify(client.get).bind(client);

const app = express();
const port = 3001;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  next();
});

app.get("/jobs", async (req, res) => {
  const jobs = await getAsync("github");

  res.send(jobs);
});

app.listen(port, () => console.log("Example App"));
