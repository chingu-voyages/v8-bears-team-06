import React, { useState } from 'react';
import Link from "next/link";
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import Cookie from "js-cookie";

import Layout from '../components/layouts/Layout';

export const GET_USER = gql`
  query profile($email: String!) {
    profile(email: $email) {
      email
      firstName
      lastName
    }
  }
`;

const Profile = () => {
    console.log("Here da cookie: " + Cookie.get("email"));
    const email = Cookie.get("email");
    return( 
        <Layout>
            <h1 className="text-center mt-5">Profile Page</h1>
            <Link href="/editprofile">
                <a className="btn btn-info mt-5" role="button">Edit Profile</a>
            </Link>
            <Query query={GET_USER} variables={{ email }}>
                {({ data, loading, error }) => {
                    if (loading) return "Loading"
                    if (error) return <p>ERROR</p>
                    

                    return (
                        <div>
                            <h3>First Name: {data.profile.firstName}</h3>
                        </div>
                    )
                }}
            </Query>

            
        </Layout> 

    )

}

export default Profile;