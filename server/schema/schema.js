const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name:'User',
    fields:() => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email:{ type: GraphQLString },
        profilePicture: {type: GraphQLString},
        createdContest:{
            type: ContestType,
            resolve(parent, args){
                //fetch all contests created by the user
            }
        },
        participatedContests:{
            type: ContestType,
            resolve(parent, args){
                //fetch all contests user has participated in 
            }
        }
    })
})
