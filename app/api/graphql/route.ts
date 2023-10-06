import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";

import { getAuthSession } from "@/lib/auth";
import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/schema";

const server = new ApolloServer({
   resolvers,
   typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
   context: async (req, res) => ({
      currentUser: await getAuthSession(),
      req,
      res,
   }),
});

export { handler as GET, handler as POST };
