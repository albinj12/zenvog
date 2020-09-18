const jwt = require('jsonwebtoken')

exports.makeToken = function(jid){
    return jwt.sign({jid}, 'secure token');
}