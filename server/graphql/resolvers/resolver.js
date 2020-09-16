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

const resolvers = {

        Uesr: {
            createdContext(parent){
                return contestModel.find({createdBy:parent.id})
            },
            participatedContests(parent){
                let participatedContestsId = userModel.find({_id:parent.id},"participatedContests -_id")
                let participatedContests = []
                participatedContestsId.forEach(element => {
                    participatedContest.push(contestModel.findById(element._id)) 
                }); 
                return participatedContests
            }
        },

        login: async({email,password}) => {
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
            
        },

        signup: async ({name,email,password}) => {
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
}

module.exports = resolvers;