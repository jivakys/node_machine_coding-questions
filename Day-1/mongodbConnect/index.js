const express = require("express");
const { connection } = require("./db");
const { userModel } = require("./userSchema");
const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const user = await userModel.find();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
});

app.post("/newUser", async (req, res) => {
  const payload = req.body;
  try {
    const newUser = new userModel(payload);
    await newUser.save();
    res.status(200).send({ message: "New User Added", newUser });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(5000, async () => {
  try {
    await connection;
    console.log("Database is Connected");
  } catch (error) {
    console.log({ Error: error.message });
  }
  console.log(`server running on port 5000`);
});
