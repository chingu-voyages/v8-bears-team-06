import React, { useState } from "react";

import routes from "../../../routes";

const WorkForm = ({
  submitWork,
  id,
  title = "",
  startDate = "",
  endDate = "",
  description = "",
  thoughts = ""
}) => {
  const [formValues, setFormValues] = useState({
    title,
    startDate,
    endDate,
    description,
    thoughts
  });
  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        const {
          data: { work: work }
        } = await submitWork({
          variables: {
            id,
            work: formValues
          }
        });
        routes.Router.pushRoute("work", { id: work.id });
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
            value={formValues.title}
            onChange={e => {
              setFormValues({ ...formValues, title: e.target.value });
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
              setFormValues({ ...formValues, description: e.target.value });
            }}
            value={formValues.description}
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
              setFormValues({ ...formValues, thoughts: e.target.value });
            }}
            value={formValues.thoughts}
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
            value={formValues.startDate}
            onChange={e => {
              e.persist();
              setFormValues({ ...formValues, startDate: e.target.value });
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
            value={formValues.endDate}
            onChange={e => {
              e.persist();
              setFormValues({ ...formValues, endDate: e.target.value });
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

export default WorkForm;
