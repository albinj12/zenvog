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
        entry: [ContestEntry]
        rules: [String]
        deadline: Date!
        startDate: Date!
        status: String!
        showEditOption: Boolean!
        participateOption: Boolean!
    }

    type ContestEntry {
        _id: ID!
        url: String!
        participant: User!
        votes: Int!
    }

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type RootQuery {
        login(email: String!, password: String!):String!
        user:User!
        getContests:[Contest!]!
        getContest(id:ID!):Contest!
        logout:String!
    },

    type RootMutation {
        signup(name: String!, email: String!, password: String!):String!
        createContest(name: String!, tagline: String, deadline: Date, description: String!, rules: [String], contestType: String!, maxParticipants: Int!, startDate: Date): Contest!
        addImage(file: Upload!, contestId:ID!): ContestEntry!
        vote(contestId: ID!, entryId: ID!):Int!
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