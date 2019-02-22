import { print } from "graphql/language/printer";
import fetch from "isomorphic-fetch";

export const runQuery = ({ query, variables }) =>
  fetch(`http://localhost:3000/api/graphql`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      query: print(query),
      variables
    })
  }).then(res => res.json());

export const runMutation = ({ mutation, variables }) =>
  fetch(`http://localhost:3000/api/graphql`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      query: print(mutation),
      variables
    })
  }).then(res => res.json());
