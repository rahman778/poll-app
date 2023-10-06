import bcrypt from "bcryptjs";

import { db } from "@/lib/db";

export const resolvers = {
   Query: {
      hello: () => {
         return "World2";
      },
   },
   Mutation: {
      signup: async (_: any, args: any) => {
         const salt = await bcrypt.genSalt(10);
         const password = await bcrypt.hash(args.password, salt);
         const user = await db.user.create({
            data: { ...args, password },
         });
         return user;
      },
   },
};
