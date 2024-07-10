const express = require("express");
const { productModel } = require("./productSchma");
const productRouter = express.Router();

productRouter.get("/products", async (req, res) => {
  try {
    const user = await productModel.find();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
});

productRouter.get("product/:id", async (req, res) => {
  let productId = req.params.id;
  try {
    let product = await productModel.findById(productId);
    res.status(200).send({ message: "Product Data Fetched", product });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

productRouter.post("/newProduct", async (req, res) => {
  const payload = req.body;
  try {
    const newUser = new productModel(payload);
    await newUser.save();
    res.status(200).send({ message: "New User Added", newUser });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

productRouter.put("/update/:id", async (req, res) => {
  let productId = req.params.id;
  let payload = req.body;
  try {
    let Product = await productModel.findByIdAndUpdate(productId, payload);
    res.status(200).send({ message: "Product data updated", Product });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

productRouter.delete("/delete/:id", async (req, res) => {
  let productId = req.params.id;

  try {
    let product = await productModel.findByIdAndDelete(productId);
    res.status(200).send({ message: "Product data deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = { productRouter };
