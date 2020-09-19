// getUserHandler

const {AuthenticationError} = require('apollo-server'); 

// import db models
const userModel = require('../models/userModel');

const getUserFunc = async({req, res}) => {
    if(req.user == true){
        return userModel.findById(req.userId)
    }else{
        res.cookie("tid", "",{maxAge:"1"});
        res.cookie("sid", "",{maxAge:"1"});
        throw new AuthenticationError('Unautherized');
    }
}

module.exports = getUserFunc;