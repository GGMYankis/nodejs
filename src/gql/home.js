import { gql } from "@apollo/client";

export const ALL_PUBLICATION = gql`
 query allPublication{
  allPublication{
    file
    idUser{
      username
      avatar
    }
    id
    price
    name
    typeImg
  }
}
`;
export const GET_PUBLICATION_FOR_WOMEN = gql`
query getPublicationForWomen($category:String!){
  getPublicationForWomen(category:$category){
    file
    idUser
    id
    price
    name
    typeImg
  }
}
`;

export const GET_PUBLICATION_FOR_MAN = gql`
query getPublicationForMan($category:String!){
  getPublicationForMan(category:$category){
    file
    idUser
    id
    price
    name
    typeImg
  }
}
`;