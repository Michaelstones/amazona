import express from "express";
import data from "./data.js";

const app = express();
app.get("/api/products", (req, res) => {
  res.send(data);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
