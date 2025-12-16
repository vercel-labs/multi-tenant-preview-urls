"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const PREVIEW_URLS = [
  "my-app-abc123.vercel.dev",
  "my-app-git-feature-xyz.vercel.dev",
  "my-app-git-fix-bug-456.vercel.dev",
  "my-app-abc123-myteam.vercel.dev",
  "my-app-git-add-auth.vercel.dev",
  "my-app-git-update-ui-789.vercel.dev",
  "my-app-def456.vercel.dev",
  "my-app-git-refactor-api.vercel.dev",
  "my-app-git-new-dashboard.vercel.dev",
  "my-app-ghi789-myteam.vercel.dev",
];

const TENANTS: Record<
  string,
  { name: string; accent: string; bg: string; text: string }
> = {
  acme: {
    name: "Acme Corp",
    accent: "border-blue-500",
    bg: "bg-blue-500",
    text: "text-blue-400",
  },
  globex: {
    name: "Globex",
    accent: "border-purple-500",
    bg: "bg-purple-500",
    text: "text-purple-400",
  },
  initech: {
    name: "Initech",
    accent: "border-emerald-500",
    bg: "bg-emerald-500",
    text: "text-emerald-400",
  },
  all: {
    name: "All Tenants",
    accent: "border-neutral-800",
    bg: "bg-neutral-800",
    text: "text-neutral-400",
  },
};

