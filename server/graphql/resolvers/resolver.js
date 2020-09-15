const UserModel = require('../../models/userModel')
const crypt = require('../../misc/crypt')

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
        login: () => {
            return "success"
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