import React from "react";
import Layout from '../components/Layout'

const Index = () => (
  <Layout>
    <div className="bg">
      <h1>goodWork</h1>
      <p>Where charities and volunteers meet!</p>

    </div>
    <style>{`
      body, html {
        height: 100vh;
        width: 100vw;
      }

      .bg .h1 {
          font-size: 64px;
          font-weight: 300;
          margin: 80px 0 25px;
          color: #2c3e50;
          text-align: center;
      }

      .bg {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../static/leone.jpg);
        height: calc(100vh - 56px);
        min-height: 500px;
        width: 100vw;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
      }
    `}</style>
    
  </Layout>
);

export default Index;