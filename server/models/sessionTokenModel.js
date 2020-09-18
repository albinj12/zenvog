const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    jid: {
        type: String,
        required: true
    },
    tid: {
        type:String,
        required: true
    }
})

module.exports = mongoose.model('SessionToken', TokenSchema)