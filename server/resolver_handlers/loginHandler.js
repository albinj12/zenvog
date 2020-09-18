// login handler

const UserModel = require('../models/userModel');
const crypt = require('../misc/crypt');
const createSessionToken = require('../misc/createSessionToken')
const sessionTokenModel = require('../models/sessionTokenModel')

const loginFunc = async function({email,password},{res})
    {
        try {
        let user = await UserModel.findOne({email})
        if(user){
            const validPassword = crypt.checkPassword(user.hash, user.salt, password)
            if(validPassword){
                const jid = require("crypto").randomBytes(16).toString('hex')
                const tid = require("crypto").randomBytes(24).toString('hex')
                const jwt = createSessionToken.makeToken(jid)
                res.cookie("tid", tid);
                res.cookie("sid", jwt);
                const newSessionTokenModel = await sessionTokenModel.create({
                    userId: user._id,
                    jid,
                    tid
                })
                return "success"
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

module.exports = loginFunc;