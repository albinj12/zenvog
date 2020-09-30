const mongoose = require('mongoose')

const entryVotesSchema = new mongoose.Schema({
    entryId: {
        type: mongoose.Schema.Types.ObjectId
    },
    votedby:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

module.exports = mongoose.model('EntryVote', entryVotesSchema)
