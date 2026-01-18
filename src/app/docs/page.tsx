"use client";

import Link from "next/link";

const docCollections = [
  {
    slug: "nodejs-backend",
    title: "Node.js Backend (O'zbek)",
    date: "2025/01/18",
  },
  {
    slug: "example-doc",
    title: "Example Documentation",
    date: "2025/01/18",
  },
];

export default function DocsPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8" style={{ color: "#fe8019" }}>
        Documentation
      </h1>

      <ul className="space-y-3">
        {docCollections.map((doc) => (
          <li key={doc.slug} className="flex items-baseline gap-4">
            <time
              className="text-sm font-mono shrink-0"
              style={{ color: "#928374" }}
            >
              {doc.date}
            </time>
            <Link
              href={`/docs/${doc.slug}`}
              className="hover:underline"
              style={{ color: "#83a598" }}
            >
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
