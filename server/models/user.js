const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    chats: [
        {
            role: String,
            content: String,
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;