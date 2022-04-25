const mongoose = require('mongoose');

const questSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    text: {
        type: String,
        required: [true, 'Please add a quest'],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Quest', questSchema);