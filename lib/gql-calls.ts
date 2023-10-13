import { gql } from "@apollo/client";

//fragment
export const POLL_FRAGMENT = gql`
   fragment PollDetails on Poll {
      id
      text
      createdAt
      options {
         id
         answer
      }
      user {
         name
      }
   }
`;

//queries
export const GET_POLL = gql`
   query poll($pollId: ID!) {
      poll(id: $pollId) {
         ...PollDetails
      }
   }
   ${POLL_FRAGMENT}
`;

export const GET_RESULT = gql`
   query poll($pollId: ID!) {
      poll(id: $pollId) {
         ...PollDetails
         options {
            votes {
               id
            }
         }
      }
   }
   ${POLL_FRAGMENT}
`;

//mutations
export const SIGN_UP = gql`
   mutation signup($name: String!, $email: String!, $password: String!) {
      signup(name: $name, email: $email, password: $password) {
         id
         name
         email
      }
   }
`;

export const CREATE_POLL = gql`
   mutation createPoll($text: String!, $options: [String!]!) {
      createPoll(text: $text, options: $options) {
         id
         text
         options {
            id
            answer
         }
      }
   }
`;

export const CREATE_VOTE = gql`
   mutation createVote($optionId: ID!) {
      createVote(optionId: $optionId) {
         id
         createdAt
         option {
            answer
         }
         user {
            name
         }
      }
   }
`;
