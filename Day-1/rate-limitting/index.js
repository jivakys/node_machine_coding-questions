const express = require("express");
const apiLimiter = require("./middleware");

const app = express();
app.use(express.json());

app.get("/api/data", apiLimiter, (req, res) => {
  res.json({
    success: true,
    message: "Data fetched successfully",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
