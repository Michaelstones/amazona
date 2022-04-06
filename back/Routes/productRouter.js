import express from "express";
import product from "../models/productModels.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await product.find();
  res.send(products);
});
productRouter.get("/slug/:slug", async (req, res) => {
  const produc = await product.findOne({ slug: req.params.slug });
  if (produc) {
    res.send(produc);
  } else {
    res.status(404).send({ message: "not found" });
  }
});
productRouter.get("/:id", async (req, res) => {
  const produc = await product.findById(req.params.id);
  if (produc) {
    res.send(produc);
  } else {
    res.status(404).send({ message: "not found" });
  }
});
export default productRouter;
