import React from "react";
import { Query } from "react-apollo";
import { withRouter } from "next/router";

import Layout from "@/client/components/layouts/Layout";
import { GET_WORK_BY_ID } from "./queries";
import routes from "@/routes";

const IndexPage = ({ router }) => {
  const { id } = router.query;
  return (
    <Layout>
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
              <h1 className="text-center mt-5 pt-5">
                {title}
                <routes.Link route="workEdit" params={{ id }}>
                  <a className="btn btn-primary">Edit</a>
                </routes.Link>
              </h1>
              <p className="text-center">
                {startDate} ~ {endDate}
              </p>
              <p className="text-center">{description}</p>
              <p className="text-center">{thoughts}</p>
            </>
          );
        }}
      </Query>
    </Layout>
  );
};

export default withRouter(IndexPage);
