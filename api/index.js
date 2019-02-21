const express = require("express");
const router = express.Router();
const { ApolloServer, gql } = require("apollo-server-express");

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "THIS IS DATA FROM GRAPHQL!!!"
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app: router });

module.exports = router;
