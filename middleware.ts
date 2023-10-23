import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
   const token = await getToken({ req });
   const isAuthenticated = !!token;

   if (isAuthenticated && req.nextUrl.pathname.startsWith("/login")) {
      const absoluteURL = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
   }

   if (isAuthenticated && req.nextUrl.pathname.startsWith("/signup")) {
      const absoluteURL = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
   }
}
