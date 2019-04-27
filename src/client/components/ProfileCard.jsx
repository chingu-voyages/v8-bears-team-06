import React from "react";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";

const ProfileCard = props => {
  return (
    <div className="profile-card mt-5 border border-warning rounded bg-white">
      <div className="container">
        <div className="row p-2">
          <div id="image" className="d-inline">
            <CloudinaryContext cloudName="dcagt6ogi">
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
          <p className="d-inline text-dark tagline ml-3 mt-3 w-75">
            {props.tagline}
          </p>
        </div>
      </div>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css?family=Open+Sans|Raleway|Cabin|Philosopher");

        .profile-card {
          box-shadow: inset 1px 1px 5px;
        }

        .tagline {
          font-family: "Raleway";
        }
      `}</style>
    </div>
  );
};

export default ProfileCard;
