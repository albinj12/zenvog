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
        deadline: Date!
        startDate: Date!
        status: String!
        showEditOption: Boolean!
    }

    type ContestEntry {
        url: String!
        participant: User!
        votes: Int!
    }

    type RootQuery {
        login(email: String!, password: String!):String!
        user:User!
        getContests(completed:Boolean!):[Contest!]!
        getContest(id:ID!):Contest!
    },

    type RootMutation {
        signup(name: String!, email: String!, password: String!):String!
        createContest(name: String!, tagline: String, deadline: Date, description: String!, rules: [String], contestType: String!, maxParticipants: Int!, startDate: Date): Contest!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`;

//input ContestDetails {
    //     name: String!
    //     tagline: String
    //     deadline: Date!
    //     description: String!
    //     rules: [String]
    //     contestType: String!
    //     maxParticipants: Int!
    // }

module.exports = typeDefs;