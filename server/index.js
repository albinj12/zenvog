const express = require('express')
const cors = require('cors')
const config = require('./config/mongo-connect')
const { ApolloServer, gql } = require('apollo-server-express');
const cookieParser = require('cookie-parser');
const cron = require('node-cron')
require('dotenv').config();

const isAuthenticated = require('./misc/authMiddleware')

const typeDefs = require('./graphql/schema/schema')
const resolvers = require('./graphql/resolvers/resolver')

const setContestStatus =  require('./misc/setStatus-cron')


const app = express()

cron.schedule("05 0 * * *", setContestStatus);

app.use(cookieParser());
var corsOptions = {
  origin: "http://localhost:8080",
  credentials: true
};
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(isAuthenticated)

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context:({req,res}) => ({
    req,
    res
  })
});

server.applyMiddleware({ app, path: "/graphql", cors: false });
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
);