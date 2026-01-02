const express = require("express");
const db = require("./db");
const app = express();
require("dotenv").config();

app.use(express.json());

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1");
    res.json({ message: "Database connected ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
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
