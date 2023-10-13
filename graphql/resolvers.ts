import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";

import { PrismaClient, User, Poll, Option, Vote } from "@prisma/client";

export type Context = {
   session: any;
   db: PrismaClient;
};

export const resolvers = {
   Query: {
      hello: () => {
         return "World2";
      },
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

      createPoll: async (_: {}, args: any, context: Context) => {
         if (context.session) {
            return await context.db.poll.create({
               data: {
                  text: args.text,
                  user: {
                     connect: { id: context.session.user.id },
                  },
                  options: {
                     create: args.options.map((option: any) => ({
                        answer: option,
                     })),
                  },
               },
               include: {
                  options: true,
               },
            });
         } else {
            return await context.db.poll.create({
               data: {
                  text: args.text,
                  options: {
                     create: args.options.map((option: any) => ({
                        answer: option,
                     })),
                  },
               },
               include: {
                  options: true,
               },
            });
         }
      },

      createVote: async (_: {}, args: any, context: Context) => {
         let userId = context.session?.user.id;

         let data: any = {
            option: {
               connect: { id: args.optionId },
            },
         };

         if (userId) {
            data.user = {
               connect: { id: userId },
            };
         }

         const vote = await context.db.vote.create({
            data: data,
            include: {
               option: true,
               user: true
            },
         });

         return vote;
      },
   },
};
