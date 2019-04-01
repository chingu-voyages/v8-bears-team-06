import React, { useState, useContext } from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Link from "next/link";

import Layout from "../components/layouts/Layout";
import { AuthContext } from "../context";
import redirect from "../lib/redirect";

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  return (
    <ApolloConsumer>
      {client => (
        <Layout>
          <form
            className="form-signin mt-5"
            onSubmit={async event => {
              event.preventDefault();
              const { data } = await client.query({
                query: LOGIN,
                variables: { email, password }
              });
              login(data.login.token);
              Router.push("/"); // TODO: change redirect path to user profile or something
            }}
          >
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
            <button type="submit" className="btn btn-primary float-left">
              Sign in
            </button>
            <div>
              Don&#39;t have an account? <Link href="/signup">Create one</Link>
            </div>
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

// Login.getInitialProps = async (context) => {
//   const loggedIn = false;
//   if (loggedIn) {
//     redirect(context, '/')
//   }
//   return {}
// }

export default Login;
