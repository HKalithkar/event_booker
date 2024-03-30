const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/event_manager")
  .then(() => console.log("Connected to database successfully"))
  .catch(() => console.log("Unable to connect to database"));
