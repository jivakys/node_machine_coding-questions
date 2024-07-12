const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 8888,
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017",
  SECRET_KEY: process.env.SECRETKEY,
};
