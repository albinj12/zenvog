const sessionTokenModel = require('../models/sessionTokenModel');
const {AuthenticationError} = require('apollo-server'); 

const logoutFunc = async function({req, res}){
    if(req.user){
        const deletedSession = await sessionTokenModel.findOneAndDelete({userId:req.userId})
        if(deletedSession != null){
            res.cookie("tid", "",{maxAge:"1"});
            res.cookie("sid", "",{maxAge:"1"});
            return "success"
        }else {
            return "success"
        }
    }else {
        res.cookie("tid", "",{maxAge:"1"});
        res.cookie("sid", "",{maxAge:"1"});
        return "success"
    }
}

module.exports = logoutFunc;