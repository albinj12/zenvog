// signup handler
const UserModel = require('../models/userModel')
const crypt = require('../misc/crypt')
const handleAuthErrors = require('./handleError')

const signupFunc = async function({name, email,password}){
    try{
        
        const {salt, hash}= crypt.createPassword(password)
        const newUser = await UserModel.create({
        name,
        email,
        salt,
        hash,
    })
        console.log(newUser)
        return "success"
        //TODO: set jwt as cookie
    }
    catch(err){
        const errors = handleAuthErrors(err)
        throw new Error(errors.email)
    }
}

module.exports = signupFunc;