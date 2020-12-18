const express = require("express");
const Booking = require("../models/booking");
const router = new express.Router();

router.post("/Booking", async (req, res) => {
  const booking = new Booking(req.body);
  try {
    await booking.save();
    res.status(201).send(booking);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/Booking", async (req, res) => {
  const { userId } = req.query;
  try {
    const booking = await Booking.find({ userId });
    res.send(booking);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/Booking/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    await Booking.findByIdAndDelete(_id);
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
