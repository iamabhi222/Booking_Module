const express = require("express");
const Available = require("../models/available");
const router = new express.Router();
const geocoder = require("../utils/geocoder");

router.post("/Available", async (req, res) => {
  const available = new Available(req.body);
  try {
    await available.save();
    res.status(201).send(available);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/Available", async (req, res) => {
  match = {};
  if (req.query.address_like) {
    const loc = await geocoder.geocode(req.query.address_like);
    if (loc.length === 0) {
      return res.send({ error: "Please provide a valid address" });
    }
    // console.log(loc);
    // console.log(loc[0].latitude);
    // console.log(loc[0].longitude);
    match.location = {
      $geoWithin: {
        $centerSphere: [[loc[0].longitude, loc[0].latitude], 30 / 6378.1],
      },
    };
  }

  if (req.query.rooms_gte) {
    match.rooms = { $gte: req.query.rooms_gte };
  }
  try {
    const available = await Available.find(match);
    res.send(available);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/Available/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const available = await Available.findById(_id);
    if (!available) {
      return res.status(400).send();
    }
    res.send(available);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/Available/:bookingId", async (req, res) => {
  const _id = req.params.bookingId;
  const available = await Available.findById(_id);
  try {
    available.rooms = req.body.rooms;
    await available.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
