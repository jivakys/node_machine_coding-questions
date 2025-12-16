const express = require("express");
const rateLimitter = require("express-rate-limit");

const app = express();
app.use(express.json());

const apiLimiter = rateLimitter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 1 hour",
  },
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
});

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
