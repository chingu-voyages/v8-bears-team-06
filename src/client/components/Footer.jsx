import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <style>
        {`
        @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
        @import url("https://fonts.googleapis.com/css?family=Open+Sans|Cabin|Raleway");

        .footer {
          padding: 60px 0;
        }
      
        .footer-title {
          font-family: "Raleway";
          border-left: 3px solid #eeeeee;
          color:#ffffff;
          margin-bottom: 30px;
          padding-left: 10px;
          padding-bottom: 6px;
          text-transform: uppercase;
        }
        
        @media (max-width:767px){
          .footer-title {
          border-left: transparent;
          margin-bottom: 10px;
          padding-left: 0;
          padding-bottom: 0px;
          }
        }
      
        .footer-link {
          color: #ffffff;
          font-family: "Raleway";
          text-decoration: none !important;
          background-color: transparent;
        }

        .footer-link:hover {
          color:#eeeeee;
        }
        
        .footer .quick-links .quick-links-item{
          padding: 3px 0;
          -webkit-transition: .5s all ease;
          -moz-transition: .5s all ease;
          transition: .5s all ease;
        }
        
        .footer .quick-links .quick-links-item:hover{
          padding: 3px 0;
          margin-left:5px;
          font-weight:700;
        }
        
        .footer .quick-links .quick-links-item .footer-link .icon {
          margin-right: 5px;
        }
        
        .footer .quick-links .quick-links-item:hover .footer-link .icon {
          font-weight: 700;
        }
        
        .footer .social .list-inline-item {
          padding: 3px 0;
        }
        
        .footer .social .list-inline-item .footer-link .icon {
          margin-right: 5px;
          font-size:25px;
          -webkit-transition: .5s all ease;
          -moz-transition: .5s all ease;
          transition: .5s all ease;
        }
        
        .footer .social .list-inline-item:hover .footer-link .icon {
          font-size:30px;
          margin-top:-10px;
        }
        `}
      </style>
      <footer className="footer bg-success">
        <div className="container">
          <div className="row text-center text-xs-center text-sm-left text-md-left">
            <div className="col-xs-12 col-sm-4 col-md-4">
              <h5 className="footer-title">Quick links</h5>
              <ul className="list-unstyled quick-links">
                <li className="quick-links-item">
                  <Link href="/">
                    <a className="footer-link">
                      <i className="fa fa-angle-double-right icon" />
                      About Us
                    </a>
                  </Link>
                </li>
                <li className="quick-links-item">
                  <Link href="/">
                    <a className="footer-link">
                      <i className="fa fa-angle-double-right icon" />
                      FAQ
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4">
              <h5 className="footer-title d-none d-sm-block">Quick links</h5>
              <ul className="list-unstyled quick-links">
                <li className="quick-links-item">
                  <Link href="/">
                    <a className="footer-link">
                      <i className="fa fa-angle-double-right icon" />
                      Support Us
                    </a>
                  </Link>
                </li>
                <li className="quick-links-item">
                  <Link href="/">
                    <a className="footer-link">
                      <i className="fa fa-angle-double-right icon" />
                      Patrons
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4">
              <h5 className="footer-title d-none d-sm-block">Quick links</h5>
              <ul className="list-unstyled quick-links">
                <li className="quick-links-item">
                  <Link href="/">
                    <a className="footer-link">
                      <i className="fa fa-angle-double-right icon" />
                      Contact Us
                    </a>
                  </Link>
                </li>
                <li className="quick-links-item">
                  <Link href="/">
                    <a className="footer-link">
                      <i className="fa fa-angle-double-right icon" />
                      Terms
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
              <ul className="list-unstyled list-inline social text-center">
                <li className="list-inline-item">
                  <a
                    className="footer-link"
                    href="https://www.facebook.com/goodwork"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fa fa-facebook icon" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="footer-link"
                    href="https://www.twitter.com/goodwork"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fa fa-twitter icon" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="footer-link"
                    href="https://www.instagram.com/goodwork"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fa fa-instagram icon" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
              <p>
                <Link href="/">
                  <a className="footer-link px-2">goodWork</a>
                </Link>{" "}
                is a nonprofit online platform, where charities and volunteers
                meet to make the world a better place.
              </p>
              <p className="h6">
                <Link href="/">
                  <a className="footer-link ml-2">goodWork</a>
                </Link>{" "}
                &copy; 2019
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
