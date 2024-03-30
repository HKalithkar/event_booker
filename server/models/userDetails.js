const mongoose = require("mongoose");

const userDetailSchema = new mongoose.Schema({
    fullName: String,
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    eventsRegistered: [String]
});

const userDetails = new mongoose.model("User Details", userDetailSchema);

module.exports = userDetails;