export default function Home() {
  const { tenant: tenantId } = useParams<{ tenant: string }>();
  const tenant = TENANTS[tenantId] || TENANTS.all;
  const isAllTenants = tenantId === "all";
  const host = typeof window !== "undefined" ? window.location.host : "";
  const [previewUrlIndex, setPreviewUrlIndex] = useState(0);
  const previewUrl = PREVIEW_URLS[previewUrlIndex];

  return (
    <div className="min-h-screen bg-black text-white">
      <nav
        className={`border-b ${
          isAllTenants ? "border-neutral-800" : tenant.accent
        } px-6 py-4`}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <svg
              height="20"
              viewBox="0 0 76 65"
              fill="white"
              aria-label="Vercel"
            >
              <title>Vercel</title>
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
            {!isAllTenants && (
              <>
                <span className="text-neutral-600">/</span>
                <span className={`${tenant.bg} px-2 py-0.5 rounded text-sm`}>
                  {tenant.name}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://vercel.com/platforms/docs/multi-tenant-platforms/preview-url-prefixes"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
            >
              View docs
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <a
              href="https://github.com/vercel-labs/multi-tenant-preview-urls"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
            >
              <svg
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 py-16">
        {isAllTenants ? (
          <>
            <h1 className="text-2xl font-medium">Multi-Tenant Preview URLs</h1>
            <p className="mt-2">
              <code className="text-neutral-300 bg-neutral-800 px-2 py-1 rounded">
                {host ? <>https://{host}/</> : ""}
              </code>
            </p>
            <p className="mt-4 text-neutral-300">
              This demo shows how Vercel handles preview deployments for
              multi-tenant apps.
            </p>

            <h2 className="mt-8 text-sm font-medium text-neutral-300">
              Select a Tenant
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Each link below navigates to a tenant-specific subdomain. Notice
              how the URL changes.
            </p>

            <div className="mt-4 space-y-2">
              {Object.entries(TENANTS)
                .filter(([id]) => id !== "all")
                .map(([id, t]) => {
                  return (
                    <a
                      key={id}
                      href={host ? `https://${id}---${host}/` : ""}
                      className="flex items-center justify-between rounded-lg border border-neutral-800 px-4 py-3 transition-colors hover:bg-neutral-900 hover:border-neutral-700"
                    >
                      <span className="flex items-center gap-3">
                        <span className={`${t.bg} w-2 h-2 rounded-full`} />
                        {t.name}
                      </span>
                      <code className="text-sm">
                        <span className={t.text}>{id}</span>
                        <span className="text-neutral-600">---</span>
                        <span className="text-neutral-500">{host}</span>
                      </code>
                    </a>
                  );
                })}
            </div>

            <div className="mt-12 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
              <h2 className="text-sm font-medium text-white">The Problem</h2>
              <p className="mt-2 text-sm text-neutral-300">
                Preview URLs like{" "}
                <code className="text-white bg-neutral-800 px-1.5 py-0.5 rounded">
                  my-app-git-feature.vercel.dev
                </code>{" "}
                work great for single-tenant apps. But multi-tenant apps need to
                test changes for{" "}
                <em className="text-white not-italic font-medium">
                  each tenant separately
                </em>
                .
              </p>
              <p className="mt-3 text-sm text-neutral-300">
                Without tenant-aware previews, you&apos;d have to:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-neutral-300">
                <li>• Manually switch tenant context</li>
                <li>• Deploy separate preview environments per tenant</li>
                <li>• Manually assign domains</li>
              </ul>
            </div>

            <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
              <h2 className="text-sm font-medium text-white">The Solution</h2>
              <p className="mt-2 text-sm text-neutral-300">
                You can now add any{" "}
                <em className="text-white not-italic font-medium">
                  dynamic prefix
                </em>{" "}
                before{" "}
                <code className="text-white bg-neutral-800 px-1.5 py-0.5 rounded">
                  ---
                </code>{" "}
                in your preview URL, and Vercel will still route the request to
                the correct deployment. Your code receives the full hostname, so
                you can extract the prefix and handle routing however you want.
              </p>
              <p className="mt-3 text-sm text-neutral-400">
                <strong className="text-neutral-300">Note:</strong> This feature
                requires a custom deployment URL suffix (e.g.,{" "}
                <code className="text-neutral-300 bg-neutral-800 px-1 py-0.5 rounded text-xs">
                  .vercel.dev
                </code>
                ). It does not work with the default{" "}
                <code className="text-neutral-300 bg-neutral-800 px-1 py-0.5 rounded text-xs">
                  .vercel.app
                </code>{" "}
                suffix.
              </p>
            </div>

            <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-medium text-white">How It Works</h2>
                <button
                  type="button"
                  onClick={() =>
                    setPreviewUrlIndex((i) => (i + 1) % PREVIEW_URLS.length)
                  }
                  className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors border border-neutral-700 hover:border-neutral-600 px-2.5 py-1 rounded"
                >
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  View different deployment
                </button>
              </div>

              {/* Flow diagram - side by side */}
              <div className="grid grid-cols-2 gap-6">
                {/* Acme example */}
                <div className="space-y-3">
                  <div className="rounded border border-blue-500/30 bg-blue-500/10 px-3 py-2">
                    <div className="text-[10px] uppercase tracking-wider text-blue-400 mb-1">
                      1. User visits
                    </div>
                    <code className="text-xs">
                      <span className="text-blue-400 font-semibold">acme</span>
                      <span className="text-neutral-600">---</span>
                      <span className="text-neutral-400">{previewUrl}</span>
                    </code>
                  </div>

                  <div className="flex justify-center">
                    <svg
                      className="h-4 w-4 text-neutral-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>

                  <div className="rounded border border-neutral-700 bg-neutral-800/50 px-3 py-2">
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                      2. Vercel routes to deployment
                    </div>
                    <code className="text-xs text-neutral-300">
                      {previewUrl}
                    </code>
                  </div>

                  <div className="flex justify-center">
                    <svg
                      className="h-4 w-4 text-neutral-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>

                  <div className="rounded border border-neutral-700 bg-neutral-800/50 px-3 py-2">
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                      3. Your code receives
                    </div>
                    <code className="text-xs text-neutral-300">
                      host:{" "}
                      <span className="text-blue-400 font-semibold">acme</span>
                      <span className="text-neutral-600">---</span>
                      <span className="text-neutral-500">{previewUrl}</span>
                    </code>
                  </div>

                  <div className="flex justify-center">
                    <svg
                      className="h-4 w-4 text-neutral-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>

                  <div className="rounded border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
                    <div className="text-[10px] uppercase tracking-wider text-emerald-400 mb-1">
                      4. Your code handles routing
                    </div>
                    <code className="text-xs text-neutral-300">
                      → /
                      <span className="text-blue-400 font-semibold">acme</span>
                    </code>
                  </div>
                </div>

                {/* Globex example */}
                <div className="space-y-3">
                  <div className="rounded border border-purple-500/30 bg-purple-500/10 px-3 py-2">
                    <div className="text-[10px] uppercase tracking-wider text-purple-400 mb-1">
                      1. User visits
                    </div>
                    <code className="text-xs">
                      <span className="text-purple-400 font-semibold">
                        globex
                      </span>
                      <span className="text-neutral-600">---</span>
                      <span className="text-neutral-400">{previewUrl}</span>
                    </code>
                  </div>

                  <div className="flex justify-center">
                    <svg
                      className="h-4 w-4 text-neutral-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>

                  <div className="rounded border border-neutral-700 bg-neutral-800/50 px-3 py-2">
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                      2. Vercel routes to deployment
                    </div>
                    <code className="text-xs text-neutral-300">
                      {previewUrl}
                    </code>
                  </div>

                  <div className="flex justify-center">
                    <svg
                      className="h-4 w-4 text-neutral-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>

                  <div className="rounded border border-neutral-700 bg-neutral-800/50 px-3 py-2">
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                      3. Your code receives
                    </div>
                    <code className="text-xs text-neutral-300">
                      host:{" "}
                      <span className="text-purple-400 font-semibold">
                        globex
                      </span>
                      <span className="text-neutral-600">---</span>
                      <span className="text-neutral-500">{previewUrl}</span>
                    </code>
                  </div>

                  <div className="flex justify-center">
                    <svg
                      className="h-4 w-4 text-neutral-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>

                  <div className="rounded border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
                    <div className="text-[10px] uppercase tracking-wider text-emerald-400 mb-1">
                      4. Your code handles routing
                    </div>
                    <code className="text-xs text-neutral-300">
                      → /
                      <span className="text-purple-400 font-semibold">
                        globex
                      </span>
                    </code>
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <p className="text-xs text-neutral-400 border-t border-neutral-800 pt-4 mt-5">
                Both URLs route to the{" "}
                <em className="text-neutral-300 not-italic">same deployment</em>
                . Your code extracts the prefix and handles routing however you
                want—middleware, rewrites, or custom logic.
              </p>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-medium">{tenant.name}</h1>
            <p className="mt-2">
              <code className="bg-neutral-800 px-2 py-1 rounded">
                {host ? (
                  <>
                    <span className="text-neutral-500">https://</span>
                    <span className={tenant.text}>{tenantId}</span>
                    <span className="text-neutral-500">
                      ---{host.split("---")[1] || host}/
                    </span>
                  </>
                ) : (
                  ""
                )}
              </code>
            </p>

            <div className="mt-8 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
              <h2 className="text-sm font-medium text-white">
                You&apos;re viewing a tenant preview
              </h2>
              <p className="mt-2 text-sm text-neutral-300">
                The colored border and badge indicate which tenant you&apos;re
                viewing. In production, each tenant would have their own
                subdomain or custom domain.
              </p>
            </div>

            <a
              href={
                host ? `https://${host.replace(/^[^-]+---/, "")}/all` : "/all"
              }
              className="mt-8 inline-block text-sm text-neutral-400 hover:text-white"
            >
              &larr; Back to all tenants
            </a>
          </>
        )}
      </main>
    </div>
  );
}
