import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";

import { db } from "@/lib/db";

export const resolvers = {
   Query: {
      hello: () => {
         return "World2";
      },
   },
   Mutation: {
      signup: async (_: any, args: any) => {
         if (!args.email || !args.password || !args.name) {
            throw new GraphQLError("All fields are required.");
         }

         // Check if the email is already registered
         const existingUser = await db.user.findFirst({
            where: { email: args.email },
         });
         if (existingUser) {
            throw new GraphQLError("Email already in use.");
         }

         // Hash the password
         const salt = await bcrypt.genSalt(10);
         const password = await bcrypt.hash(args.password, salt);

         // Create the user
         const user = await db.user.create({
            data: { ...args, password },
         });

         return user;

         // const salt = await bcrypt.genSalt(10);
         // const password = await bcrypt.hash(args.password, salt);
         // const user = await db.user.create({
         //    data: { ...args, password },
         // });
         // return user;
      },
   },
};
