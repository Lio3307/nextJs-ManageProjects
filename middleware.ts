import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/project/:path*",
    "/dashboard/edit/project/:path*",
    "/dashboard/edit/task/:path*",
    "/dashboard/project/:path*/add-task",
    "/dashboard/project/:path*/member",
    "/dashboard/project/:path*/request",
    "/dashboard/report/:path*",
    "/dashboard/task/:path*",
    "/dashboard/join-project",
    "/dashboard/join-status",
  ],
};
