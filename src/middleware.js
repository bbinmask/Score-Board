"use server";

import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const path = req.nextUrl.pathname;

  const isPublicPath = path === "/auth/sign-in" || path === "/auth/sign-up";
  const token = req.cookies.get("accessToken")?.value;

  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET),
      );
      // Add the user information to the request headers
      const modifiedHeaders = new Headers(req.headers);
      modifiedHeaders.set("x-user-id", payload._id);

      const response = NextResponse.next();
      response.cookies.set("user-id", payload._id, {
        secure: true,
        httpOnly: true,
      });
      return response;
    } catch (error) {
      return NextResponse.json({
        status: 404,
        message: "Invalid token",
      });
    }
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/", "/profile", "/settings", "/auth/:path*"],
};
