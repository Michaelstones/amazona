import express from "express";
// import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./Routes/seedRouter.js";
import productRouter from "./Routes/productRouter.js";
import userRouter from "./Routes/userRouter.js";

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => console.log(err.message));
// console.log(data);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
