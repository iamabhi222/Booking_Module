const express = require("express");
const cors = require("cors");
const AvailRouter = require("./routes/Available");
const BookRouter = require("./routes/Booking");
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3004;

app.use(express.json());
app.use(cors());
app.use(AvailRouter);
app.use(BookRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
