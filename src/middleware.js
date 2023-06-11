/*
import { NextResponse } from 'next/server';
import prisma from "@/lib/db.js";

export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    let token = req.cookies.token;

    if (token) {
      let user = await prisma.user.findUnique({
        where: {
          authToken: token,
        },
      });

      if (user?.admin) {
        return;
      } else {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}
*/

export default function middlware(req) {
  
}
