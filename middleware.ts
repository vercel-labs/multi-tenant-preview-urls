import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSubdomain } from "tldts";

const VALID_TENANTS = new Set(["acme", "globex", "initech", "all"]);

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || request.nextUrl.hostname;
  const subdomain = getSubdomain(hostname) || "";
  const [tenantPart] = subdomain.split("---");

  // Only rewrite for valid tenants
  if (!tenantPart || !VALID_TENANTS.has(tenantPart)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Skip if already has tenant prefix
  if (pathname.startsWith(`/${tenantPart}`)) {
    return NextResponse.next();
  }

  // Rewrite to tenant-prefixed path
  url.pathname = `/${tenantPart}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
