"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";

import { browserApolloClient } from "@/lib/apollo-client";

type Props = {
   children?: React.ReactNode;
};

const ClientProviders = ({ children }: Props) => {
   return (
      <SessionProvider>
         <ApolloProvider client={browserApolloClient}>
            <ThemeProvider attribute="class">{children}</ThemeProvider>
         </ApolloProvider>
      </SessionProvider>
   );
};

export default ClientProviders;
