const UserModel = require('../../models/userModel')

const resolvers = {
        login: () => {
            return "success"
        },

        signup: ({name,email,password}) => {
            console.log(name,email,password)
            return "success"
        }
}

module.exports = resolvers;