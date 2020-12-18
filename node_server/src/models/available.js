const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const PointSchema = new mongoose.Schema({
  type: { type: String, default: "Point" },
  coordinates: { type: [Number], index: "2dsphere" },
});

const AvailSchema = new mongoose.Schema({
  name: String,
  address: String,
  rooms: Number,
  price: Number,
  from: String,
  to: String,
  url: String,
  location: PointSchema,
});

AvailSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
  };
  next();
});

const Available = mongoose.model("Available", AvailSchema);

module.exports = Available;
