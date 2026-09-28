import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LabNoteList } from "@/components/lab/lab-note-list";
import { getLabTags, getNotesByTag } from "@/lib/lab/notes";
import { slugify } from "@/lib/lab/slug";

type Params = { params: Promise<{ tag: string }> };

/** Every tag page is prerendered; unknown tags 404 instead of rendering live. */
export function generateStaticParams() {
  return getLabTags().map((tag) => ({ tag: tag.name }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { tag } = await params;
  const name = slugify(decodeURIComponent(tag));
  return {
    title: `#${name} | Lab | Haywan`,
    description: `Lab notes tagged #${name}.`,
  };
}

export default async function LabTagPage({ params }: Params) {
  const { tag } = await params;
  const name = slugify(decodeURIComponent(tag));
  const notes = getNotesByTag(name);

  if (notes.length === 0) notFound();

  return (
    <article className="lab-article">
      <header className="lab-article-head">
        <h1 className="lab-article-title">#{name}</h1>
        <p className="lab-article-description">
          {notes.length} note{notes.length === 1 ? "" : "s"} carry this tag.
        </p>
      </header>
      <LabNoteList tag={name} />
    </article>
  );
}
