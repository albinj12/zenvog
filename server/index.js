const express = require('express')
const cors = require('cors')
// const {graphqlHTTP} = require('express-graphql')
const config = require('./config/mongo-connect')
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = require('./graphql/schema/schema')
const resolvers = require('./graphql/resolvers/resolver')


const app = express()

app.use(cors())

const schema = require('./graphql/schema/schema')

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });

// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: true
// }))

// app.listen(4000, () => {
//     console.log("Server started on port 4000")
// })