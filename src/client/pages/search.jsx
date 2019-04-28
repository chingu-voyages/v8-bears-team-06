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
      <h5 className="card-title">title</h5>
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
        <Query query={SEARCH_WORKS} variables={{ query }}>
          {({ data, loading, error }) => {
            if (loading) {
              return <div>Loading...</div>;
            }
            if (error) {
              return <div>Unexpected Error</div>;
            }
            if (data.searchWorks.length === 0) {
              return <Alert variant="info">No matching works found</Alert>;
            }
            return (
              <ul>
                {data.searchWorks.map(work => (
                  <li key={work.id} className="work-card-item">
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
      </Layout>
      <style jsx>
        {`
          .work-card-item {
            list-style: none;
          }
        `}
      </style>
    </>
  );
};

export default withRouter(SearchPage);
