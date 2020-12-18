const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/b2-booking", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
