import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "../sass/main.scss";

import { User } from "../components/User";

export const allUsersQuery = gql`
  {
    users {
      id
      email
    }
  }
`;

const Index = () => (
  <Query query={allUsersQuery}>
    {({ loading, error, data }) => {
      if (error) {
        return <div>Could not fetch users</div>;
      }

      if (loading) {
        return <div>Loading...</div>;
      }

      return (
        <section className="test">
          <h1>List of Users</h1>
          <ul>
            {data.users.map(user => (
              <li key={user.id}>
                <User email={user.email} />
              </li>
            ))}
          </ul>
        </section>
      );
    }}
  </Query>
);

export default Index;
