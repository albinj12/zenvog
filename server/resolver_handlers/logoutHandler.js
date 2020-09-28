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
            return "failed to logout"
        }
    }else {
        res.cookie("tid", "",{maxAge:"1"});
        res.cookie("sid", "",{maxAge:"1"});
        throw new AuthenticationError('Unautherized');
    }
}

module.exports = logoutFunc;