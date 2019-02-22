const express = require("express");
const router = express.Router();
const server = require("./graphqlServer");

server.applyMiddleware({ app: router });

module.exports = router;
