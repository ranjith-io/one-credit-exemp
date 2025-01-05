const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Schemas and Models
const registrationSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  department: String,
});

const oneCreditSchema = new mongoose.Schema({
  title: String,
  courseCode: String,
  rollNumber: String,
});

const Registration = mongoose.model('Registration', registrationSchema);
const OneCredit = mongoose.model('OneCredit', oneCreditSchema);

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { name, rollNumber, department } = req.body;
    const newRegistration = new Registration({ name, rollNumber, department });
    await newRegistration.save();
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

app.post('/api/one-credit', async (req, res) => {
  try {
    const { title, courseCode, rollNumber } = req.body;
    const newOneCredit = new OneCredit({ title, courseCode, rollNumber });
    await newOneCredit.save();
    res.status(200).json({ message: 'One Credit details saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving One Credit details' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
