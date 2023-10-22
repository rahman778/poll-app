import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { resolvers, Context } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/schema";

const server = new ApolloServer<Context>({
   resolvers,
   typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
   context: async (req, res) => ({
      session: await getAuthSession(),
      req,
      res,
      db
   }),
});

export { handler as GET, handler as POST };
