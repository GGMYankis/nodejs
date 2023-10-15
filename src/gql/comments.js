import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation addComment($input: CommentInput) {
    addComment(input: $input) {
      comment
      idPublication
    }
  }
`;

export const GET_COMMENT = gql`
  query getComments($idPublication: ID!) {
    getComments(idPublication: $idPublication) {
      comment
      idPublication
      createAt
      idUser {
        username
        avatar
      }
    }
  }
`;


export const COUNT_COMMENTS = gql`
query countComments($idPublication:ID!){
  countComments(idPublication:$idPublication)
}


`



