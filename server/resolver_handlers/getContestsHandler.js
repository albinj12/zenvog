const contestModel = require('../models/contestModel')
const {AuthenticationError} = require('apollo-server');

const getContestsFunc = async function({req,res}){
    if(req.user){
        return contestModel.find()
    }else {
        res.cookie("tid", "",{maxAge:"1"});
        res.cookie("sid", "",{maxAge:"1"});
        throw new AuthenticationError('Unautherized');
    }
}

module.exports = getContestsFunc;