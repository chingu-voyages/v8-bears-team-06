import React, { useContext } from "react";
import Link from "next/link";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Layout from "../../components/layouts/Layout";
import { AuthContext } from "../../context";

export const GET_USER_PROFILE = gql`
  query profile($email: String!) {
    profile(email: $email) {
      email
      firstName
      lastName
      location
      workType
      skills
      tagline
      statement
      experience
    }
  }
`;

const Profile = () => {
  const value = useContext(AuthContext);
  const email = value.email;
  return (
    <Layout>
      <h1 className="text-center mt-5 pt-5">Profile</h1>
      <Query
        query={GET_USER_PROFILE}
        variables={{ email }}
        fetchPolicy={"cache-and-network"}
      >
        {({ data, loading, error }) => {
          if (loading) return "Loading";
          if (error) return <p>ERROR</p>;

          return (
            <div className="container text-center mt-5">
              {!data.profile ? (
                <h6>No Profile Yet</h6>
              ) : (
                <div className="container text-left w-75">
                  <div className="text-center">
                    <h3 className="d-inline text-secondary name">
                      {data.profile.firstName}
                    </h3>
                    <h3 className="d-inline text-secondary name">
                      {" "}
                      {data.profile.lastName}
                    </h3>
                  </div>
                  <div className="text-center mt-2">
                    <p className="d-inline tagline">{data.profile.tagline}</p>
                  </div>
                  <div className="mt-5">
                    <h5 className="d-inline">Name: </h5>
                    <p className="d-inline">
                      {data.profile.firstName} {data.profile.lastName}
                    </p>
                  </div>
                  <div className="mt-4">
                    <h5 className="d-inline">Location: </h5>
                    <p className="d-inline">{data.profile.location}</p>
                  </div>
                  <div className="mt-4">
                    <h5 className="d-inline">Industry: </h5>
                    <p className="d-inline">{data.profile.workType}</p>
                  </div>
                  <div className="mt-4">
                    <h5 className="d-inline">Skills: </h5>
                    <ul className="list-group d-inline">
                      {data.profile.skills.map((skill, i) => {
                        return (
                          <li key={i} className="ml-4 d-inline">
                            {skill}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h5 className="d-inline">Personal Statement: </h5>
                    <p className="d-inline">{data.profile.statement}</p>
                  </div>
                  <div className="mt-4">
                    <h5 className="d-inline">Experience: </h5>
                    <p className="d-inline">{data.profile.experience}</p>
                  </div>
                </div>
              )}
            </div>
          );
        }}
      </Query>
      <div className="container w-75">
        <Link href="/profile/edit">
          <a className="btn btn-info mt-5 ml-5 float-left" role="button">
            Edit Profile
          </a>
        </Link>
      </div>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css?family=Open+Sans|Raleway|Cabin|Philosopher");
        h1,
        h5,
        h6 {
          font-family: "Cabin";
        }

        .name {
          font-family: "Raleway";
        }

        .tagline {
          font-family: "Philosopher";
        }

        ul {
          list-style-type: none;
        }
      `}</style>
    </Layout>
  );
};

export default Profile;
