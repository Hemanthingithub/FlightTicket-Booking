const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    username:  { type: String, required: true },
    flightNo: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("booking", bookingSchema, "bookings");
