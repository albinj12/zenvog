const express = require('express')
const cors = require('cors')
const config = require('./config/mongo-connect')
const { ApolloServer, gql } = require('apollo-server-express');
const cookieParser = require('cookie-parser');

const typeDefs = require('./graphql/schema/schema')
const resolvers = require('./graphql/resolvers/resolver')


const app = express()

app.use(cookieParser());
var corsOptions = {
  origin: "http://localhost:8080",
  credentials: true
};
app.use(cors(corsOptions))

const schema = require('./graphql/schema/schema')

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context:({req,res}) => ({
    req,
    res
  })
});

server.applyMiddleware({ app, path: "/graphql", cors: false });
app.listen({ port: 4000 });