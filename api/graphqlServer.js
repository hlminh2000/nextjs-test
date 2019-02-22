const { ApolloServer, gql } = require("apollo-server-express");

const state = {
  num: 1
};

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    num: Int
  }
  type Mutation {
    increment: Int
    decrement: Int
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    num: () => state.num
  },
  Mutation: {
    increment: () => ++state.num,
    decrement: () => --state.num
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

module.exports = server;
