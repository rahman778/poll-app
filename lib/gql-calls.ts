import { gql } from "@apollo/client";

export const SIGN_UP = gql`
   mutation signup($name: String!, $email: String!, $password: String!) {
      signup(name: $name, email: $email, password: $password) {
         id
         name
         email
      }
   }
`;
