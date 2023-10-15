import { gql } from "@apollo/client";

export const PUBLISH = gql`
  mutation publish(
    $file: Upload
    $typeImg: String
    $price: String
    $name: String
  ) {
    publish(file: $file, price: $price, name: $name, typeImg: $typeImg) {
      status
      urlFile
    }
  }
`;

export const GET_PUBLICATIONS = gql`
  query getPublication($username: String!) {
    getPublication(username: $username) {
      id
      file
      idUser
      price
      name
      typeImg
    }
  }
`;

export const DELETE_PUBLICATIONS = gql`
  mutation deletePublication($idPublication: ID!) {
    deletePublication(idPublication: $idPublication)
  }
`;

export const GET_PUBLICATIONS_FOR_WOMEN = gql`
  query getPublicationForWomen($category: String!) {
    getPublicationForWomen(category: $category) {
      file
      idUser
      id
      price
      name
      typeImg
    }
  }
`;

export const GET_PUBLICATIONS_FOR_MAN = gql`
  query getPublicationForMan($category: String!) {
    getPublicationForMan(category: $category) {
      file
      idUser
      id
      price
      name
      typeImg
    }
  }
`;
