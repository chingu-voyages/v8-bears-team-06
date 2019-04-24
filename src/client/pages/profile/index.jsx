import React, { useContext, useState } from "react";
import Link from "next/link";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
import Layout from "@/client/components/layouts/Layout";
import { AuthContext } from "@/client/context";
import routes from "@/routes";

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
      <Link href="/profile/edit">
        <a
          className="btn btn-success btn-sm float-right mt-3 mr-2"
          role="button"
          style={{ display: visibility }}
        >
          Edit Profile
        </a>
      </Link>
      <h3 className="text-center mt-5 pt-5">Profile</h3>
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
            <div className="container text-center mt-5">
              {!data.profile ? (
                <div>
                  <h6>Oops! Something went wrong</h6>
                  <p>Please log out and log in again</p>
                </div>
              ) : (
                <div className="container text-left w-75">
                  <div className="text-center">
                    <h3 className="d-inline text-secondary name">
                      {data.profile.name}
                    </h3>
                    {!data.profile.imageId ? (
                      <div>
                        <small className="d-block mt-3">
                          No profile image yet. Upload one now
                        </small>
                        <Link href="/profile/addimage">
                          <a
                            className="btn btn-outline-primary btn-sm mt-1 mb-2"
                            role="button"
                          >
                            Add Image
                          </a>
                        </Link>
                      </div>
                    ) : (
                      <div>
                        <CloudinaryContext cloudName="dcagt6ogi">
                          <Image publicId={data.profile.imageId}>
                            <Transformation
                              width="100"
                              height="100"
                              crop="scale"
                              radius="max"
                            />
                          </Image>
                        </CloudinaryContext>
                        <Link href="/profile/addimage">
                          <a
                            className="btn btn-outline-secondary btn-sm mt-1 mb-2"
                            role="button"
                          >
                            Change Image
                          </a>
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <p className="d-inline tagline">{data.profile.tagline}</p>
                  </div>
                  <div className="mt-5">
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
                          <routes.Link route="work" params={{ id: work.id }}>
                            <a>{work.title}</a>
                          </routes.Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        }}
      </Query>
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
