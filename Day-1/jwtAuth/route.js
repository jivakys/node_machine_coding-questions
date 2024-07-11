const express = require("express");
const { userModel } = require("./userSchema");
const { authenticate } = require("./middleware");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  let { name, email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).send({ error: "User is already registered" });
    }

    bcrypt.hash(password, 8, async function (err, hash) {
      if (err) {
        // console.error("Error hashing password:", err);
        return res.status(500).send({ error: err.message });
      }

      let newUser = new userModel({
        name,
        email,
        password: hash,
      });
      await newUser.save();
      res
        .status(200)
        .send({ message: "User registered successfully", newUser });
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).send({ error: "User not found", OK: false });
    } else {
      bcrypt.compare(password, user.password, async function (err, result) {
        if (result) {
          var token = jwt.sign({ userID: user._id }, process.env.SECRET_KEY);
          res.status(200).send({
            message: "User is Logged In",
            token,
            user,
            OK: true,
          });
        } else {
          res.status(401).send({
            error: "Incorrect Credentials",
          });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
    // console.log(error);
  }
});

taskRouter.get("/allUser", authenticate, async (req, res) => {
  try {
    const users = await userModel.find({ userId: req.body.userId });
    res.send(users);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

module.exports = { userRouter };
