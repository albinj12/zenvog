const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const config = require('./config/mongo-connect')

const app = express()

const schema = require('./graphql/schema/schema')
const rootValue = require('./graphql/resolvers/resolver')

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))

app.listen(4000, () => {
    console.log("Server started on port 4000")
})