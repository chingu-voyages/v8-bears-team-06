import React from "react";
import Link from "next/link";

import Layout from "../components/layouts/Layout";

const VolunteerPage = () => (
  <Layout>
    <div className="bg">
      <h1 className="mt-4 text-white">goodWork</h1>
      <div className="text-box mt-5 ml-auto mr-auto p-3 border border-warning rounded">
        <h4>Find Charities</h4>
        <p className="mt-3 ml-auto mr-auto">
          You want to make a meaningful change in the world, and you have a lot
          to offer. It would be a shame if you couldn&apos;t find an
          organization that could use your skills. In fact, there are many such
          organizations out there looking for people like you right now.
          That&apos;s where goodWork comes in. We have created a community of
          volunteers and organizations that wish to employ them. Create an
          account now and find others who share your vision and want to work
          with you to make the world better.
        </p>
        <Link href="/signup">
          <a className="btn btn-primary" role="button">
            Join Our Community
          </a>
        </Link>
      </div>
    </div>
    <style>{`
        @import url("https://fonts.googleapis.com/css?family=Open+Sans|Raleway|Cabin|Philosopher");

      h1 {
        font-size: 44px;
        font-weight: 700;
        color: #2c3e50;
      }

      h3 {
        color: #2c3e50;
      }

      .text-box {
          box-shadow: 1px 1px 3px;
          font-family: "Cabin";
          width: 60%;
          background: rgba(0, 0, 0, 0.5);
          color: white;
      }

      .bg {
        display: flex;
        flex-direction: column;
        background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(../static/volunteer.jpg);
        height: 100vh;
        min-height: 500px;
        width: 100vw;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        //justify-content: center;
        text-align: center;
      }
    `}</style>
  </Layout>
);

export default VolunteerPage;
