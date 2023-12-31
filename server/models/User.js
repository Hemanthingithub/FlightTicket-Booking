const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
    role: { type: String, default: "USER" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema, "users");
