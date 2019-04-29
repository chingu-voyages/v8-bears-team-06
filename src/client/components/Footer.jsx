import React, { useContext } from "react";
import Link from "next/link";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";

import { AuthContext } from "../context";

const Footer = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  return (
    <ApolloConsumer>
      {client => (
        <nav className="navbar navbar-expand-md navbar-light bg-success">
          <div className="container">
            <small>&copy; 2019 goodWork</small>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link href="/howitworks">
                    <a className="nav-link">How it works</a>
                  </Link>
                </li>

                {!isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link href="/signup">
                        <a className="nav-link">Sign up</a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/login">
                        <a className="nav-link">Log in</a>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link href="/profile">
                        <a className="nav-link">My Page</a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/work/create">
                        <a className="nav-link">Create Work</a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#"
                        onClick={async () => {
                          logout();
                          await client.cache.reset();
                          Router.push("/");
                        }}
                      >
                        Logout
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      )}
    </ApolloConsumer>
  );
};

export default Footer;
