const UserModel = require('../../models/userModel')
const contestModel = require('../../models/contestModel')
const crypt = require('../../misc/crypt');
const userModel = require('../../models/userModel');
const { find } = require('../../models/userModel');

// handle errors
const handleAuthErrors = (err) => {
    let errors = { email: '', password: '' };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'This email is already registered';
      return errors;
    }
  
    return errors;
  }


// login handler
const loginFunc = async function({email,password})
    {
        try {
        let user = await UserModel.findOne({email})
        if(user){
            const validPassword = crypt.checkPassword(user.hash, user.salt, password)
            if(validPassword){
                return "success"
                //set jwt cookies
            }else{
                throw new Error("Invalid email or password")
            }
        }else{
            throw new Error("Invalid email or password")
        }
    } catch (error) {
        throw new Error(error)
    }
}

// signup handler
const signupFunc = async function({name, email,password}){
    try{
        const {salt, hash}= crypt.createPassword(password)
        const newUser = await UserModel.create({
        name,
        email,
        salt,
        hash,
    })
        return "success"
        //TODO: set jwt as cookie
    }
    catch(err){
        const errors = handleAuthErrors(err)
        throw new Error(errors.email)
    }
}

// handler for creating contest
const createContestFunc = async function({name, tagline, createdBy, contestType, maxParticipants}){
    try {
        const newContest = await contestModel.create({
            name,
            tagline,
            createdBy,
            contestType,
            maxParticipants
        })
        return newContest
    } catch (error) {
        console.log(error)
        throw new Error("Failed to create contest")
    }
}

const resolvers = {

    Contest: {
        createdBy:(parent) => {
            return userModel.findById(parent.createdBy)
        }
    },

    RootQuery:{
        login:(parent, args, context, info) => {
            return loginFunc(args)
        }
    },

    RootMutation:{
        signup:(parent,args,context,info) => {
            return signupFunc(args)
        },
        createContest:(parent,args,context,info) => {
            return createContestFunc(args)
        }
    }
}

module.exports = resolvers;