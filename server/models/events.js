const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    eventID: String,
    author: String,
    name: String,
    description: String,
    date: String,
    status: {
        type: Boolean,
        default: false
    }
});



const events = new mongoose.model("Events", eventSchema);

module.exports = events;