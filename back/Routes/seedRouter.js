import express from "express";
import Product from "../models/productModels.js";
import User from "../models/userModel.js";
import data from "../data.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Product.deleteMany({});
  const createdproducts = await Product.insertMany(data.products);
  await User.deleteMany({});
  const createdusers = await User.insertMany(data.users);
  res.send({ createdproducts, createdusers });
});

export default seedRouter;
