const express = require("express");
const app = express();
require("./db/conn");
const userDetails = require("./models/userDetails");
const cors = require("cors");
const events = require("./models/events");
app.use(cors());
app.use(express.json());
const port = 3000;

app.use("/api/auth", require("./routes/auth"));

app.get("/users", async (req, res) => {
  try {
    const data = await userDetails.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send("Error");
  }
});

app.get("/events", async (req, res) => {
  try {
    const data = await events.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send("Error");
  }
});

app.get("/users/email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const data = await userDetails.find({ email });
    if (data.length === 0) {
      res.json({ found: false });
    } else {
      res.json({ found: true });
    }
  } catch (error) {
    res.status(404).send("Error");
  }
});

app.get("/users/username/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const data = await userDetails.find({ username });
    if (data.length === 0) {
      res.json({ found: false });
    } else {
      res.json({ found: true });
    }
  } catch (error) {
    res.status(404).send("Error");
  }
});

app.get("/userDetails/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const data = await userDetails.find({ username });
    res.status(200).send(...data);
  } catch (error) {
    res.status(404).send("Error");
  }
});

app.get("/eventRegistered/:username/:eventID", async (req, res) => {
  try {
    const username = req.params.username;
    const eventID = req.params.eventID;
    let data = await userDetails.find({ username });
    if (data[0].eventsRegistered.includes(eventID)) {
      res.json({ registered: true });
    } else {
      res.json({ registered: false });
    }
  } catch (error) {
    res.status(404).send("Error");
  }
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
