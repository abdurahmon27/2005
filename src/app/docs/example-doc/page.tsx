"use client";

import Link from "next/link";

const sections = [
  { slug: "introduction", title: "Introduction" },
  { slug: "getting-started", title: "Getting Started" },
  { slug: "features", title: "Features" },
  { slug: "api-reference", title: "API Reference" },
];

export default function ExampleDocPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4" style={{ color: "#fe8019" }}>
        Example Documentation
      </h1>
      <p className="mb-8" style={{ color: "#a89984" }}>
        This is an example documentation with placeholder content. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit.
      </p>

      <h2 className="text-xl font-semibold mb-4" style={{ color: "#d79921" }}>
        Sections
      </h2>

      <ul className="space-y-3">
        {sections.map((section) => (
          <li key={section.slug} className="flex items-baseline gap-4">
            <span style={{ color: "#928374" }}>-</span>
            <Link
              href={`/docs/example-doc/${section.slug}`}
              className="hover:underline"
              style={{ color: "#83a598" }}
            >
              {section.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
