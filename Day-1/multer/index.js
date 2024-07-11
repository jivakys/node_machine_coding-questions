const express = require("express");
const app = express();

const upload = require("./upload");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded successfully!" });
});

const port = 3434;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
