import React, { Component } from 'react';
import { graphql } from "react-apollo";
import gql from 'graphql-tag';

const getWorksQuery = gql`
    {
        works {
            title
            link
            id
        }
    }
`;
class ShowWorks extends Component {
    constructor(props){
        super(props);
    }
    displayWorks(){
        var data = this.props.data;
        if(data.loading){
            return( <div>Loading books...</div> );
        } else {
            return data.works.map(work => {
                return(
                    <li key={ work.id }>{ work.title }</li>
                );
            })
        }
    }
    render(){
        return(
            <div>
                <ul id="work-list">
                    { this.displayWorks() }
                </ul>
            </div>
        );
    }
}

export default graphql(getWorksQuery)(ShowWorks);