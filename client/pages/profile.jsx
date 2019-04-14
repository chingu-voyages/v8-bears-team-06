import React from "react";
import Link from "next/link";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Cookie from "js-cookie";

import Layout from "../components/layouts/Layout";

export const GET_USER_PROFILE = gql`
  query profile($email: String!) {
    profile(email: $email) {
      email
      firstName
      lastName
    }
  }
`;

const Profile = () => {
  const email = Cookie.get("email");
  return (
    <Layout>
      <h1 className="text-center mt-5">Profile</h1>
      <Query query={GET_USER_PROFILE} variables={{ email }}>
        {({ data, loading, error }) => {
          if (loading) return "Loading";
          if (error) return <p>ERROR</p>;

          return (
            <div className="container text-center mt-5">
              {!data.profile ? (
                <h6>No Profile Yet</h6>
              ) : (
                <h6>Welcome: {data.profile.firstName}</h6>
              )}
            </div>
          );
        }}
      </Query>
      <Link href="/editprofile">
        <a className="badge badge-info mt-5 ml-5" role="badge">
          Edit Profile
        </a>
      </Link>
    </Layout>
  );
};

export default Profile;
