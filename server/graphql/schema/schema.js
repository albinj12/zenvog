const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type User {
        id: ID!
        name: String!
        email: String!
        profilePicture: String
        createdContest: Contest
        participatedContests: Contest
    }

    type Contest {
        id: ID!
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
    },

    type RootMutation {
        signup(name: String!, email: String!, password: String!):String!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)