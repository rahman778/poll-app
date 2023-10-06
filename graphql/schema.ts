export const typeDefs = `#graphql
   type User {
      id: ID!
      name: String!
      email: String!
      password: String
      emailVerified: String
      image: String
   }

   type Query {
      hello: String
   }

   type Mutation {
      signup(email: String!, password: String!, name: String!): User
   }
`;
