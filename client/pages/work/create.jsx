import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import Layout from "../../components/layouts/Layout";
import WorkForm from "./WorkForm";

export const CREATE_WORK = gql`
  mutation workCreate($work: WorkInput!) {
    work: workCreate(work: $work) {
      id
    }
  }
`;

const CreatePage = props => {
  return (
    <Layout>
      <div className="box-container">
        <Mutation mutation={CREATE_WORK}>
          {(createWork, { data }) => <WorkForm submitWork={createWork} />}
        </Mutation>
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

export default CreatePage;
