# Multi-Tenant Preview URLs

Test multi-tenant applications in Vercel preview deployments by adding dynamic prefixes to preview URLs.

## How it works

Add any prefix before `---` in a preview URL:

```
{tenant}---{preview-url}
```

Vercel routes the request to the same deployment, but your code receives the full hostname including the prefix.

| URL                              | Routes to               | Your code receives                     |
| -------------------------------- | ----------------------- | -------------------------------------- |
| `acme---my-app-xyz.vercel.dev`   | `my-app-xyz.vercel.dev` | `host: acme---my-app-xyz.vercel.dev`   |
| `globex---my-app-xyz.vercel.dev` | `my-app-xyz.vercel.dev` | `host: globex---my-app-xyz.vercel.dev` |

Both URLs hit the same deployment. Your code extracts the prefix and handles routing.

## Routing

Middleware extracts the tenant from the hostname and rewrites to a tenant-prefixed path:

```ts
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
```

Request flow:

1. User visits `acme---my-app-xyz.vercel.dev/dashboard`
2. Middleware extracts `acme` from hostname
3. Middleware rewrites to `/acme/dashboard`
4. App renders the tenant-specific page

## Requirements

This feature requires a custom deployment URL suffix (e.g., `.vercel.dev`). It does not work with the default `.vercel.app` suffix.

## Demo

- [Live demo](https://multi-tenant-preview-urls.vercel.app/)
- [Documentation](https://vercel.com/platforms/docs/multi-tenant-platforms/preview-url-prefixes)
