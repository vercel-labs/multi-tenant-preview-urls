"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const TENANTS: Record<string, { name: string; accent: string; bg: string }> = {
  acme: { name: "Acme Corp", accent: "border-blue-500", bg: "bg-blue-500" },
  globex: { name: "Globex", accent: "border-purple-500", bg: "bg-purple-500" },
  initech: { name: "Initech", accent: "border-emerald-500", bg: "bg-emerald-500" },
};

const DEFAULT_TENANT = { name: "Unknown", accent: "border-neutral-800", bg: "bg-neutral-800" };

export default function Settings() {
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
          <span className="text-neutral-400">Settings</span>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-medium">Settings</h1>
        <p className="mt-2">
          <code className="text-neutral-300 bg-neutral-800 px-2 py-1 rounded">
            {host ? `https://${host}/settings` : ""}
          </code>
        </p>

        <div className="mt-8 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
          <h2 className="text-sm font-medium text-white">Tenant configuration</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Settings are scoped to each tenant. Changes here only affect {tenant.name}, 
            not other tenants sharing this deployment.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-lg border border-neutral-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Tenant ID</div>
                <div className="text-sm text-neutral-400">Used in the subdomain prefix</div>
              </div>
              <code className="text-neutral-300 bg-neutral-800 px-2 py-1 rounded">{tenantId}</code>
            </div>
          </div>
          <div className="rounded-lg border border-neutral-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Organization</div>
                <div className="text-sm text-neutral-400">Display name</div>
              </div>
              <span className="text-neutral-300">{tenant.name}</span>
            </div>
          </div>
          <div className="rounded-lg border border-neutral-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Preview URL Pattern</div>
                <div className="text-sm text-neutral-400">How this tenant is accessed in previews</div>
              </div>
              <code className="text-neutral-300 bg-neutral-800 px-2 py-1 rounded">{tenantId}---*.vercel.app</code>
            </div>
          </div>
        </div>

        <h2 className="mt-12 text-sm font-medium text-neutral-300">Navigation</h2>
        <div className="mt-4 space-y-2">
          <Link
            href="."
            className="flex items-center justify-between rounded-lg border border-neutral-800 px-4 py-3 transition-colors hover:border-neutral-700 hover:bg-neutral-900"
          >
            <span>Tenant Home</span>
            <code className="text-sm text-neutral-500">href=&quot;.&quot;</code>
          </Link>
          <Link
            href="dashboard"
            className="flex items-center justify-between rounded-lg border border-neutral-800 px-4 py-3 transition-colors hover:border-neutral-700 hover:bg-neutral-900"
          >
            <span>Dashboard</span>
            <code className="text-sm text-neutral-500">href=&quot;dashboard&quot;</code>
          </Link>
        </div>

        <div className="mt-8 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
          <h2 className="text-sm font-medium text-white">Preview deployment benefits</h2>
          <ul className="mt-2 space-y-1 text-sm text-neutral-300">
            <li>• Test changes for specific tenants before merging</li>
            <li>• Share preview links with stakeholders for approval</li>
            <li>• Catch tenant-specific bugs early in development</li>
            <li>• Each PR gets isolated previews per tenant</li>
          </ul>
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
