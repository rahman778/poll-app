import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { compare } from "bcryptjs";

import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
   adapter: PrismaAdapter(db),
   pages: {
      signIn: "/login",
   },
   session: {
      strategy: "jwt",
   },
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),

      GitHubProvider({
         clientId: process.env.GITHUB_ID as string,
         clientSecret: process.env.GITHUB_SECRET as string,
      }),

      CredentialsProvider({
         name: "Sign in",
         credentials: {
            email: {
               type: "email",
            },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials, req) {
            if (!credentials?.email || !credentials.password) {
               return null;
            }

            const user = await db.user.findUnique({
               where: {
                  email: credentials.email,
               },
            });

            if (
               !user ||
               !(await compare(credentials.password, user.password!))
            ) {
               return null;
            }

            return {
               id: user.id,
               email: user.email,
               name: user.name,
               randomKey: "Hey cool",
            };
         },
      }),
   ],
   callbacks: {
      session: ({ session, token }) => {
         return {
            ...session,
            user: {
               ...session.user,
               id: token.id,
               randomKey: token.randomKey,
            },
         };
      },
      jwt: ({ token, user }) => {
         if (user) {
            const u = user as unknown as any;
            return {
               ...token,
               id: u.id,
               randomKey: u.randomKey,
            };
         }
         return token;
      },
   },
};

export const getAuthSession = () => getServerSession(authOptions);
