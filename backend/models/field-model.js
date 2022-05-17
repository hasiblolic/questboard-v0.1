const mongoose = require('mongoose');

const fieldSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    options: [{ 
        type: String
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Field', fieldSchema);
