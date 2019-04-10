import React, { useState } from 'react';
import gql from 'graphql-tag';

const AddWork = ({ apolloClient }) =>{
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [description, setDescription] = useState("");
    const [thoughts, setThoughts] = useState("");
    const [link, setLink] = useState("");

    return (
        <>
            <form>

            </form>
        </>
    )
}

export default AddWork;