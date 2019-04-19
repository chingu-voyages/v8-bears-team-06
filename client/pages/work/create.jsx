import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Router from "next/router";

import Layout from "../../components/layouts/Layout";

export const CREATE_WORK = gql`
  mutation workCreate($work: WorkInput!) {
    workCreate(work: $work) {
      id
    }
  }
`;

const CreateWorkForm = ({ createWork }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thoughts, setThoughts] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        const {
          data: { workCreate: work }
        } = await createWork({
          variables: {
            work: { title, description, thoughts, startDate, endDate }
          }
        });
        Router.push(`/work/${work.id}`);
      }}
    >
      <div className="form-group row">
        <label htmlFor="title" className="col-sm-2 col-form-label">
          Title
        </label>
        <div className="col-sm-10">
          <input
            id="title"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="description" className="col-sm-2 col-form-label">
          Description
        </label>
        <div className="col-sm-10">
          <textarea
            id="description"
            className="form-control"
            placeholder="Description"
            onChange={e => {
              setDescription(e.target.value);
            }}
            value={description}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="thoughts" className="col-sm-2 col-form-label">
          Thoughts
        </label>
        <div className="col-sm-10">
          <textarea
            id="thoughts"
            className="form-control"
            placeholder="Thoughts"
            onChange={e => {
              setThoughts(e.target.value);
            }}
            value={thoughts}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="startDate" className="col-sm-2 col-form-label">
          Start
        </label>
        <div className="col-sm-4">
          <input
            id="startDate"
            type="date"
            className="form-control"
            value={startDate}
            onChange={e => {
              e.persist();
              setStartDate(e.target.value);
            }}
          />
        </div>
        <label htmlFor="endDate" className="col-sm-2 col-form-label">
          End
        </label>
        <div className="col-sm-4">
          <input
            id="endDate"
            type="date"
            className="form-control"
            value={endDate}
            onChange={e => {
              e.persist();
              setEndDate(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="form-group">
        <input type="submit" className="btn btn-primary" />
      </div>
    </form>
  );
};

const CreatePage = props => {
  return (
    <Layout>
      <div className="box-container">
        <Mutation mutation={CREATE_WORK}>
          {(createWork, { data }) => <CreateWorkForm createWork={createWork} />}
        </Mutation>
      </div>
      <style jsx>{`
        .box-container {
          text-align: center;
          width: 100%;
          max-width: 600px;
          margin: auto;
          padding-top: 80px;
          padding-bottom: 40px;
        }
      `}</style>
    </Layout>
  );
};

export default CreatePage;
