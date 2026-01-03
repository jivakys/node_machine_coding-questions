const express = require("express");
const db = require("./db");
const app = express();
require("dotenv").config();

app.use(express.json());

app.get("/users", async (req, res) => {
  const [users] = await db.query("SELECT * FROM users");
  res.json(users);
});

db.getConnection()
  .then(() => console.log("DB Connected Successfully ✅"))
  .catch((err) => console.error(err.message));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
