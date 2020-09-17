const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true]
    },
    salt: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    createdContests:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contest'
        }
    ],
    participatedContests:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contest'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('User',userSchema);