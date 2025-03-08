const https = require("https");
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const mongoURI = process.env.mongoURI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Load SSL Certificate (Ensure `server.key` and `server.cert` exist)
const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

// Schema and Model
const registrationSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  department: String,
  semester: String,
  course: String,
  status: { type: String, default: "pending" },
});

const exemptionSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  department: String,
  course1: String,
  course2: String,
  course3: String,
  status: { type: String, default: "pending" },
});

const Registration = mongoose.model("Registration", registrationSchema);
const Exemption = mongoose.model("exemptions", exemptionSchema);

// Routes
app.post("/register", async (req, res) => {
  try {
    const newRegistration = new Registration(req.body);
    const savedRegistration = await newRegistration.save();
    res.status(201).json(savedRegistration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/exemption", async (req, res) => {
  try {
    const newExemption = new Exemption(req.body);
    const savedExemption = await newExemption.save();
    res.status(201).json(savedExemption);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch registration details
app.get("/register", async (req, res) => {
  try {
    const pendingRegistrations = await Registration.find({ status: "pending" });
    res.status(200).json(pendingRegistrations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch exemption details
app.get("/exemption", async (req, res) => {
  try {
    const pendingExemptions = await Exemption.find({ status: "pending" });
    res.status(200).json(pendingExemptions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update status for registrations
app.patch("/register/:id", async (req, res) => {
  try {
    console.log("Received PATCH request for ID:", req.params.id);
    console.log("New Status:", req.body.status);
    const { status } = req.body;
    const updatedRegistration = await Registration.findOneAndUpdate(
      { _id: req.params.id },
      { status },
      { new: true }
    );
    console.log("Updated Record:", updatedRegistration);
    res.status(200).json(updatedRegistration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update status for exemptions
app.patch("/exemption/:id", async (req, res) => {
  try {
    console.log("Received PATCH request for ID:", req.params.id);
    console.log("New Status:", req.body.status);
    const { status } = req.body;
    const updatedRegistration = await Exemption.findOneAndUpdate(
      { _id: req.params.id },
      { status },
      { new: true }
    );
    console.log("Updated Record:", updatedRegistration);
    res.status(200).json(updatedRegistration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start Secure HTTPS Server
https.createServer(options, app).listen(PORT, "0.0.0.0", () => {
  console.log(`server running`);
});
