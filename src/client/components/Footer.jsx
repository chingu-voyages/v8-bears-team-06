import React, { useContext } from "react";
import Link from "next/link";
import Router from "next/router";
import { Consumer } from "react-apollo";

import { AuthContext } from "../context";



const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
        .footer {
            padding: 60px 0;
        }

        .footer-title {
            margin-bottom: 30px;
            text-transform: uppercase;
        }

        .footer h5{
          padding-left: 10px;
            border-left: 3px solid #eeeeee;
            padding-bottom: 6px;
            margin-bottom: 20px;
            color:#ffffff;
        }
        .footer a {
            color: #ffffff;
            text-decoration: none !important;
            background-color: transparent;
            -webkit-text-decoration-skip: objects;
        }
        .footer ul.social li{
          padding: 3px 0;
        }
        .footer ul.social li a i {
            margin-right: 5px;
          font-size:25px;
          -webkit-transition: .5s all ease;
          -moz-transition: .5s all ease;
          transition: .5s all ease;
        }
        .footer ul.social li:hover a i {
          font-size:30px;
          margin-top:-10px;
        }
        .footer ul.social li a,
        .footer ul.quick-links li a{
          color:#ffffff;
        }
        .footer ul.social li a:hover{
          color:#eeeeee;
        }
        .footer ul.quick-links li{
          padding: 3px 0;
          -webkit-transition: .5s all ease;
          -moz-transition: .5s all ease;
          transition: .5s all ease;
        }
        .footer ul.quick-links li:hover{
          padding: 3px 0;
          margin-left:5px;
          font-weight:700;
        }
        .footer ul.quick-links li a i{
          margin-right: 5px;
        }
        .footer ul.quick-links li:hover a i {
            font-weight: 700;
        }

        @media (max-width:767px){
          .footer h5 {
            padding-left: 0;
            border-left: transparent;
            padding-bottom: 0px;
            margin-bottom: 10px;
          }
        }
      `}
      </style>
      <footer className="footer bg-success">
        <div className="container">
          <div className="row text-center text-xs-center text-sm-left text-md-left">
            <div className="col-xs-12 col-sm-4 col-md-4">
              <h5 className="footer-title">Quick links</h5>
              <ul className="list-unstyled quick-links">
                <li><Link href="/"><a><i className="fa fa-angle-double-right"></i>About Us</a></Link></li>
                <li><Link href="/"><a><i className="fa fa-angle-double-right"></i>FAQ</a></Link></li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4">
              <h5 className="footer-title d-none d-sm-block">Quick links</h5>
              <ul className="list-unstyled quick-links">
              <li><Link href="/"><a><i className="fa fa-angle-double-right"></i>Support Us</a></Link></li>
                <li><Link href="/"><a><i className="fa fa-angle-double-right"></i>Patrons</a></Link></li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4">
              <h5 className="footer-title d-none d-sm-block">Quick links</h5>
              <ul className="list-unstyled quick-links">
                <li><Link href="/"><a><i className="fa fa-angle-double-right"></i>Contact Us</a></Link></li>
                <li><Link href="/"><a><i className="fa fa-angle-double-right"></i>Terms</a></Link></li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
              <ul className="list-unstyled list-inline social text-center">
                <li className="list-inline-item"><a href="https://www.facebook.com/goodwork" rel="noopener noreferrer" target="_blank"><i className="fa fa-facebook"></i></a></li>
                <li className="list-inline-item"><a href="https://www.twitter.com/goodwork" rel="noopener noreferrer" target="_blank"><i className="fa fa-twitter"></i></a></li>
                <li className="list-inline-item"><a href="https://www.instagram.com/goodwork" rel="noopener noreferrer" target="_blank"><i className="fa fa-instagram"></i></a></li>
              </ul>
            </div>
          </div>	
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
              <p><Link href="/"><a className="px-2">goodWork</a></Link> is a nonprofit online platform, where charities and volunteers meet to make the world a better place.</p>
              <p className="h6"><Link href="/"><a className="ml-2">goodWork</a></Link> &copy; 2019</p>
            </div>
          </div>	
        </div>
      </footer>
    </>
  );
};

export default Footer;
