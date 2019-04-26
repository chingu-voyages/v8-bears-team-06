import React, { useContext, useState } from "react";
import Link from "next/link";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Layout from "@/client/components/layouts/Layout";
import { AuthContext } from "@/client/context";
import routes from "@/routes";

import ProfileCard from "../../components/ProfileCard";

export const GET_USER_PROFILE = gql`
  query profile($email: String!) {
    profile(email: $email) {
      email
      name
      location
      workType
      skills
      tagline
      statement
      experience
      imageId
      works {
        id
        title
      }
    }
  }
`;

const Profile = () => {
  const value = useContext(AuthContext);
  const email = value.email;
  const [visibility, setVisibility] = useState("block");
  return (
    <Layout>
      <div className="bg">
        <Link href="/profile/edit">
          <a
            className="btn btn-success btn-sm float-right mt-3 mr-4"
            role="button"
            style={{ display: visibility }}
          >
            Edit Profile
          </a>
        </Link>
        <div className="box-container">
          <Query
            query={GET_USER_PROFILE}
            variables={{ email }}
            fetchPolicy={"cache-and-network"}
          >
            {({ data, loading, error }) => {
              if (loading) return "Loading";
              if (error) return <p>ERROR</p>;
              if (!data.profile) {
                setVisibility("none");
              }

              return (
                <div className="container text-center mt-3">
                  {!data.profile ? (
                    <div>
                      <h6>Oops! Something went wrong</h6>
                      <p>Please log out and log in again</p>
                    </div>
                  ) : (
                    <div className="container profile-box text-left p-3">
                      <div className="text-center">
                        <h2 className="d-inline text-light name">
                          {data.profile.name}
                        </h2>
                        {!data.profile.imageId ? (
                          <div>
                            <small className="d-block mt-3">
                              No profile image yet. Upload one now
                            </small>
                            <Link href="/profile/addimage">
                              <a
                                className="btn btn-info btn-sm mt-1 mb-2"
                                role="button"
                              >
                                Add Image
                              </a>
                            </Link>
                          </div>
                        ) : (
                          <div>
                            <ProfileCard
                              publicId={data.profile.imageId}
                              tagline={data.profile.tagline}
                            />
                          </div>
                        )}
                      </div>
                      <div className="info p-2 mt-5 border border-warning rounded bg-light">
                        <div className="mt-1">
                          <h5 className="d-inline">Name: </h5>
                          <p className="d-inline">{data.profile.name}</p>
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
                        <div className="mt-4">
                          <h5 className="d-inline">Works: </h5>
                          <ul>
                            {data.profile.works.map(work => (
                              <li key={work.id}>
                                <routes.Link
                                  route="work"
                                  params={{ id: work.id }}
                                >
                                  <a>{work.title}</a>
                                </routes.Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }}
          </Query>
        </div>
      </div>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css?family=Open+Sans|Raleway|Cabin|Philosopher");
        h1,
        h5,
        h6,
        .heading {
          font-family: "Cabin";
        }

        a {
          text-decoration: none;
        }

        .box-container {
          text-align: center;
          width: 100%;
          max-width: 600px;
          margin: auto;
          padding-top: 40px;
          padding-bottom: 40px;
        }

        .profile-box {
          // box-shadow: inset 1px 1px 5px;
        }

        .info {
          box-shadow: inset 1px 1px 5px;
        }

        .bg {
          // display: flex;
          // flex-direction: column;
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.3),
              rgba(0, 0, 0, 0.3)
            ),
            url(../static/leone.jpg);
          height: 100%;
          min-height: 500px;
          width: 100vw;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          position: relative;
          justify-content: center;
          text-align: center;
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
