const contestModel = require('../../models/contestModel')
const userModel = require('../../models/userModel');

//import handlers
const signupFunc = require('../../resolver_handlers/signupHandler')
const createContestFunc = require('../../resolver_handlers/createContestHandler');
const loginFunc = require('../../resolver_handlers/loginHandler')
const getUserFunc = require('../../resolver_handlers/getUserHandler')


const resolvers = {

    User: {
        createdContests:(parent) => {
            return contestModel.find({createdBy:parent._id})
        }
    },

    Contest: {
        createdBy:(parent) => {
            return userModel.findById(parent.createdBy)
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
        // getContest:(parent, args, context, info) => {
        //     return contestModel.findById(args.id)
        // }
    },

    RootMutation:{
        signup:(parent,args,context,info) => {
            return signupFunc(args,context)
        },
        createContest:(parent,args,context,info) => {
            return createContestFunc(args,context)
        }
    }
}

module.exports = resolvers;