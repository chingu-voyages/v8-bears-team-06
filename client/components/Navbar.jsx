import React from "react";
import Link from "next/link";

const Navbar = () => (
  <nav className="navbar fixed-top navbar-expand-md navbar-light bg-warning">
    <div className="container">
      <a className="navbar-brand" href="/">
        goodWork
      </a>
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
            <Link href="#">
              <a className="nav-link">How it works</a>
            </Link>
          </li>
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
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
