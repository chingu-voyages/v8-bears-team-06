import React, { useContext } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Layout from "../components/layouts/Layout";
import { AuthContext } from "../context";

export const getWorksQuery = gql`
    {
        query works {
            title
            link
            id
        }
    }
`;

const ShowWorks = () => {
    const value = useContext(AuthContext);
    const email = value.email;

    return (
        <Layout>
            <Query
                query={getWorksQuery}
                variables={{ email }}
                fetchPolicy={"cache-and-network"}
            >
            {({data}) => {
                return data.works.map(work => {
                    return (
                        <li key={work.id}>{work.title}</li>
                    )
                })
            }}
                
            </Query>
        </Layout>
    )
}

export default ShowWorks;