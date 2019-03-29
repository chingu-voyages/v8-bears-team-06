import React from "react";
import UserLayout from "../components/layouts/UserLayout";

const Signup = () => (
  <UserLayout>
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <form className="w-50 mt-5">
        <div className="form-group">
          <label className="required" htmlFor="username">
            User name
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="usernameHelp"
            placeholder="Enter user name"
            required
          />
          <small id="usernameHelp" className="form-text text-muted">
            Not your legal name, just a user name. Let&apos;s keep it
            professional.
          </small>
        </div>
        <div className="form-group">
          <label className="required" htmlFor="email">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter your email address"
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We&apos;ll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label className="required" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up!
        </button>
      </form>
    </div>
    <style>{`
        .required:after{ 
            content:'*'; 
            color:red; 
            padding-left:5px;
        }
        `}</style>
  </UserLayout>
);

export default Signup;
