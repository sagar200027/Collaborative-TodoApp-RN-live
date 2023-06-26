import { gql } from "@apollo/client";

export const MY_PROJECTS = gql`
  query myTaskLists {
    myTaskLists {
      id
      title
      createdAt
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation createTaskList($title: String!) {
    createTaskList(title: $title) {
      id
      title
      users {
        id
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation createTaskList($id: ID!) {
    deleteTaskList(id: $id)
  }
`;