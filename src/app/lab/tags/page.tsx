import type { Metadata } from "next";
import Link from "next/link";

import { getLabTags } from "@/lib/lab/notes";
import { tagHref } from "@/lib/lab/slug";

export const metadata: Metadata = {
  title: "Tags | Lab | Haywan",
  description: "Every tag in the lab, with how many notes carry it.",
};

export default function LabTagsPage() {
  const tags = getLabTags();

  return (
    <article className="lab-article">
      <header className="lab-article-head">
        <h1 className="lab-article-title">tags</h1>
        <p className="lab-article-description">
          {tags.length} tag{tags.length === 1 ? "" : "s"} across the garden — each one
          is a node in the graph too.
        </p>
      </header>

      <ul className="lab-tag-list">
        {tags.map((tag) => (
          <li key={tag.name}>
            <Link href={tagHref(tag.name)} className="lab-tag">
              #{tag.name}
              <span className="lab-tag-count">{tag.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
