# Multi-Tenant Preview URLs

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Multi-Tenant Middleware Setup

This project includes middleware for multi-tenant support with the following resolution strategies:

### Tenant Resolution Strategies

1. **Subdomain-based**: Extracts tenant from subdomains like `tenant1.yourapp.com`
2. **Custom domain**: Maps custom domains like `tenant.com` to tenants (requires Vercel Edge Config)
3. **Path-based**: Extracts tenant from URL paths like `/tenant1/dashboard`

### Configuration

Set the following environment variables to enable different features:

- `API_URL`: Base URL for your API (default: `http://localhost:3000`)
- `USE_CUSTOM_DOMAINS`: Enable custom domain resolution (requires `@vercel/edge-config`)
- `USE_PATH_BASED_TENANTS`: Enable path-based tenant resolution
- `USE_TENANT_ROUTING`: Enable tenant-aware page routing
- `REQUIRE_TENANT`: Require a valid tenant for all requests (redirects to `/not-found` if missing)

### Usage

The middleware automatically adds tenant context to request headers:

- `x-tenant-id`: The tenant ID
- `x-tenant-type`: How the tenant was resolved (`subdomain`, `custom-domain`, or `path`)
- `x-tenant-subdomain`: The subdomain (if applicable)
- `x-tenant-slug`: The path slug (if applicable)

Access tenant information in your pages:

```ts
import { getTenant } from '@/lib/get-tenant';

export default async function Page() {
  const tenant = await getTenant();
  // Use tenant.id, tenant.type, etc.
}
```

### API Endpoint

The middleware expects an API endpoint at `/api/tenants/[identifier]` that returns tenant data. See `app/api/tenants/[identifier]/route.ts` for an example implementation.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
