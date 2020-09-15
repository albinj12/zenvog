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
`)