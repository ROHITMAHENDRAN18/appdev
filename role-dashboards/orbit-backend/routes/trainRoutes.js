const express = require('express');
const router = express.Router();
const Training = require('../models/Training');

// Get All Trainings
router.get('/', async (req, res) => {
  try {
    const trainings = await Training.find();
    res.json(trainings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create Training Module
router.post('/', async (req, res) => {
  try {
    const newModule = new Training(req.body);
    const savedModule = await newModule.save();
    res.status(201).json(savedModule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;