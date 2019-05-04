import React from "react";
import { withRouter } from "next/router";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Layout from "../components/layouts/Layout";
import Alert from "../components/atom/Alert";
import routes from "@/routes";

export const SEARCH_WORKS = gql`
  query searchWorks($query: String!) {
    searchWorks(query: $query) {
      id
      title
      description
    }
  }
`;

const WorkCard = ({ id, title, description }) => (
  <div className="card" style={{ width: "18rem" }}>
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
      <routes.Link route="work" params={{ id }}>
        <a className="btn btn-primary">See more</a>
      </routes.Link>
    </div>
  </div>
);

const SearchPage = ({ router }) => {
  const { query } = router.query;
  return (
    <>
      <Layout>
        <div className="mt-3">
          <Query query={SEARCH_WORKS} variables={{ query }}>
            {({ data, loading, error }) => {
              if (loading) {
                return <div>Loading...</div>;
              }
              if (error) {
                return <div>Unexpected Error</div>;
              }
              if (data.searchWorks.length === 0) {
                return (
                  <div className="alert-wrapper">
                    <Alert variant="info">No matching works found</Alert>
                  </div>
                );
              }
              return (
                <ul className="work-card-list">
                  {data.searchWorks.map(work => (
                    <li key={work.id}>
                      <WorkCard
                        id={work.id}
                        title={work.title}
                        description={work.description}
                      />
                    </li>
                  ))}
                </ul>
              );
            }}
          </Query>
        </div>
      </Layout>
      <style jsx>
        {`
          .work-card-list {
            list-style: none;
          }
          .alert-wrapper {
            display: flex;
            justify-content: center;
            width: 100%;
          }
        `}
      </style>
    </>
  );
};

export default withRouter(SearchPage);
