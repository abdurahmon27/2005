"use client";

import Link from "next/link";

const sections = [
  { slug: "boshlash", title: "Boshlash" },
  { slug: "asoslar", title: "Asoslar" },
  { slug: "nodejs", title: "Node.js" },
  { slug: "arxitektura", title: "Arxitektura" },
  { slug: "devops", title: "DevOps" },
  { slug: "resurslar", title: "Resurslar" },
];

export default function NodejsBackendPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4" style={{ color: "#fe8019" }}>
        Node.js Backend (O'zbek)
      </h1>
      <p className="mb-8" style={{ color: "#a89984" }}>
        Backend dasturchi bo'lish uchun to'liq qo'llanma. Bu o'quv yo'li HTTP
        asoslaridan tortib tizim dizayni va DevOps amaliyotlarigacha hamma
        narsani o'z ichiga oladi.
      </p>

      <h2 className="text-xl font-semibold mb-4" style={{ color: "#d79921" }}>
        Bo'limlar
      </h2>

      <ul className="space-y-3">
        {sections.map((section) => (
          <li key={section.slug} className="flex items-baseline gap-4">
            <span style={{ color: "#928374" }}>-</span>
            <Link
              href={`/docs/nodejs-backend/${section.slug}`}
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
