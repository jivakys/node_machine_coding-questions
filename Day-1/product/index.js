const express = require("express");
const { connection } = require("./db");
const { productRouter } = require("./route");
const app = express();

app.use(express.json());

app.use("/product", productRouter);

app.listen(5000, async () => {
  try {
    await connection;
    console.log("Database is Connected");
  } catch (error) {
    console.log({ Error: error.message });
  }
  console.log(`server running on port 5000`);
});
