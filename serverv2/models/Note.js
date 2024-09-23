const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String },
});

module.exports = mongoose.model('Note', noteSchema);
