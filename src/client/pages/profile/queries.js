import gql from "graphql-tag";

export const GET_PROFILE = gql`
  query profile($email: String!) {
    profile(email: $email) {
      email
      name
      location
      workType
      skills
      tagline
      statement
      experience
      imageId
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query profile($email: String!) {
    profile(email: $email) {
      email
      name
      location
      workType
      skills
      tagline
      statement
      experience
      imageId
      works {
        id
        title
      }
    }
  }
`;

export const GET_PROFILE_CARDS = gql`
  query profileCards {
    profileCards {
      name
      workType
      skills
      tagline
      imageId
    }
  }
`;
