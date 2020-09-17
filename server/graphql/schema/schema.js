// const {makeExecutableSchema} = require('graphql-tools')

// const resolvers = require('../resolvers/resolver')

 const typeDefs = `
    type User {
        _id: ID!
        name: String!
        email: String!
        profilePicture: String
        createdContest: [Contest]
        participatedContests: [Contest]
    }

    type Contest {
        _id: ID!
        name: String!
        tagline: String
        createdBy: User!
        maxParticipants: Int!
        currentParticipants: Int!
        entry: ContestEntry
    }

    type ContestEntry {
        url: String!
        participant: User!
        likes: Int!
    }

    type RootQuery {
        login(email: String!, password: String!):String!
        user(id:ID!):User!
        getContests(completed:Boolean!):[Contest!]!
        getContest(id:ID!):Contest!
    },

    type RootMutation {
        signup(name: String!, email: String!, password: String!):String!
        createContest(name: String!, tagline: String, createdBy:ID!, contestType: String!, maxParticipants: Int!): Contest!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`;

// const schema = makeExecutableSchema({
//     typeDefs,
//     resolvers,
// });

// module.exports = schema

module.exports = typeDefs;