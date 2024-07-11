const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./route");
const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.listen(4000, async () => {
  try {
    await connection;
    console.log("Database is Connected");
  } catch (error) {
    console.log({ Error: error.message });
  }
  console.log(`server running on port 4000`);
});
