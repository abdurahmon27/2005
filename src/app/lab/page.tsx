"use client";

import Link from "next/link";

const entries = [
  {
    slug: "react-native-for-react-devs",
    title: "React Native for a React.js Dev — Every Concept, Mapped",
    date: "2026/09/03",
  },
];

export default function LabPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2" style={{ color: "#fe8019" }}>
        Lab
      </h1>
      <p className="mb-8 text-sm" style={{ color: "#928374" }}>
        Live learning logs — thinking out loud while I learn. Rough by design;
        updated as I go.
      </p>

      <ul className="space-y-3">
        {entries.map((entry) => (
          <li key={entry.slug} className="flex items-baseline gap-4">
            <time
              className="text-sm font-mono shrink-0"
              style={{ color: "#928374" }}
            >
              {entry.date}
            </time>
            <Link
              href={`/lab/${entry.slug}`}
              className="hover:underline"
              style={{ color: "#83a598" }}
            >
              {entry.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
