import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => console.log(err.message));
// console.log(data);
const app = express();
app.get("/api/products", (req, res) => {
  res.send(data);
});

app.get("/api/products/slug/:slug", (req, res) => {
  const product = data.products.find((item) => {
    return item.slug === req.params.slug;
  });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "not found" });
  }
});
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((item) => {
    return item._id === req.params.id;
  });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "not found" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
