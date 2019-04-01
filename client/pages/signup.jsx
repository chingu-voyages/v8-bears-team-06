import React, { useState } from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";

import Layout from "../components/layouts/Layout";

export const addUserMutation = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      email
      password
    }
  }
`;

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  return (
    <ApolloConsumer>
      {client => (
        <Layout>
          <form className="form-signin mt-5">
            <h1 className="mb-3">Sign Up</h1>
            <div className="form-group">
              <label htmlFor="email" className="float-left required">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={event => {
                  setEmail(event.target.value);
                }}
                autoFocus
                required
              />
              <small
                id="emailHelp"
                className="form-text text-muted float-left mb-3"
              >
                We&apos;ll never share your email with anyone else.
              </small>
              <br />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="float-left required">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={event => {
                  setPassword(event.target.value);
                }}
                required
              />
              <small
                id="emailHelp"
                className="form-text text-muted float-left mb-3 d-inline-block"
              >
                Must contain at least 6 alphanumeric characters.
              </small>
              <br />
            </div>

            <button
              type="submit"
              className="btn btn-primary float-left"
              onClick={async event => {
                setErrorMessage("");
                setSuccessMessage("");
                event.preventDefault();
                const { data } = await client.mutate({
                  mutation: addUserMutation,
                  variables: { email, password }
                });
                if (data.addUser.email === null) {
                  setErrorMessage("That email address is already in use.");
                } else {
                  setSuccessMessage("Your account has been created.");
                }
                setEmail("");
                setPassword("");
              }}
            >
              Sign in
            </button>
          </form>
          <p className="text-center text-danger">{errorMessage}</p>
          <p className="text-center text-success">{successMessage}</p>
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

        .required:after{ 
          content:'*'; 
          color:red; 
          padding-left:5px;
        }
      `}</style>
        </Layout>
      )}
    </ApolloConsumer>
  );
};
