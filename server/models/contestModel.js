const mongoose = require('mongoose');
const { schema } = require('./userModel');

const contestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tagline: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    contestType: {
        type: String,
        enum : ['public','private'],
    },
    maxParticipants: {
        type: Number,
        required: true
    },
    currentParticipants: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Contest',contestSchema);