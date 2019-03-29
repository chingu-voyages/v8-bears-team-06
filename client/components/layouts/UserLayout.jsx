import React from "react";
import Head from "next/head";
import UserNavbar from "../headers/UserNavbar";

const UserLayout = props => (
  <>
    <Head>
      <title>goodWork: Sign Up</title>
      <link
        href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" />
    </Head>
    <UserNavbar />
    <div>{props.children}</div>
  </>
);

export default UserLayout;
