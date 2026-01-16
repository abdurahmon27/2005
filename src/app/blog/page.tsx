"use client";

import Link from "next/link";

const posts = [
  { slug: "books-and-docs", title: "Books & Docs I'm Reading", date: "2025/01/16" },
  { slug: "about", title: "About Me", date: "2025/01/16" },
];

export default function BlogPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8" style={{ color: "#fe8019" }}>
        Blog
      </h1>

      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.slug} className="flex items-baseline gap-4">
            <time
              className="text-sm font-mono shrink-0"
              style={{ color: "#928374" }}
            >
              {post.date}
            </time>
            <Link
              href={`/blog/${post.slug}`}
              className="hover:underline"
              style={{ color: "#83a598" }}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
