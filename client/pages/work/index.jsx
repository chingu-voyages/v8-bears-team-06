import React from "react";
import { Query } from "react-apollo";
import { withRouter } from "next/router";

import Layout from "@/client/components/layouts/Layout";
import { GET_WORK_BY_ID } from "./queries";
import routes from "@/routes";

const WorkPane = ({ title, startDate, endDate, description, thoughts }) => (
  <ul>
    <li>Title: {title}</li>
    <li>
      Period: {startDate} ~ {endDate}
    </li>
    <li>Description: {description}</li>
    <li>Thoughts: {thoughts}</li>
  </ul>
);

const IndexPage = ({ router }) => {
  const { id } = router.query;
  return (
    <Layout>
      <h1 className="text-center mt-5 pt-5">Work</h1>
      <Query query={GET_WORK_BY_ID} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <span>loading...</span>;
          }
          if (error) {
            return <div>Failed to fetch the work information</div>;
          }
          const {
            title,
            startDate,
            endDate,
            description,
            thoughts
          } = data.workById;
          return (
            <>
              <WorkPane
                title={title}
                startDate={startDate}
                endDate={endDate}
                description={description}
                thoughts={thoughts}
              />
              <routes.Link route="workEdit" params={{ id }}>
                <a className="btn btn-primary">Edit</a>
              </routes.Link>
            </>
          );
        }}
      </Query>
    </Layout>
  );
};

export default withRouter(IndexPage);
