/** Slug helpers shared by the lab index, the wikilink plugin and the client UI. */

/** "Some Note Title" -> "some-note-title" */
export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9/]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/\/-+/g, "/")
    .replace(/-+\//g, "/");
}

/**
 * Normalises whatever an author wrote in a link into a lab slug.
 * Accepts "/lab/go/channels", "go/channels", "Go Channels", "./channels#tips".
 * Returns "" for the lab index itself and null for anything not inside /lab.
 */
export function toLabSlug(target: string): string | null {
  let value = target.trim();
  if (!value || value.startsWith("http") || value.startsWith("mailto:")) {
    return null;
  }
  // drop anchors and query strings — they don't change which note is meant
  value = value.split("#")[0].split("?")[0];
  value = value.replace(/\.mdx?$/, "").replace(/\/page$/, "");
  if (value.startsWith("./")) value = value.slice(2);
  if (value.startsWith("/lab")) value = value.slice("/lab".length);
  else if (value.startsWith("lab/")) value = value.slice("lab/".length);
  else if (value.startsWith("/")) return null; // some other section of the site
  value = value.replace(/^\/+|\/+$/g, "");
  if (!value) return "";
  return slugify(value);
}

/** Slug -> route. The lab index lives at /lab. */
export function labHref(slug: string): string {
  return slug ? `/lab/${slug}` : "/lab";
}

/** "/lab/go/channels" -> "go/channels", "/lab" -> "" */
export function labSlugFromHref(href: string): string {
  return href.replace(/^\/lab\/?/, "").replace(/\/+$/, "");
}

export function tagNodeId(tag: string): string {
  return `tag:${tag}`;
}

export function tagHref(tag: string): string {
  return `/lab/tags/${encodeURIComponent(tag)}`;
}
