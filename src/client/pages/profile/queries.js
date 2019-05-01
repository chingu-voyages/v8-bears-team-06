import gql from "graphql-tag";

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
      id
      works {
        id
        title
      }
    }
  }
`;

export const GET_PUBLIC_PROFILE = gql`
  query profileById($id: ID!) {
    profileById(id: $id) {
      email
      name
      location
      workType
      skills
      tagline
      statement
      experience
      imageId
      id
      works {
        id
        title
      }
    }
  }
`;
