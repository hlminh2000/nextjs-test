import { useState, useEffect } from "react";
import gql from "graphql-tag";
import { runQuery, runMutation } from "../../client/services.js";

export const useServerNum = initial => {
  const [num, setNum] = useState(initial);
  const [loading, setLoading] = useState(false);
  const increment = async () => {
    setLoading(true);
    runMutation({
      mutation: gql`
        mutation {
          increment
        }
      `
    })
      .then(({ data: { increment } }) => setNum(increment))
      .then(() => setLoading(false));
  };
  const decrement = async () => {
    setLoading(true);
    runMutation({
      mutation: gql`
        mutation {
          decrement
        }
      `
    })
      .then(({ data: { decrement } }) => setNum(decrement))
      .then(() => setLoading(false));
  };
  return {
    num,
    loading,
    increment,
    decrement
  };
};
