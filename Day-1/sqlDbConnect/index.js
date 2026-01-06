const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db");

app.use(express.json());

app.get("/users", async (req, res) => {
  const [users] = await db.query("SELECT * FROM users");
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    res.status(201).json({
      message: "User created successfully",
      userId: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const [result] = await db.query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
