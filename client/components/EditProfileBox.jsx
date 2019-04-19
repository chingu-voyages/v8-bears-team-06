import React, { useState } from "react";
import Router from "next/router";
import gql from "graphql-tag";
import Cookie from "js-cookie";

export const addProfileMutation = gql`
  mutation addProfile(
    $email: String
    $name: String
    $location: String
    $workType: String
    $skills: [String]
    $tagline: String
    $statement: String
    $experience: String
  ) {
    addProfile(
      email: $email
      name: $name
      location: $location
      workType: $workType
      skills: $skills
      tagline: $tagline
      statement: $statement
      experience: $experience
    ) {
      email
      name
      location
      workType
      skills
      tagline
      statement
      experience
    }
  }
`;

const EditProfileBox = ({ apolloClient }) => {
  const email = Cookie.get("email");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [workType, setWorkType] = useState("");
  const [skillsList, setSkillsList] = useState("");
  const [tagline, setTagline] = useState("");
  const [statement, setStatement] = useState("");
  const [experience, setExperience] = useState("");

  const handleWorkSelect = event => {
    setWorkType(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    let tmp = skillsList.split(", ");
    const skills = tmp.map(skill => {
      return skill;
    });
    await apolloClient.mutate({
      mutation: addProfileMutation,
      variables: {
        email,
        name,
        location,
        workType,
        skills,
        tagline,
        statement,
        experience
      }
    });
    Router.push("/profile");
  };

  return (
    <>
      <form className="mt-5">
        <h1 className="mb-3">User Profile</h1>
        <h6 className="mt-2" suppressHydrationWarning={true}>
          Your email: {email}
        </h6>
        <div className="form-group">
          <label htmlFor="name" className="float-left">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your full name"
            value={name}
            onChange={event => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location" className="float-left">
            Location (ex: Mumbai, India)
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your city and country"
            value={location}
            onChange={event => {
              setLocation(event.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="worktype" className="float-left">
            Preferred Work Field
          </label>
          <select
            onClick={handleWorkSelect}
            className="form-control"
            id="worktype"
            name="worktype"
          >
            <option>Choose...</option>
            <option value="accounting">Accounting</option>
            <option value="agriculture">Agriculture</option>
            <option value="architecture">Architecture</option>
            <option value="arts">Arts</option>
            <option value="automotive">Automotive</option>
            <option value="chemical engineering">Chemical Engineering</option>
            <option value="civil engineering">Civil Engineering</option>
            <option value="clothing">Clothing</option>
            <option value="consulting">Consulting</option>
            <option value="design">Design</option>
            <option value="education">Education</option>
            <option value="electrical engineering">
              Electrical Engineering
            </option>
            <option value="electronics">Electronics</option>
            <option value="energy">Energy</option>
            <option value="environment">Environment</option>
            <option value="finance">Finance</option>
            <option value="food and beverage">Food and Beverage</option>
            <option value="health-care">Health Care</option>
            <option value="hospitality">Hospitality</option>
            <option value="human resources">Human Resources</option>
            <option value="industrial machinery">Industrial Machinery</option>
            <option value="information technology">
              Information Technology
            </option>
            <option value="insurance">Insurance</option>
            <option value="journalism">Journalism</option>
            <option value="legal services">Legal Services</option>
            <option value="life sciences">Life Sciences</option>
            <option value="logistics">Logistics</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="mechanical engineering">
              Mechanical Engineering
            </option>
            <option value="media publishing">Media/Publishing</option>
            <option value="medicine">Medicine</option>
            <option value="pharmaceutical">Pharmaceutical</option>
            <option value="real estate">Real Estate</option>
            <option value="research">Research</option>
            <option value="service">Service</option>
            <option value="telecommunication">Telecommunication</option>
            <option value="translation">Translation</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="skillsList" className="float-left">
            Skills (ex: web development, electronics)
          </label>
          <textarea
            type="text"
            className="form-control"
            placeholder="List your skills"
            value={skillsList}
            onChange={event => {
              setSkillsList(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tagline" className="float-left">
            Tagline (ex: A software developer with over six years experience who
            loves building awesome applications)
          </label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Sell yourself in a sentence or two"
            value={tagline}
            onChange={event => {
              setTagline(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="statement" className="float-left">
            Personal Statement (This one&apos;s totally up to you.)
          </label>
          <textarea
            type="text"
            className="form-control"
            placeholder="I'm looking to make a change it the world..."
            value={statement}
            onChange={event => {
              setStatement(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="experience" className="float-left">
            Experience (Talk about your most relevant work experience)
          </label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Relevant experience in five hundred words or less"
            value={experience}
            onChange={event => {
              setExperience(event.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary float-left"
          onClick={handleSubmit}
        >
          Save Profile
        </button>
      </form>
    </>
  );
};

export default EditProfileBox;
