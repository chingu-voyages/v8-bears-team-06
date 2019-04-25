import React from "react";
import { ApolloConsumer } from "react-apollo";

import Layout from "../components/layouts/Layout";
import SignUpBox from "../components/SignUpBox";

const Signup = () => {
  return (
    <ApolloConsumer>
      {client => (
        <Layout>
          <div className="bg">
            <div className="box-container">
              <SignUpBox apolloClient={client} />
            </div>
          </div>

          <style jsx>{`
            .box-container {
              text-align: center;
              color: white;
              width: 100%;
              max-width: 400px;
              margin: auto;
              padding-top: 40px;
              padding-bottom: 40px;
            }

            .bg {
              // display: flex;
              // flex-direction: column;
              background-image: linear-gradient(
                  rgba(0, 0, 0, 0.6),
                  rgba(0, 0, 0, 0.4)
                ),
                url(../static/shelter.jpg);
              height: 100vh;
              min-height: 500px;
              width: 100vw;
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
              position: relative;
              justify-content: center;
              text-align: center;
            }
          `}</style>
        </Layout>
      )}
    </ApolloConsumer>
  );
};

export default Signup;
