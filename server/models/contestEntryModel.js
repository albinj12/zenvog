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
            likes: {
                type: Number,
                default: 0
            }
        }
    ]
})

module.exports = mongoose.model('Entry',entrySchema)