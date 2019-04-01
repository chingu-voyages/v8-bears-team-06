import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";

import withApolloClient from "../lib/with-apollo-client";
import { StoreProvider } from "../store";
import redirect from "../lib/redirect";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

const withStore = App => props => (
  <StoreProvider>
    <App {...props} />
  </StoreProvider>
);

const PUBLIC_PAGES = ["/", "/login", "/signup"];
const withAuthorization = App => {
  return class Authorizer extends React.Component {
    static async getInitialProps(context) {
      const { ctx } = context;
      // const isLoggedIn = login(ctx.res)
      const isLoggedIn = false;
      if (!PUBLIC_PAGES.includes(ctx.pathname) && !isLoggedIn) {
        redirect(ctx, "/login");
      }
      return {};
    }

    constructor(props) {
      super(props);
    }

    render() {
      return <App {...this.props} />;
    }
  };
};

export default withStore(withApolloClient(withAuthorization(MyApp)));
