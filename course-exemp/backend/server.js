const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const mongoURI = process.env.mongoURI; // Replace with your MongoDB URI
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB1"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema and Model
const registrationSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  department: String,
  semester: String,
  course: String,
});

const exemptionSchema= new mongoose.Schema({
  name: String,
  rollNumber: String,
  department: String,
  course1: String,
  course2: String,
  course3: String,
});

const Registration = mongoose.model('Registration', registrationSchema);
const Exemption=mongoose.model('exemptions',exemptionSchema);
// Routes
app.post('/register', async (req, res) => {
  try {
    const newRegistration = new Registration(req.body);
    const savedRegistration = await newRegistration.save();
    res.status(201).json(savedRegistration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.post('/exemption', async (req, res) => {
  try{
    const newExemption = new Exemption(req.body);
    const savedExemption = await newExemption.save();
    res.status(201).json(savedExemption);
  }
  catch(error){
    res.status(400).json({error: error.message});
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
