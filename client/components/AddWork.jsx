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

                <div className="form-group">
                <label htmlFor="start-date" className="float-left required">
                    Start date
                </label>
                <input 
                    type="date"
                    className="form-control"
                    id="start-date"
                    placeholder="dd/mm/yyyy"
                    value={startDate}
                    onChange={event => { 
                        setStartDate(event.target.value); 
                    }}
                    autoFocus
                    required
                />
                <br />
                </div>

                <div className="form-group">
                <label htmlFor="end-date" className="float-left required">
                    End date
                </label>
                <input 
                    type="date"
                    className="form-control"
                    id="end-date"
                    placeholder="dd/mm/yyyy"
                    value={endDate}
                    onChange={event => { 
                        setEndDate(event.target.value); 
                    }}
                    autoFocus
                    required
                />
                <br />
                </div>

                <div className="form-group">
                <label htmlFor="description" className="float-left required">
                    Description of project
                </label>
                <input 
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="description of your project..."
                    value={description}
                    onChange={event => { 
                        setDescription(event.target.value); 
                    }}
                    autoFocus
                    required
                />
                <br />
                </div>

                <div className="form-group">
                <label htmlFor="thoughts" className="float-left">
                    Thoughts
                </label>
                <input 
                    type="text"
                    className="form-control"
                    id="thoughts"
                    placeholder="Your thoughts on this experience"
                    value={thoughts}
                    onChange={event => { 
                        setThoughts(event.target.value); 
                    }}
                    autoFocus
                />
                <br />
                </div>

                <div className="form-group">
                <label htmlFor="link" className="float-left required">
                    Link to project
                </label>
                <input 
                    type="text"
                    className="form-control"
                    id="link"
                    placeholder="Link to the project"
                    value={link}
                    onChange={event => { 
                        setLink(event.target.value); 
                    }}
                    autoFocus
                />
                <br />
                </div>
            </form>
        </>
    )
}

export default AddWork;