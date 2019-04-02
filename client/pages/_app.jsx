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
      // TODO: authorize users on SSR
      const isLoggedIn = false;
      if (!PUBLIC_PAGES.includes(ctx.pathname) && !isLoggedIn) {
        return redirect(ctx, "/login");
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
