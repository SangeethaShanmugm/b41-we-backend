import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import { productsRouter } from "./routes/product.js";
import cors from "cors";
const app = express();
const PORT = 5000;
dotenv.config();
app.use(express.json());
app.use(cors());

const MONGO_URL = process.env.MONGO_URL;

//create connection
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MongoDB is connected");
  return client;
}
export const client = await createConnection();

app.get("/", (req, res) => {
  res.send("Hello Everyone🥳🥳🥳");
});

app.use("/products", productsRouter);

app.listen(PORT, () => console.log("Server started on port", PORT));
