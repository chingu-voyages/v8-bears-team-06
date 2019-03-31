import React, { useState, useContext } from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";

import Layout from "../components/layouts/Layout";
import { AuthContext } from "../context";

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  return (
    <ApolloConsumer>
      {client => (
        <Layout>
          <form className="form-signin mt-5">
            <h1 className="mb-3">Sign In</h1>
            <input
              type="email"
              className="form-control mb-3"
              id="email"
              placeholder="Email"
              value={email}
              onChange={event => {
                setEmail(event.target.value);
              }}
              autoFocus
              required
            />
            <input
              type="password"
              className="form-control mb-3"
              id="password"
              placeholder="Password"
              value={password}
              onChange={event => {
                setPassword(event.target.value);
              }}
              required
            />
            <button
              type="submit"
              className="btn btn-primary float-left"
              onClick={async event => {
                event.preventDefault();
                const { data } = await client.query({
                  query: LOGIN,
                  variables: { email, password }
                });
                login(data.login.token);
              }}
            >
              Sign in
            </button>
          </form>
          <style>{`
        .form-signin {
          text-align: center;
          width: 100%;
          max-width: 400px;
          margin: auto;
          padding-top: 40px;
          padding-bottom: 40px;
        }

        .form-signin .form-control {
          padding: 10px;
        }
      `}</style>
        </Layout>
      )}
    </ApolloConsumer>
  );
};
