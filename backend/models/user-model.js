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
    displayName: {
        type: String,
        required: [true, 'Please enter your first name'],
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: Number,
      required: false,
    },
    photoURL: {
      type: String,
      required: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
