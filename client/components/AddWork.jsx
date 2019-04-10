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
                <h1>Add Work Details</h1>
                <div className="form-group">
                <label htmlFor="title" className="float-left required">
                    Title
                </label>
                <input 
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Title of you project..."
                    value={title}
                    onChange={event => { 
                        setTitle(event.target.value); 
                    }}
                    autoFocus
                    required
                />
                <br />
                </div>
            </form>
        </>
    )
}

export default AddWork;