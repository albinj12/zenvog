const contestModel = require('../../models/contestModel')
const userModel = require('../../models/userModel');

//import handlers
const signupFunc = require('../../resolver_handlers/signupHandler')
const createContestFunc = require('../../resolver_handlers/createContestHandler');
const loginFunc = require('../../resolver_handlers/loginHandler')


const resolvers = {

    User: {
        createdContest:(parent) => {
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
            return loginFunc(args)
        },
        // user: (parent, args, context, info) => {
        //     return userModel.findById(args.id)
        // },
        // getContests:(parent, args, context, info) => {
        //     return contestModel.find({completed:args.completed});
        // },
        // getContest:(parent, args, context, info) => {
        //     return contestModel.findById(args.id)
        // }
    },

    RootMutation:{
        signup:(parent,args,context,info) => {
            console.log(args)
            return signupFunc(args)
        },
        createContest:(parent,args,context,info) => {
            return createContestFunc(args)
        }
    }
}

module.exports = resolvers;