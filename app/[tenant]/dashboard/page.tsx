"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const TENANTS: Record<string, { name: string; accent: string; bg: string }> = {
  acme: { name: "Acme Corp", accent: "border-blue-500", bg: "bg-blue-500" },
  globex: { name: "Globex", accent: "border-purple-500", bg: "bg-purple-500" },
  initech: { name: "Initech", accent: "border-emerald-500", bg: "bg-emerald-500" },
};

const DEFAULT_TENANT = { name: "Unknown", accent: "border-neutral-800", bg: "bg-neutral-800" };

export default function Dashboard() {
  const { tenant: tenantId } = useParams<{ tenant: string }>();
  const tenant = TENANTS[tenantId] || DEFAULT_TENANT;
  const host = typeof window !== "undefined" ? window.location.host : "";

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className={`border-b ${tenant.accent} px-6 py-4`}>
        <div className="mx-auto flex max-w-3xl items-center gap-3 text-sm">
          <Link href=".">
            <svg height="20" viewBox="0 0 76 65" fill="white" aria-label="Vercel">
              <title>Vercel</title>
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
          </Link>
          <span className="text-neutral-600">/</span>
          <Link href="." className={`${tenant.bg} px-2 py-0.5 rounded text-sm hover:opacity-80`}>{tenant.name}</Link>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400">Dashboard</span>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-medium">Dashboard</h1>
        <p className="mt-2">
          <code className="text-neutral-300 bg-neutral-800 px-2 py-1 rounded">
            {host ? `https://${host}/dashboard` : ""}
          </code>
        </p>

        <div className="mt-8 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
          <h2 className="text-sm font-medium text-white">Tenant-specific data</h2>
          <p className="mt-2 text-sm text-neutral-300">
            In a real app, this dashboard would show data specific to {tenant.name}. 
            The same code serves all tenants, but each sees only their own data.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-neutral-800 p-4">
            <div className="text-sm text-neutral-400">Users</div>
            <div className="mt-1 text-2xl">1,234</div>
          </div>
          <div className="rounded-lg border border-neutral-800 p-4">
            <div className="text-sm text-neutral-400">Revenue</div>
            <div className="mt-1 text-2xl">$12.4k</div>
          </div>
        </div>

        <h2 className="mt-12 text-sm font-medium text-neutral-300">Relative Navigation</h2>
        <p className="mt-1 text-sm text-neutral-400">
          Navigate using relative paths. The tenant context is preserved automatically.
        </p>

        <div className="mt-4 space-y-2">
          <Link
            href="."
            className="flex items-center justify-between rounded-lg border border-neutral-800 px-4 py-3 transition-colors hover:border-neutral-700 hover:bg-neutral-900"
          >
            <span>Tenant Home</span>
            <code className="text-sm text-neutral-500">href=&quot;.&quot;</code>
          </Link>
          <Link
            href="settings"
            className="flex items-center justify-between rounded-lg border border-neutral-800 px-4 py-3 transition-colors hover:border-neutral-700 hover:bg-neutral-900"
          >
            <span>Settings</span>
            <code className="text-sm text-neutral-500">href=&quot;settings&quot;</code>
          </Link>
        </div>

        <div className="mt-8 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
          <h2 className="text-sm font-medium text-white">Notice the URL structure</h2>
          <p className="mt-2 text-sm text-neutral-300">
            You&apos;re at{" "}
            <code className="text-white bg-neutral-800 px-1.5 py-0.5 rounded">/dashboard</code> but the actual route is{" "}
            <code className="text-white bg-neutral-800 px-1.5 py-0.5 rounded">/{tenantId}/dashboard</code>. Middleware handles the rewrite 
            transparently, so your app code doesn&apos;t need to know about tenant prefixes.
          </p>
        </div>

        <a
          href={host ? `https://${host.replace(/^[^-]+---/, "")}/all` : "/all"}
          className="mt-8 inline-block text-sm text-neutral-400 hover:text-white"
        >
          &larr; Back to all tenants
        </a>
      </main>
    </div>
  );
}
