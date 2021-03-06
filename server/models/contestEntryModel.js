const mongoose = require('mongoose')

const entrySchema = mongoose.Schema({
    contestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contest'
    },
    entries: [
        {
            url: {
                type: String,
                required: true
            },
            participant: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            votes: {
                type: Number,
                default: 0
            },
            entryAt:{
                type: Date,
                default: Date.now
            },
            votesBy: {
                    type: [mongoose.Schema.Types.ObjectId],
                    ref: 'User'
            }
        }
    ]
})

module.exports = mongoose.model('Entry',entrySchema)