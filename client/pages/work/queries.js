import gql from "graphql-tag";

export const GET_WORK_BY_ID = gql`
  query workById($id: ID!) {
    workById(id: $id) {
      id
      title
      startDate
      endDate
      description
      thoughts
    }
  }
`;
