const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdContests:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Contest'
        }
    ],
    participatedContests:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Contest'
        }
    ]
})

module.exports = mongoose.model('User',userSchema);