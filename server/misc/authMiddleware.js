const sessionTokenModel = require('../models/sessionTokenModel')
const jwt = require('jsonwebtoken')

const isAuthenticated = async function(req, res, next){
    let tid = req.cookies.tid
    let sid = req.cookies.sid
    let user = await sessionTokenModel.findOne({tid})
    if(tid && sid){
        jwt.verify(sid, 'secure token',(err,decodedToken) => {
            if(decodedToken == user.jid){
                req.userId = user.userId
                req.user = true
            }else{
                req.user = true
            }
        })
    }
    next()
}

module.exports = isAuthenticated;