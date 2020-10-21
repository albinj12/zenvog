const contestModel = require('../models/contestModel')
var ObjectID = require('mongodb').ObjectID;
const {AuthenticationError} = require('apollo-server');
const userModel = require('../models/userModel'); 

const getContestFunc = async function({id},{req,res}){
    if(req.user == true){
        try {
            var contest = await contestModel.findOne(new ObjectID(id)).lean()
            if(contest.status == "Finished" || contest.status == "Upcoming"){
                contest.participateOption = false
            }else {
                if(contest.createdBy.toString() == req.userId.toString()){
                    contest.participateOption = false
                }else {
                    const userParticipatedContests = await userModel.findById(req.userId,'participatedContests -_id')
                    if(userParticipatedContests.participatedContests.length != 0){
                        for (let i=0; i < userParticipatedContests.participatedContests.length; i++){
                            if(userParticipatedContests.participatedContests[i].toString() === contest._id.toString()){
                                contest.participateOption = false
                                break;
                            }
                            contest.participateOption = true
                        }
                    }else {
                        contest.participateOption = true
                    }
                }
            }

            if(contest.createdBy.toString() == req.userId.toString() && contest.status == "Upcoming"){
                contest.showEditOption = true
            } else {
                contest.showEditOption = false
            }
            return contest
        } catch (error) {
            console.log(error)
        }
    }else {
        res.cookie("tid", "",{maxAge:"1"});
        res.cookie("sid", "",{maxAge:"1"});
        throw new AuthenticationError('Unautherized');
    }
}

module.exports = getContestFunc;