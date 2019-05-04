import React from "react";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";

const ProfileCard = props => {
  return (
    <div className="profile-card mt-5 border border-warning rounded bg-white">
      <div className="container">
        <div className="row p-2">
          <div id="image" className="d-inline">
            <CloudinaryContext cloudName={process.env.CLOUD_NAME}>
              <Image publicId={props.publicId}>
                <Transformation
                  width="100"
                  height="100"
                  crop="scale"
                  radius="max"
                />
              </Image>
            </CloudinaryContext>
          </div>
          <p className="d-inline text-dark text-left ml-3 mt-3 w-75">
            {props.tagline}
          </p>
        </div>
        <div>
          <p className="text-left">
            <strong>Name: </strong>
            {props.name}
          </p>
          <p className="text-left">
            <strong>Industry: </strong>
            {props.industry}
          </p>
          <p className="text-left">
            <strong>Skills: </strong>
            {props.skills.map((skill, i) => {
              return (
                <li key={i} className="ml-4 d-inline-block">
                  {skill}
                </li>
              );
            })}
          </p>
        </div>
      </div>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css?family=Open+Sans|Raleway|Cabin|Philosopher");

        .profile-card {
          box-shadow: inset 1px 1px 5px;
        }

        p {
          font-family: "Raleway";
        }
      `}</style>
    </div>
  );
};

export default ProfileCard;
