const express = require("express");
const userRouter = require("./routes/userRouter");
const NotFoundError = require("./errors/notFoundError");
const errorHandler = require("./middleware/errorHandler");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use("/users", userRouter);

// Handle undefined routes
app.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

// Global error handler (ALWAYS LAST)
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
