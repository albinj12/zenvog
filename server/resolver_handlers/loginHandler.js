// login handler

const UserModel = require('../models/userModel');
const crypt = require('../misc/crypt');

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

module.exports = loginFunc;