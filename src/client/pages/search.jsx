import React from "react";
import { withRouter } from "next/router";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Layout from "../components/layouts/Layout";
import routes from "@/routes";

export const SEARCH_WORKS = gql`
  query searchWorks($query: String!) {
    searchWorks(query: $query) {
      id
      title
    }
  }
`;

const WorkCard = ({ id, title }) => (
  <ul>
    <li>
      <routes.Link route="work" params={{ id }}>
        <a>
          <h2>{title}</h2>
        </a>
      </routes.Link>
    </li>
  </ul>
);

const SearchPage = ({ router }) => {
  const { query } = router.query;
  return (
    <Layout>
      <Query query={SEARCH_WORKS} variables={{ query }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Unexpected Error</div>;
          }
          return (
            <ul>
              {data.searchWorks.map(work => (
                <li key={work.id}>
                  <WorkCard id={work.id} title={work.title} />
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    </Layout>
  );
};

export default withRouter(SearchPage);
