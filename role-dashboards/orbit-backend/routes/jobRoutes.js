const express = require('express');
const router = express.Router();
const Internship = require('../models/Internship');

// Get All Internships
router.get('/', async (req, res) => {
  try {
    const jobs = await Internship.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post New Internship Listing
router.post('/', async (req, res) => {
  try {
    const newJob = new Internship(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;