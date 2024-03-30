const express = require("express");
const router = express.Router();
const userDetails = require("../models/userDetails");
const events = require("../models/events");

module.exports = router;

router.post("/register", async (req, res) => {
  try {
    const data = await userDetails.create(req.body);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).json({ error: true });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userData = await userDetails.find({ email, password });
    if (userData.length !== 0) {
      res.status(200).send(...userData);
    } else {
      res.status(404).send({ notFound: true });
    }
  } catch (error) {
    res.status(404).json({ error: true });
  }
});

router.post("/newEvent", async (req, res) => {
  try {
    const data = await events.create(req.body);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).json({ error: true });
  }
});

router.patch("/registerEvent/:username/:eventID", async (req, res) => {
  try {
    const username = req.params.username;
    const eventID = req.params.eventID;
    const data = await userDetails.findOneAndUpdate(
      { username },
      { $push: { eventsRegistered: eventID } }
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(404).json({ error: true });
  }
});
