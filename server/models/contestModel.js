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
        enum : ['Public','Private'],
    },
    maxParticipants: {
        type: Number,
        required: true
    },
    price:{
        type:Number,
        default: 0
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    deadline: {
        type:Date,
        required: true
    },
    completed:{
        type:Boolean,
        default: false
    },
    currentParticipants: {
        type: Number,
        default: 0
    },
    description:{
        type: String,
    },
    rules: [
        {
            type: String,
        }
    ],
})

module.exports = mongoose.model('Contest',contestSchema);