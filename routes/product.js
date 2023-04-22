import express from "express";
import { client } from "../index.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const newProduct = req.body;
  const result = await client
    .db("b41-product")
    .collection("products")
    .insertMany(newProduct);
  res.send(result);
});

router.get("/", async (req, res) => {
  const result = await client
    .db("b41-product")
    .collection("products")
    .find()
    .toArray();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await client
    .db("b41-product")
    .collection("products")
    .findOne({ id: id });
  result
    ? res.send(result)
    : res.status(404).send({ message: "No products Found" });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await client
    .db("b41-product")
    .collection("products")
    .deleteOne({ id: id });
  result
    ? res.send(result)
    : res.status(404).send({ message: "No products Found" });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProducts = req.body;
  const result = await client
    .db("b41-product")
    .collection("products")
    .updateOne({ id: id }, { $set: updatedProducts });
  res.send(result);
});

export const productsRouter = router;
