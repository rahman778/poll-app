"use client";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

type Props = {
   children?: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
   return <NextThemeProvider attribute="class">{children}</NextThemeProvider>;
};

export const NextAuthProvider = ({ children }: Props) => {
   return <SessionProvider>{children}</SessionProvider>;
};
