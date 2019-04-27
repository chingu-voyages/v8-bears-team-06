import React, { useState, useContext } from "react";
import Router from "next/router";
import axios from "axios";
import gql from "graphql-tag";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
import { Mutation } from "react-apollo";
import Layout from "@/client/components/layouts/Layout";
import { AuthContext } from "@/client/context";

export const ADD_IMAGE = gql`
  mutation addImage($email: String, $imageId: String) {
    addImage(email: $email, imageId: $imageId) {
      email
      imageId
    }
  }
`;

const AddImage = props => {
  const value = useContext(AuthContext);
  const email = value.email;
  let selectedFile;

  const [imageId, setImageId] = useState("");

  const fileSelectedHandler = event => {
    selectedFile = event.target.files[0];
  };

  const fileUploadHandler = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", process.env.UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload/`,
      formData
    );
    setImageId(response.data.public_id);
  };

  return (
    <Layout>
      <div className="box-container">
        <h3 className="mt-5">Image Upload</h3>
        <form className="form-group mt-4">
          <input
            className="d-inline-block"
            type="file"
            onChange={fileSelectedHandler}
          />
          <button
            className="btn btn-warning d-block mt-4 ml-auto mr-auto"
            onClick={fileUploadHandler}
          >
            Upload Image
          </button>
        </form>
        <CloudinaryContext cloudName={process.env.CLOUD_NAME}>
          <Image publicId={imageId}>
            <Transformation
              width="150"
              height="150"
              crop="scale"
              radius="max"
            />
          </Image>
        </CloudinaryContext>
        <p>
          You should choose an image that can be nicely squared, meaning the
          height and width are equal. All profile images will be displayed in a
          circular frame with width and height equal to 150 pixels.
        </p>
        {!imageId ? (
          <p>
            No image yet. If no image appears within a few seconds after
            uploading, try again
          </p>
        ) : (
          <Mutation mutation={ADD_IMAGE}>
            {addImage => (
              <div>
                <form className="form-group mt-4">
                  <label className="d-block">Image good? Save it now.</label>
                  <button
                    className="btn btn-success"
                    onClick={e => {
                      e.preventDefault();
                      addImage({
                        variables: {
                          email,
                          imageId
                        }
                      });
                      Router.push("/profile");
                    }}
                  >
                    Save
                  </button>
                </form>
              </div>
            )}
          </Mutation>
        )}
      </div>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css?family=Open+Sans|Raleway|Cabin|Philosopher");

        h3,
        p {
          font-family: "Cabin";
        }

        .box-container {
          text-align: center;
          width: 100%;
          max-width: 600px;
          margin: auto;
          padding-top: 80px;
          padding-bottom: 40px;
        }

        input {
          box-shadow: 1px 1px 5px;
        }
      `}</style>
    </Layout>
  );
};

export default AddImage;
