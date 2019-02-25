import React from "react";
import styled from "@emotion/styled";
import gql from "graphql-tag";

import { useServerNum } from "./hooks";
import Head from "../../client/components/head";
import Nav from "../../client/components/nav";

const Container = styled("div")`
  .hero {
    width: 100%;
    color: #333;
  }
  .title {
    margin: 0;
    width: 100%;
    padding-top: 80px;
    line-height: 1.15;
    font-size: 48px;
  }
  .title,
  .description {
    text-align: center;
  }
  .row {
    max-width: 880px;
    margin: 80px auto 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .card {
    padding: 18px 18px 24px;
    width: 220px;
    text-align: left;
    text-decoration: none;
    color: #434343;
    border: 1px solid #9b9b9b;
  }
  .card:hover {
    border-color: #067df7;
  }
  .card h3 {
    margin: 0;
    color: #067df7;
    font-size: 18px;
  }
  .card p {
    margin: 0;
    padding: 12px 0 0;
    font-size: 13px;
    color: #333;
  }
`;

const Home = (() => {
  const component = ({ initialNum = 0, firstName }) => {
    const { num, increment, decrement, loading } = useServerNum(initialNum);
    return (
      <Container>
        <Head title="Home" />
        <Nav />
        <div className="hero">
          <h1 className="title">Welcome to Next, {firstName}!!!</h1>
          <p className="description">
            To get started, edit <code>pages/index.js</code> and save to reload.
          </p>
          <div className="row">
            <div className="card">
              <button onClick={increment}>increment</button>
              <button onClick={decrement}>decrement</button>
              <div>{loading ? "..." : num}</div>
            </div>
          </div>
        </div>
      </Container>
    );
  };
  component.getInitialProps = ({ req: { runGql } }) => {
    return runGql({
      query: gql`
        {
          num
          self {
            firstName
          }
        }
      `
    }).then(({ data: { num, self: { firstName } } }) => {
      return { initialNum: num, firstName };
    });
  };
  return component;
})();

export default Home;
