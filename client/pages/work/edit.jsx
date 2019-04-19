import React from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { withRouter } from "next/router";

import Layout from "@/client/components/layouts/Layout";
import WorkForm from "./WorkForm";
import { GET_WORK_BY_ID } from "./queries";

export const EDIT_WORK = gql`
  mutation workUpdate($id: String!, $work: WorkInput!) {
    work: workUpdate(id: $id, work: $work) {
      id
    }
  }
`;

const EditPage = ({ router }) => {
  const { id } = router.query;
  return (
    <Layout>
      <div className="box-container">
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
              <Mutation mutation={EDIT_WORK}>
                {updateWork => (
                  <WorkForm
                    submitWork={updateWork}
                    id={id}
                    title={title}
                    description={description}
                    startDate={startDate}
                    endDate={endDate}
                    thoughts={thoughts}
                  />
                )}
              </Mutation>
            );
          }}
        </Query>
      </div>
      <style jsx>{`
        .box-container {
          text-align: center;
          width: 100%;
          max-width: 600px;
          margin: auto;
          padding-top: 80px;
          padding-bottom: 40px;
        }
      `}</style>
    </Layout>
  );
};

export default withRouter(EditPage);
