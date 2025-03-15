require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET_KEY;

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const User = require('./models/user');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/EduVantage')
        .then(() => {
            console.log('EduVantage MongoDB has connected!');
        })
        .catch((err) => {
            console.log('Error: ', err);
        });
}

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(session({
    secret: jwtSecret || 'secondsecretkey1234',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true }
}));

const verifyJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json('JWT Token not found');
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                return res.json('Invalid Token!');
            }
            else {
                next();
            }
        });
    }
}

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then((hash) => {
            User.create({
                name: name,
                email: email,
                password: hash
            })
                .then((user) => {
                    res.json(user);
                })
                .catch((err) => {
                    res.json(err);
                })
        })
    console.log(req.body);
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    await User.findOne({ email: email })
        .then((user) => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({ email: user.email, user }, jwtSecret, { expiresIn: '1h' });
                        res.cookie('token', token);
                        res.json('True');
                    }
                    else {
                        res.json('False');
                    }
                })
            }
            else {
                res.json('There is no user with this email');
            }
        });
});

app.get('/home', verifyJWT, async (req, res) => {
    const token = req.cookies.token;  // Get token from cookies
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findOne({ email: decoded.email });  // Decode token and use email to find user
        if (!user) {
            res.status(404).json({ message: 'User not found!' });
        } else {
            res.json({ message: 'User found!', user }); // Optionally send more user details
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to authenticate token.', error: error.message });
    }
});

// Search university by name route
app.get('/universities/search', async (req, res) => {
    const { name } = req.query;

    try {
        const university = await University.findOne({ name: { $regex: name, $options: 'i' } });
        if (university) {
            res.json(university);
        } else {
            res.status(404).json({ message: "University not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error searching university", error: err.message });
    }
});

// Get user profile route
app.get('/profile/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        // Fetch the profile based on the userId
        const profile = await Profile.findOne({ userId: userId });

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json(profile);  // Send the profile data
    } catch (err) {
        res.status(500).json({ message: "Error fetching profile", error: err.message });
    }
});




// Update user profile route
app.put('/profile/:id', async (req, res) => {
    const userId = req.params.id; // Extract user ID from params
    const {
        dob,
        phone,
        gender,
        countryOfResidence,
        gpaType,
        gpa,
        bachelorField,
        institution,
        testName,
        score,
        tuitionBudget,
        livingAllowance
    } = req.body;  // Extract profile fields from the request body

    try {
        // Check if the profile for this user already exists
        let profile = await Profile.findOne({ userId: userId });

        if (!profile) {
            // If no profile exists, create a new profile
            profile = new Profile({
                userId: userId,
                dob,
                phone,
                gender,
                countryOfResidence,
                gpaType,
                gpa,
                bachelorField,
                institution,
                testScores: { testName, score },
                budget: { tuitionBudget, livingAllowance }
            });
            await profile.save();
        } else {
            // If a profile exists, update it
            profile.dob = dob;
            profile.phone = phone;
            profile.gender = gender;
            profile.countryOfResidence = countryOfResidence;
            profile.gpaType = gpaType;
            profile.gpa = gpa;
            profile.bachelorField = bachelorField;
            profile.institution = institution;
            profile.testScores = { testName, score };
            profile.budget = { tuitionBudget, livingAllowance };

            await profile.save();  // Save the updated profile
        }

        res.json(profile);  // Send the updated or created profile back
    } catch (err) {
        res.status(500).json({ message: "Error updating profile", error: err.message });
    }
});

app.get('/chatbot', (req, res) => {

})



app.get('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.json({ message: 'You have logged out successfully' });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})