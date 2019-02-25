const {
  makeRemoteExecutableSchema,
  introspectSchema
} = require("graphql-tools");
const { HttpLink } = require("apollo-link-http");
const fetch = require("isomorphic-fetch");
const config = require("../../config");

const { PERSONA_API, EGO_JWT_SECRET } = config;

const createFetcher = ({ egoSecret }) => (_, rest) => {
  return fetch(`${PERSONA_API}/graphql`, {
    method: "POST",
    ...rest,
    headers: {
      ...(rest.headers || {}),
      Authorization: `Bearer ${egoSecret}`,
      "Content-Type": "application/json"
    }
  });
};

const personaFetcher = createFetcher({ egoSecret: EGO_JWT_SECRET });

module.exports = {
  personaFetcher: personaFetcher,
  createExecutableUserMetadataSchema: async () => {
    const link = new HttpLink({
      uri: `${PERSONA_API}/graphql`,
      fetch: personaFetcher
    });
    const personaSchema = await introspectSchema(link);
    return makeRemoteExecutableSchema({
      schema: personaSchema,
      link
    });
  }
};
