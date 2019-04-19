import React from "react";
import { ApolloConsumer } from "react-apollo";

import Layout from "@/client/components/layouts/Layout";
import EditProfileBox from "@/client/components/EditProfileBox";

const EditProfile = () => {
  return (
    <ApolloConsumer>
      {client => (
        <Layout>
          <div className="box-container">
            <EditProfileBox apolloClient={client} />
          </div>
          <style jsx>{`
            .box-container {
              text-align: center;
              width: 100%;
              max-width: 600px;
              margin: auto;
              padding-top: 40px;
              padding-bottom: 40px;
            }
          `}</style>
        </Layout>
      )}
    </ApolloConsumer>
  );
};

export default EditProfile;
