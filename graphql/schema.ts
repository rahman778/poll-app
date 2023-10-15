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
      allowedVotes: String
      deadline: String
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
      poll(id: ID!): Poll
   }

   input PollCreateInput {
      text: String!
      options: [String]!
      allowedVotes: String
      deadline: String
   }

   type Mutation {
      signup(email: String!, password: String!, name: String!): User
      createPoll(data: PollCreateInput): Poll
      createVotes(optionIds: [ID!]!, pollId: ID!): Int!
   }
`;
