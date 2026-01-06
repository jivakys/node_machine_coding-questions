const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db");

app.use(express.json());

app.get("/users", async (req, res) => {
  const [users] = await db.query("SELECT * FROM users");
  res.json(users);
});

app.listen(process.env.PORT, async () => {
  try {
    await db.getConnection();
    console.log("DB Connected Successfully ✅");
  } catch (error) {
    console.error(error.message);
  }
  console.log(`Server running on port ${process.env.PORT}`);
});
