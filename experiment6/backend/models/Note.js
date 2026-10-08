const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    color: { type: String, default: '#fef68a' } // Default sticky note yellow
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);

