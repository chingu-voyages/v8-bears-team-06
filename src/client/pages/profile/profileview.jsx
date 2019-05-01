import React from "react";
import Link from "next/link";
import { Query } from "react-apollo";
import { withRouter } from "next/router";
import Layout from "@/client/components/layouts/Layout";
import routes from "@/routes";

import ProfileCard from "../../components/ProfileCard";
import { GET_PUBLIC_PROFILE } from "./queries";

const PublicProfile = ({ router }) => {
  const { id } = router.query;
  return (
    <Layout>
      <div className="bg">
        <div className="box-container">
          <Query
            query={GET_PUBLIC_PROFILE}
            variables={{ id }}
            fetchPolicy={"cache-and-network"}
          >
            {({ data, loading, error }) => {
              if (loading) return "Loading";
              if (error) return <p>ERROR</p>;

              return (
                <div className="container text-center mt-3">
                  {!data.profileById ? (
                    <div>
                      <h6>Oops! Something went wrong</h6>
                      <p>Please log out and log in again</p>
                    </div>
                  ) : (
                    <div className="container profile-box text-left p-3">
                      <div className="text-center">
                        <h2 className="d-inline text-dark name">Profile</h2>
                        {!data.profileById.imageId ? (
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
                              name={data.profileById.name}
                              publicId={data.profileById.imageId}
                              tagline={data.profileById.tagline}
                              industry={data.profileById.workType}
                              skills={data.profileById.skills}
                              id={data.profileById.id}
                            />
                          </div>
                        )}
                      </div>
                      <div className="info p-2 mt-5 border border-warning rounded text-light">
                        <div className="mt-1 text-center">
                          <h2 className="d-inline">{data.profileById.name}</h2>
                        </div>
                        <div className="mt-4">
                          <h5 className="d-inline">Location: </h5>
                          <p className="d-inline">
                            {data.profileById.location}
                          </p>
                        </div>
                        <div className="mt-4">
                          <h5 className="d-inline">Industry: </h5>
                          <p className="d-inline">
                            {data.profileById.workType}
                          </p>
                        </div>
                        <div className="mt-4">
                          <h5 className="d-inline">Skills: </h5>
                          <ul className="list-group d-inline">
                            {data.profileById.skills.map((skill, i) => {
                              return (
                                <li key={i} className="ml-4 d-inline">
                                  {skill}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="mt-4">
                          <h5 className="d-inline">Contact: </h5>
                          <p className="d-inline">{data.profileById.email}</p>
                        </div>
                        <div className="mt-4">
                          <h5 className="d-inline">Personal Statement: </h5>
                          <p className="d-inline">
                            {data.profileById.statement}
                          </p>
                        </div>
                        <div className="mt-4">
                          <h5 className="d-inline">Experience: </h5>
                          <p className="d-inline">
                            {data.profileById.experience}
                          </p>
                        </div>
                        <div className="mt-4">
                          <h5 className="d-inline">Works: </h5>
                          <ul>
                            {data.profileById.works.map(work => (
                              <li key={work.id}>
                                <routes.Link
                                  route="work"
                                  params={{ id: work.id }}
                                >
                                  <a className="text-warning">{work.title}</a>
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
        h2,
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

        .info {
          box-shadow: 1px 1px 5px;
          background: rgba(0, 0, 0, 0.3);
        }

        .bg {
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.3),
              rgba(0, 0, 0, 0.3)
            ),
            url(../../static/leone.jpg);
          height: 100%;
          min-height: 500px;
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

export default withRouter(PublicProfile);
