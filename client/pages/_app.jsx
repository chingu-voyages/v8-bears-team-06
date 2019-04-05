import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import nextCookie from "next-cookies";

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

const withStore = App => {
  return class extends React.Component {
    static async getInitialProps(context) {
      const componentProps =
        App.getInitialProps && (await App.getInitialProps(context));

      return { ...componentProps };
    }

    constructor(props) {
      super(props);
    }
    render() {
      return (
        <StoreProvider>
          <App {...this.props} />
        </StoreProvider>
      );
    }
  };
};

const PUBLIC_PAGES = ["/", "/login", "/signup"];

function auth(context) {
  const { token } = nextCookie(context);
  if (!PUBLIC_PAGES.includes(context.pathname) && !token) {
    return redirect(context, "/login");
  }
}

const withAuth = App => {
  return class Authorizer extends React.Component {
    static async getInitialProps(context) {
      const { ctx } = context;
      auth(ctx);

      const componentProps =
        App.getInitialProps && (await App.getInitialProps(context));

      return { ...componentProps };
    }

    constructor(props) {
      super(props);
    }

    render() {
      return <App {...this.props} />;
    }
  };
};

export default withStore(withApolloClient(withAuth(MyApp)));
