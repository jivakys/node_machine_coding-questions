const express = require("express");
const validationError = require("../errors/validationError");
const NotFoundError = require("../errors/notFoundError");

const userRouter = express.Router();

userRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return next(new validationError("User ID is required"));
  }

  const user = null;

  if (!user) {
    return next(new NotFoundError("User not found"));
  }

  res.json({ success: true, data: user });
});

module.exports = userRouter;
