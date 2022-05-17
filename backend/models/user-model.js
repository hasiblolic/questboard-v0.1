const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
