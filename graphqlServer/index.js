const { mergeSchemas } = require("graphql-tools");
const { ApolloServer, gql } = require("apollo-server-express");
const { print } = require("graphql/language/printer");
const {
  createExecutableUserMetadataSchema,
  personaFetcher
} = require("./schemas/persona");

const state = { num: 0 };

const linkTypeDefs = gql`
  type Query {
    num: Int
  }
  type Mutation {
    increment: Int
    decrement: Int
  }
`;

const createGraphqlServer = async () => {
  const mergedUserSchema = mergeSchemas({
    schemas: [await createExecutableUserMetadataSchema(), print(linkTypeDefs)],
    resolvers: {
      Query: {
        num: () => state.num
      },
      Mutation: {
        increment: () => ++state.num,
        decrement: () => --state.num
      }
    }
  });

  const server = new ApolloServer({
    schema: mergedUserSchema,
    introspection: true,
    playground: true
  });
  return server;
};

module.exports = createGraphqlServer;
