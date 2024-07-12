const express = require("express");
const { PORT, MONGODB_URL } = require("./config");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connection = mongoose.connect(MONGODB_URL);

app.get("/", (req, res) => {
  res.send("environment variables load using dotenv package.");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Database is Connected");
  } catch (error) {
    console.log(error.message);
  }
  console.log(`Server is running on port ${PORT}`);
});
