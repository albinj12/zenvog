// signup handler


const UserModel = require('../models/userModel')
const crypt = require('../misc/crypt')
const handleAuthErrors = require('./handleError')
const createSessionToken = require('../misc/createSessionToken')

const signupFunc = async function({name, email,password},{res}){
    try{
        const {salt, hash}= crypt.createPassword(password)
        const newUser = await UserModel.create({
        name,
        email,
        salt,
        hash,
    })
        const jid = require("crypto").randomBytes(16).toString('hex')
        const tid = require("crypto").randomBytes(24).toString('hex')
        const jwt = createSessionToken.makeToken(jid)
        res.cookie("tid", tid);
        res.cookie("sid", jwt);
        return "success"
        //TODO: set jwt as cookie
    }
    catch(err){
        const errors = handleAuthErrors(err)
        throw new Error(errors.email)
    }
}

module.exports = signupFunc;