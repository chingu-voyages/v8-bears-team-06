import React, { useState } from "react";
import { ApolloConsumer } from "react-apollo";

import Layout from "../components/layouts/Layout";
import Alert from "../components/atom/Alert";
import SignInBox from "../components/SignInBox";

const Login = () => {
  const [authFailed, setAuthFailed] = useState(false);

  return (
    <ApolloConsumer>
      {client => (
        <Layout>
          <div className="bg">
            <div className="box-container">
              <SignInBox apolloClient={client} setAuthFailed={setAuthFailed} />
              {authFailed && (
                <div className="mt-3">
                  <Alert variant="danger">
                    username or password is incorrect
                  </Alert>
                </div>
              )}
            </div>
          </div>
          <style jsx>
            {`
              .box-container {
                text-align: center;
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
                    rgba(0, 0, 0, 0.4),
                    rgba(0, 0, 0, 0.4)
                  ),
                  url(../static/recovery.jpg);
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
            `}
          </style>
        </Layout>
      )}
    </ApolloConsumer>
  );
};

export default Login;
