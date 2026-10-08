const mongoose = require('mongoose');

const TrainingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  instructor: { type: String, required: true },
  progress: { type: Number, default: 0 },
  status: { type: String, default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Training', TrainingSchema);
