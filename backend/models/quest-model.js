const mongoose = require('mongoose');

const questSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a quest'],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Quest', questSchema);