const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  userId: String,
  rooms: Number,
  from: String,
  to: String,
  bookingId: String,
});

const Booking = mongoose.model("Booking", BookSchema);

module.exports = Booking;
