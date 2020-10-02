const contestModel = require('../../models/contestModel')
const userModel = require('../../models/userModel');
const contestEntryModel = require('../../models/contestEntryModel')

//import handlers
const signupFunc = require('../../resolver_handlers/signupHandler')
const createContestFunc = require('../../resolver_handlers/createContestHandler');
const loginFunc = require('../../resolver_handlers/loginHandler')
const getUserFunc = require('../../resolver_handlers/getUserHandler')
const getContestFunc = require('../../resolver_handlers/getContestHandler')
const uploadImageFunc = require('../../resolver_handlers/UploadImageHandler')
const logoutFunc = require('../../resolver_handlers/logoutHandler')
const voteFunc = require('../../resolver_handlers/voteHandler')


const resolvers = {

    User: {
        createdContests:(parent) => {
            return contestModel.find({createdBy:parent._id})
        },
        participatedContests:async (parent) => {
            let userParticipatedContestsDetails = []
            const userParticipatedContests = await userModel.findById(parent._id,'participatedContests -_id')
            for(let i=0; i<userParticipatedContests.participatedContests.length; i++){
                const contestDetails = await contestModel.findById(userParticipatedContests.participatedContests[i])
                userParticipatedContestsDetails.push(contestDetails)
            }
            return userParticipatedContestsDetails
        }
    },

    Contest: {
        createdBy:(parent) => {
            return userModel.findById(parent.createdBy)
        },
        entry:async (parent) => {
            const entries = await contestEntryModel.findOne({contestId:parent._id},'entries -_id')
            if(entries != null){
                return entries.entries
            }
            return null;
        }
    },

    ContestEntry:{
        participant:(parent) => {
            return userModel.findById(parent.participant)
        }
    },

    RootQuery:{
        login:(parent, args, context, info) => {
            return loginFunc(args,context)
        },
        user: (parent, args, context, info) => {
            return getUserFunc(context)
        },
        // getContests:(parent, args, context, info) => {
        //     return contestModel.find({completed:args.completed});
        // },
        getContest:(parent, args, context, info) => {
            return getContestFunc(args, context)
        },
        logout:(parent, args, context, info) => {
            return logoutFunc(context)
        },
        vote:(parent, args, context, info) => {
            return voteFunc(args,context)
        }
    },

    RootMutation:{
        signup:(parent,args,context,info) => {
            return signupFunc(args,context)
        },
        createContest:(parent,args,context,info) => {
            return createContestFunc(args,context)
        },
        addImage:(parent,args,contest,info) => {
            return uploadImageFunc(args,contest)
        }
    }
}

module.exports = resolvers;