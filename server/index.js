const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const config = require('./config/mongo-connect')

const app = express()

app.use('/graphql', graphqlHTTP({
    schema:null,
    graphiql: true
}))

app.listen(4000, () => {
    console.log("Server started on port 4000")
})