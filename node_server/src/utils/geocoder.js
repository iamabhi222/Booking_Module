const NodeGeocoder = require("node-geocoder");

var geocoder = NodeGeocoder({
  provider: "opencage",
  apiKey: "41be93a55a664bd9bce345274e317561",
});

module.exports = geocoder;
