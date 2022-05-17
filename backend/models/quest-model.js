const mongoose = require('mongoose');

const questSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
    }, 
    description: {
        type: String,
        required: false,
    },
    due: {
        type: Date,
        required: [true, 'Please select a due date'],
    },
    completion: {
      type: Boolean,
      required: [true, 'Is the quest completed?'],
      default: false,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Quest', questSchema);