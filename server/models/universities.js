const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    ranking: {
        type: String,
    },
    programs: [
        {
            type: String,
        },
    ],
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course', // Reference to the Course model
        },
    ],
});

module.exports = mongoose.model('University', universitySchema);