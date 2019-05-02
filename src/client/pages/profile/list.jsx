import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Layout from "@/client/components/layouts/Layout";
import routes from "@/routes";

import ProfileCard from "../../components/ProfileCard";

export const GET_PROFILE_CARDS = gql`
  query profileCards {
    profileCards {
      name
      workType
      skills
      tagline
      imageId
      id
    }
  }
`;

const ProfileList = () => {
  return (
    <Layout>
      <div className="bg">
        <div className="box-container">
          <h2 className="text-light">Members</h2>
          <Query query={GET_PROFILE_CARDS} fetchPolicy={"cache-and-network"}>
            {({ data, loading, error }) => {
              if (loading) return "Loading";
              if (error) return <p>ERROR</p>;

              return (
                <div className="container text-center">
                  {!data.profileCards ? (
                    <div>
                      <h6>Oops! Something went wrong</h6>
                      <p>Please log out and log in again</p>
                    </div>
                  ) : (
                    <div className="container profile-box text-left p-3">
                      {data.profileCards.map((card, i) => {
                        return (
                          <div key={i}>
                            <ProfileCard
                              name={card.name}
                              publicId={card.imageId}
                              tagline={card.tagline}
                              industry={card.workType}
                              skills={card.skills}
                            />
                            <routes.Link
                              route="profileView"
                              params={{ id: card.id }}
                            >
                              <a className="btn btn-primary btn-sm mt-2">
                                View Full Profile
                              </a>
                            </routes.Link>
                          </div>
                        );
                      })}
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
        h6 {
          font-family: "Cabin";
        }

        h2 {
          font-family: "Raleway";
        }

        .box-container {
          background: black;
          text-align: center;
          width: 100%;
          max-width: 600px;
          margin: auto;
          padding-top: 40px;
          padding-bottom: 40px;
        }

        .bg {
          background: lightgray;
          height: 100%;
          min-height: 500px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          position: relative;
          justify-content: center;
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

export default ProfileList;
