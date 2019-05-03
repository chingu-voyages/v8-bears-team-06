import React from "react";
import Link from "next/link";

import Layout from "../components/layouts/Layout";

const CharityPage = () => (
  <Layout>
    <div className="bg">
      <h1 className="mt-4 text-light">goodWork</h1>
      <div className="text-box mt-5 ml-auto mr-auto p-3 border border-warning rounded">
        <h4>Find Volunteers</h4>
        <p className="mt-3 ml-auto mr-auto">
          You recognize that there are people out there like you who want to
          make changes for the better in the world, but it&apos;s tough to find
          them. It takes money and time to recruit good people, but as a
          not-for-profit, you don&apos;t have that luxury. That&apos;s where
          goodWork comes in. We bring the volunteers to you. Create an account
          now and find people who share your vision and want to work with you to
          make the world better.
        </p>
        <Link href="/signup">
          <a className="btn btn-primary" role="button">
            Register Your Organization
          </a>
        </Link>
      </div>
    </div>
    <style jsx>{`
      @import url("https://fonts.googleapis.com/css?family=Open+Sans|Cabin|Raleway");
      h1 {
        font-family: "Raleway";
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
        background-image: linear-gradient(
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0.3)
          ),
          url(../static/agriculture.jpg);
        height: 100vh;
        min-height: 500px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        //justify-content: center;
        text-align: center;
      }

      @media (max-width: 620px) {
        .text-box {
          width: 90%;
        }
      }
    `}</style>
  </Layout>
);

export default CharityPage;
