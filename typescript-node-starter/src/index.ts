import express from "express";

const app = express();

app.get("/", (req: express.Request, res: express.Response) => {});

app.listen(3001, () => {
  console.log("Server Started At PORT 3001");
});
