import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth";

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.includes('/admin')) {
    const session = await getSession();

    if (!session || session.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/admin/:path*']
};
