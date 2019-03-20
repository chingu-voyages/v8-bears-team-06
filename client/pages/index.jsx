import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { User } from "../components/User";

export const allUsersQuery = gql`
  {
    users {
      id
      email
    }
  }
`;

export default () => (
  <Query query={allUsersQuery}>
    {({ loading, error, data }) => {
      if (error) {
        return <div>Could not fetch users</div>;
      }

      if (loading) {
        return <div>Loading...</div>;
      }

      return (
        <section>
          <h1>List of Users</h1>
          <ul>
            {data.users.map(user => (
              <li>
                <User key={user.id} email={user.email} />
              </li>
            ))}
          </ul>
        </section>
      );
    }}
  </Query>
);
