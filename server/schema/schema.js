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

const ContestType = new GraphQLObjectType({
    name:'Contest',
    fields:() => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        tagline: { type: GraphQLString },
        createdBy: {
            type: UserType,
            resolve(parent, args){
                //fetch user details of the user
            }
        },
        maxParticipants: { type: GraphQLInt },
        currentParticipants: { type: GraphQLInt },
        enrty:{
            type: new GraphQLList(ContestEntryType),
            resolve(parent, args){
                // fetch entry details
            }
        }
    })
})

const ContestEntryType = new GraphQLObjectType({
    name:'ContestEntry',
    fields:() => ({
        url: { type: GraphQLString },
        participant: {
            type: UserType,
            resolve(parent,args){
                // fetch contestant details
            }
        },
        like: { type: GraphQLInt },
    })
})
