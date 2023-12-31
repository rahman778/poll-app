import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";

import { PrismaClient, User, Poll, Vote, Option, Prisma } from "@prisma/client";

export type Context = {
   session: any;
   db: PrismaClient;
   req: any;
};

export const resolvers = {
   Query: {
      poll: async (_: {}, args: Poll, context: Context) => {
         return await context.db.poll.findFirst({
            where: { id: args.id },
         });
      },
   },
   Poll: {
      options: async (parent: Poll, args: {}, context: Context) => {
         const options = await context.db.option.findMany({
            where: {
               pollId: parent.id,
            },
         });

         return options;
      },
      user: async (parent: Poll, args: {}, context: Context) => {
         if (parent.userId) {
            const user = await context.db.user.findFirst({
               where: {
                  id: parent.userId,
               },
            });

            return user;
         }
      },
   },
   Option: {
      votes: async (parent: Vote, args: {}, context: Context) => {
         const votes = await context.db.vote.findMany({
            where: {
               optionId: parent.id,
            },
         });

         return votes;
      },
   },
   Mutation: {
      signup: async (_: {}, args: User, context: Context) => {
         if (!args.email || !args.password || !args.name) {
            throw new GraphQLError("All fields are required.");
         }

         // Check if the email is already registered
         const existingUser = await context.db.user.findFirst({
            where: { email: args.email },
         });
         if (existingUser) {
            throw new GraphQLError("Email already in use.");
         }

         // Hash the password
         const salt = await bcrypt.genSalt(10);
         const password = await bcrypt.hash(args.password, salt);

         // Create the user
         const user = await context.db.user.create({
            data: { ...args, password },
         });

         return user;
      },

      createPoll: async (
         _: {},
         args: {
            data: Prisma.PollCreateInput & {
               options: Option[];
            };
         },
         context: Context
      ) => {
         let userId = context.session?.user.id;
         let data: any = {
            text: args.data.text,
            options: {
               create: args.data.options?.map((option: Option) => ({
                  answer: option,
               })),
            },
            allowedVotes: args.data.allowedVotes || "1",
            deadline: args.data.deadline,
         };

         if (userId) {
            data.user = {
               connect: { id: userId },
            };
         }

         const poll = await context.db.poll.create({
            data: data,
            include: {
               options: true,
            },
         });

         return poll;
      },

      createVotes: async (
         _: {},
         args: Prisma.VoteCreateInput & {
            optionIds: string[];
         },
         context: Context
      ) => {
         let userId = context.session?.user.id;
         let userAgent = context.req.headers.get("user-agent");

         const existingVote = await context.db.vote.findFirst({
            where: {
               pollId: args.pollId,
               userAgent,
            },
         });

         if (existingVote) {
            throw new GraphQLError("You already voted on this poll.");
         }

         let data: any = args.optionIds.map((optionId: string) => ({
            optionId: optionId,
            userAgent,
            pollId: args.pollId,
         }));

         if (userId) {
            data.user = {
               connect: { id: userId },
            };
         }

         const votes = await context.db.vote.createMany({
            data: data,
         });

         return votes.count;
      },
   },
};
