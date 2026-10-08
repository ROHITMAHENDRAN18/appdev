const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  mode: { type: String, enum: ['Remote', 'Hybrid', 'Onsite'], default: 'Remote' },
  status: { 
    type: String, 
    enum: ['Applied', 'Shortlisted', 'Interview', 'Selected', 'Completed'], 
    default: 'Applied' 
  },
  deadline: { type: String, default: '2026-12-31' },
  notes: { type: String, default: '' },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Internship', InternshipSchema);