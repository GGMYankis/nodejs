import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($input: LoginInput) {
    loginUser(input: $input) {
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($input: UserInput) {
    createUser(input: $input) {
      email
    }
  }
`;

export const COUNT_USER = gql`
  query countUser {
    countUser
  }
`;

export const UDPADATE_AVATAR = gql`

  mutation updateAvatar($file:Upload){
    updateAvatar(file: $file){
      status,
      urlAvatar
    }
  }

`
export const GET_USER = gql`

query getUser($id:ID , $username:String){
  getUser(id:$id , username:$username){
   avatar
   username
 }
}

`

