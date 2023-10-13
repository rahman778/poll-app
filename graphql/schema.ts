export const typeDefs = `#graphql   

   scalar DateTime

   type User {
      id: ID!
      name: String!
      email: String!
      emailVerified: DateTime
      image: String
      polls: [Poll]
      votes: [Vote]
   }

   type Poll {
      id: ID!
      text: String!
      createdAt: DateTime
      user: User
      options: [Option]
   }

   type Option {
      id: ID!
      answer: String!
      createdAt: DateTime
      poll: Poll
      votes: [Vote]
   }

   type Vote {
      id: ID!
      createdAt: DateTime
      user: User
      option: Option
   }

   type Query {
      hello: String
      poll(id: ID!): Poll
   }

   type Mutation {
      signup(email: String!, password: String!, name: String!): User
      createPoll(text: String!, options: [String]!): Poll
      createVote(optionId: ID!): Vote
   }
`;
