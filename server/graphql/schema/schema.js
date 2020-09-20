// const {makeExecutableSchema} = require('graphql-tools')

// const resolvers = require('../resolvers/resolver')

const Date = require('./scalarDate');

 const typeDefs = `
    scalar Date
    type User {
        _id: ID!
        name: String!
        email: String!
        profilePicture: String
        createdContests: [Contest]
        participatedContests: [Contest]
    }

    type Contest {
        _id: ID!
        name: String!
        tagline: String
        description: String!
        createdBy: User!
        maxParticipants: Int!
        currentParticipants: Int!
        entry: ContestEntry
        rules: [String]
        deadline: Date
    }

    type ContestEntry {
        url: String!
        participant: User!
        likes: Int!
    }

    type RootQuery {
        login(email: String!, password: String!):String!
        user:User!
        getContests(completed:Boolean!):[Contest!]!
        getContest(id:ID!):Contest!
    },

    type RootMutation {
        signup(name: String!, email: String!, password: String!):String!
        createContest(name: String!, tagline: String, deadline: Date, description: String!, rules: [String], contestType: String!, maxParticipants: Int!): Contest!
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