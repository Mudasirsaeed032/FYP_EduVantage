const mongoose = require('mongoose');
const University = require('../models/universities'); // Assuming the University model is in the models directory
const Course = require('../models/course'); // Assuming the Course model is in the models directory
const courseSeeds = require('./courseSeeds'); // Assuming the course seeds are in the seeds directory

// Sample university data
const universities = [
    {
        "name": "Vanderbilt University",
        "location": "Nashville, United States",
        "description": "Founded in 1873 with a $1 million gift from “Commodore” Cornelius Vanderbilt to establish an institution that would “contribute to strengthening the ties that should exist between all sections of our common country,” Vanderbilt today is a globally renowned research university.",
        "ranking": "#66",
        "programs": [
            "Education & Training",
            "Social Sciences",
            "Business & Management",
            "Medicine & Health",
            "Engineering & Technology",
            "Humanities",
            "Natural Sciences & Mathematics",
            "Computer Science & IT",
            "Environmental Studies & Earth Sciences",
            "Journalism & Media",
            "Law"
        ]
    }
];

// Connect to MongoDB
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/EduVantage', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
        socketTimeoutMS: 45000 // Increase socket timeout to 45 seconds
    })
        .then(() => {
            console.log('EduVantage MongoDB has connected!');
        })
        .catch((err) => {
            console.log('Error: ', err);
        });
}

// Function to insert data in chunks
const insertInChunks = async (model, data, chunkSize = 100) => {
    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        try {
            await model.insertMany(chunk);
        } catch (err) {
            console.error(`Error inserting chunk at index ${i}:`, err);
        }
    }
};

// Seed the database with university and course data
const seedDB = async () => {
    try {
        await main(); // Ensure the database is connected before seeding

        // Insert new university data
        const insertedUniversities = await University.insertMany(universities);
        console.log("University data has been inserted successfully.");

        // Iterate over each inserted university
        for (const university of insertedUniversities) {
            // Add university reference to each course
            const coursesWithUniversity = courseSeeds.map(course => ({
                ...course,
                university: university._id
            }));

            // Insert new course data in chunks
            const insertedCourses = await Course.insertMany(coursesWithUniversity);
            console.log(`Course data for ${university.name} has been inserted successfully.`);

            // Update university with the inserted course IDs
            const courseIds = insertedCourses.map(course => course._id);
            await University.findByIdAndUpdate(university._id, { courses: courseIds });
        }
    } catch (err) {
        console.error("Error seeding database:", err);
    } finally {
        mongoose.connection.close();
    }
};

// Run the seed function
seedDB();