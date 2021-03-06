import React, { useContext } from "react";
import Router from "next/router";
import Link from "next/link";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import Layout from "@/client/components/layouts/Layout";
import ProfileCard from "../../components/ProfileCard";
import { AuthContext } from "@/client/context";
import { GET_USER_PROFILE } from "./queries";

export const EDIT_PROFILE = gql`
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

const EditPage = props => {
  const value = useContext(AuthContext);
  const id = value.id;

  return (
    <Layout>
      <div className="main">
        <div className="box-container">
          <h2 className="mb-3 text-light">Edit Profile</h2>
          <Query query={GET_USER_PROFILE} variables={{ id }}>
            {({ data, loading, error }) => {
              if (loading) return "Loading";
              if (error) return <p>ERROR</p>;

              let {
                email,
                name,
                location,
                workType,
                skills,
                tagline,
                statement,
                experience,
                imageId
              } = data.profileById;
              let skillsList = skills.join(", ");

              const handleWorkSelect = event => {
                workType = event.target.value;
              };

              return (
                <Mutation mutation={EDIT_PROFILE}>
                  {addProfile => (
                    <div className="container">
                      <form
                        className="mt-5"
                        onSubmit={e => {
                          e.preventDefault();
                          let tmp = skillsList.split(", ");
                          const skills = tmp.map(skill => {
                            return skill;
                          });

                          addProfile({
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
                        }}
                      >
                        <div>
                          {!data.profileById.imageId ? (
                            <div>
                              <small className="d-block mt-3">
                                No profile image yet. Upload one now
                              </small>
                              <Link href="/profile/addimage">
                                <a
                                  className="btn btn-outline-info btn-sm mt-1 mb-2"
                                  role="button"
                                >
                                  Add Image
                                </a>
                              </Link>
                            </div>
                          ) : (
                            <div>
                              <ProfileCard
                                name={name}
                                publicId={imageId}
                                tagline={tagline}
                                industry={workType}
                                skills={skills}
                              />
                            </div>
                          )}
                        </div>

                        <div className="mt-4">
                          <Link href="/profile">
                            <a
                              className="btn btn-danger btn-sm float-right ml-1 mb-1"
                              role="button"
                            >
                              Cancel Edit
                            </a>
                          </Link>
                          <Link href="/profile/addimage">
                            <a
                              className="btn btn-secondary btn-sm float-right ml-1 mb-1"
                              role="button"
                            >
                              Change Image
                            </a>
                          </Link>
                          <button
                            type="submit"
                            className="btn btn-primary btn-sm float-right mb-1"
                          >
                            Save Profile
                          </button>
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="name"
                            className="float-left text-light"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter your full name"
                            defaultValue={name}
                            onChange={event => {
                              name = event.target.value;
                            }}
                          />
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="location"
                            className="float-left text-light"
                          >
                            Location (ex: Mumbai, Maharashtra, India)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your city, state/province and country"
                            defaultValue={location}
                            onChange={event => {
                              location = event.target.value;
                            }}
                          />
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="worktype"
                            className="float-left text-light"
                          >
                            Preferred Work Field
                          </label>
                          <select
                            onClick={handleWorkSelect}
                            defaultValue={workType}
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
                            <option value="chemical engineering">
                              Chemical Engineering
                            </option>
                            <option value="civil engineering">
                              Civil Engineering
                            </option>
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
                            <option value="food and beverage">
                              Food and Beverage
                            </option>
                            <option value="health-care">Health Care</option>
                            <option value="hospitality">Hospitality</option>
                            <option value="human resources">
                              Human Resources
                            </option>
                            <option value="industrial machinery">
                              Industrial Machinery
                            </option>
                            <option value="information technology">
                              Information Technology
                            </option>
                            <option value="insurance">Insurance</option>
                            <option value="journalism">Journalism</option>
                            <option value="legal services">
                              Legal Services
                            </option>
                            <option value="life sciences">Life Sciences</option>
                            <option value="logistics">Logistics</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="mechanical engineering">
                              Mechanical Engineering
                            </option>
                            <option value="media publishing">
                              Media/Publishing
                            </option>
                            <option value="medicine">Medicine</option>
                            <option value="pharmaceutical">
                              Pharmaceutical
                            </option>
                            <option value="real estate">Real Estate</option>
                            <option value="research">Research</option>
                            <option value="service">Service</option>
                            <option value="telecommunication">
                              Telecommunication
                            </option>
                            <option value="translation">Translation</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="skillsList"
                            className="float-left text-light"
                          >
                            Skills (ex: web development, electronics)
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder="List your skills"
                            defaultValue={skillsList}
                            onChange={event => {
                              skillsList = event.target.value;
                            }}
                          />
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="tagline"
                            className="float-left text-light"
                          >
                            Tagline (ex: A software developer with over six
                            years experience who loves building awesome
                            applications) - displayed with profile picture only
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder="Sell yourself in a sentence or two"
                            defaultValue={tagline}
                            onChange={event => {
                              tagline = event.target.value;
                            }}
                          />
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="statement"
                            className="float-left text-light"
                          >
                            Personal Statement (This one&apos;s totally up to
                            you.)
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder="I'm looking to make a change it the world..."
                            defaultValue={statement}
                            onChange={event => {
                              statement = event.target.value;
                            }}
                          />
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="experience"
                            className="float-left text-light"
                          >
                            Experience (Talk about your most relevant work
                            experience)
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder="Relevant experience in five hundred words or less"
                            defaultValue={experience}
                            onChange={event => {
                              experience = event.target.value;
                            }}
                          />
                        </div>
                      </form>
                    </div>
                  )}
                </Mutation>
              );
            }}
          </Query>
        </div>
        <style jsx>{`
          @import url("https://fonts.googleapis.com/css?family=Open+Sans|Raleway|Cabin|Philosopher");

          .main {
            background: lightgray;
          }

          h2 {
            font-family: "Raleway";
          }

          h3 {
            font-family: "Cabin";
          }

          .box-container {
            background: black;
            text-align: center;
            width: 100%;
            max-width: 600px;
            margin: auto;
            padding-top: 80px;
            padding-bottom: 40px;
          }

          input,
          textarea,
          select {
            box-shadow: 1px 1px 5px;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default EditPage;
