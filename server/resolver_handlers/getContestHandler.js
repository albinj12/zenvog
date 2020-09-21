const contestModel = require('../models/contestModel')
var ObjectID = require('mongodb').ObjectID;
const {AuthenticationError} = require('apollo-server'); 

const getContestFunc = async function({id},{req}){
    if(req.user == true){
        try {
            var contest = await contestModel.findOne(new ObjectID(id)).lean()
            if(contest.createdBy == req.userId){
                contest.showEditOption = true
                console.log("true")
            } else {
                contest.showEditOption = false
                console.log("false")
            }
            let today = new Date()
            if(today.getFullYear() == contest.startDate.getFullYear()){
                if((today.getMonth() < contest.startDate.getMonth()) || (today.getMonth() == contest.startDate.getMonth() && today.getDate() < contest.startDate.getDate())){
                    contest.status = "upcoming"
                }else if((today.getMonth() > contest.deadline.getMonth()) || (today.getMonth() == contest.deadline.getMonth() && today.getDate() > contest.deadline.getDate())){
                    contest.status = "completed"
                }else {
                    contest.status = "active"
                }
            }else if(today.getFullYear() < contest.startDate.getFullYear()){
                contest.status = "upcoming"
            }else{
                if(today.getFullYear > contest.deadline.getFullYear()){
                    contest.status = "completed"
                }else if(today.getFullYear = contest.deadline.getFullYear()){
                    if((today.getMonth() < contest.deadline.getMonth()) || (today.getMonth() == contest.deadline.getMonth() && today.getDate() < contest.deadline.getDate())){
                        contest.status = "active"
                    }else {
                        contest.status = "completed"
                    }
                }
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