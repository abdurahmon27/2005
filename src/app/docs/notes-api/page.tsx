"use client";

import Link from "next/link";

const sections = [
  { slug: "kirish", title: "Kirish" },
  { slug: "loyiha-tuzilishi", title: "Loyiha tuzilishi" },
  { slug: "mongodb", title: "MongoDB" },
  { slug: "controller", title: "Controller" },
  { slug: "api", title: "API" },
];

export default function NotesApiPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4" style={{ color: "#fe8019" }}>
        Notes API yaratish
      </h1>
      <p className="mb-8" style={{ color: "#a89984" }}>
        Bu qo'llanmada Express.js va MongoDB yordamida oddiy eslatmalar (notes)
        API sini yaratamiz. Loyiha tuzilishi, ma'lumotlar bazasi va API
        yo'nalishlarini bosqichma-bosqich ko'rib chiqamiz.
      </p>

      <h2 className="text-xl font-semibold mb-4" style={{ color: "#d79921" }}>
        Bo'limlar
      </h2>

      <ul className="space-y-3">
        {sections.map((section) => (
          <li key={section.slug} className="flex items-baseline gap-4">
            <span style={{ color: "#928374" }}>-</span>
            <Link
              href={`/docs/notes-api/${section.slug}`}
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
