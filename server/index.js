const express = require('express')
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql')
const config = require('./config/mongo-connect')

const app = express()

const schema = require('./graphql/schema/schema')

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log("Server started on port 4000")
})