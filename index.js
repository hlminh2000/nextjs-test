const express = require("express");
const next = require("next");
const { graphql, print } = require("graphql");
const createGraphqlServer = require("./graphqlServer");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev
});
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();

  const apolloServer = await createGraphqlServer();

  server.use("*", (req, res, next) => {
    req.apolloServer = apolloServer;
    req.runGql = ({ query, variables }) =>
      graphql(apolloServer.schema, print(query), null, null, variables);
    next();
  });

  apolloServer.applyMiddleware({ app: server, path: "/api/graphql" });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
