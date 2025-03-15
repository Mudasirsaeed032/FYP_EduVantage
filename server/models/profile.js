const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true
    },
    dob: {
        type: Date
    },
    phone: {
        type: String
    },
    gender: {
        type: String
    },
    countryOfResidence: {
        type: String
    },
    gpaType: {
        type: String
    },
    gpa: {
        type: Number
    },
    bachelorField: {
        type: String
    },
    institution: {
        type: String
    },
    testScores: {
        testName: { type: String },
        score: { type: Number }
    },
    budget: {
        tuitionBudget: { type: Number },
        livingAllowance: { type: Number }
    }
});

// Create the Profile model
const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
