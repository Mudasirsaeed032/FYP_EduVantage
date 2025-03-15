const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
    },
    campus: {
        type: String,
    },
    program: {
        type: String,
    },
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University',
        required: true,
    },
});

module.exports = mongoose.model('Course', courseSchema);
