import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSubdomain } from "tldts";
export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || request.nextUrl.hostname;
  const subdomain = getSubdomain(hostname) || "";
  const [tenantPart] = subdomain.includes("---") ? subdomain.split("---") : [];

  if (!tenantPart) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  // Rewrite to tenant-prefixed path
  url.pathname = `/${tenantPart}${pathname}`;
  return NextResponse.rewrite(url);
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
