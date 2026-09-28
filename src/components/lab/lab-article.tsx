import Link from "next/link";

import { slugify, tagHref } from "@/lib/lab/slug";

export type LabArticleMetadata = {
  title?: string;
  date?: string;
  description?: string;
  tag?: string | string[];
  tags?: string | string[];
  readingTime?: { text?: string; minutes?: number; words?: number };
};

function readTags(metadata: LabArticleMetadata): string[] {
  const raw = metadata.tags ?? metadata.tag ?? [];
  const list = Array.isArray(raw) ? raw : raw.split(",");
  return [...new Set(list.map((tag) => slugify(tag)).filter(Boolean))];
}

/**
 * Wrapper for every MDX page under /lab. Nextra hands us the frontmatter as
 * `metadata`, so a note only has to contain prose.
 */
export function LabArticle({
  children,
  metadata,
}: {
  children: React.ReactNode;
  metadata: LabArticleMetadata;
}) {
  const tags = readTags(metadata);
  const reading =
    metadata.readingTime?.text ??
    (metadata.readingTime?.minutes
      ? `${Math.max(1, Math.round(metadata.readingTime.minutes))} min read`
      : null);

  return (
    <article className="lab-article" data-pagefind-body="">
      <header className="lab-article-head">
        <h1 className="lab-article-title">{metadata.title ?? "Lab"}</h1>
        {metadata.description && (
          <p className="lab-article-description">{metadata.description}</p>
        )}
        <div className="lab-article-meta">
          {metadata.date && <time dateTime={metadata.date}>{metadata.date}</time>}
          {reading && <span>{reading}</span>}
          {tags.length > 0 && (
            <span className="lab-article-tags">
              {tags.map((tag) => (
                <Link key={tag} href={tagHref(tag)} className="lab-tag">
                  #{tag}
                </Link>
              ))}
            </span>
          )}
        </div>
      </header>

      <div className="lab-prose x:prose x:dark:prose-invert">{children}</div>
    </article>
  );
}
