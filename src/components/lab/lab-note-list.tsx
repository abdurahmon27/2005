import Link from "next/link";

import { getLabIndex } from "@/lib/lab/notes";

/**
 * Note rows for use inside MDX: `<LabNoteList folder="skills" limit={5} />`.
 * Data comes from the MDX files on disk, so a new note shows up by existing.
 */
export function LabNoteList({
  folder,
  tag,
  limit,
  showDescription = true,
}: {
  folder?: string;
  tag?: string;
  limit?: number;
  showDescription?: boolean;
}) {
  const { notes } = getLabIndex();

  let selected = notes.filter((note) => note.slug);
  if (folder) {
    selected = selected.filter(
      (note) => note.slug === folder || note.folders[0] === folder
    );
  }
  if (tag) selected = selected.filter((note) => note.tags.includes(tag));
  if (limit) selected = selected.slice(0, limit);

  if (selected.length === 0) {
    return <p className="lab-empty">No notes here yet — this section is next up.</p>;
  }

  return (
    <ul className="lab-note-list not-prose">
      {selected.map((note) => (
        <li key={note.href} className="lab-note-row">
          <div className="lab-note-row-head">
            <Link href={note.href} className="lab-note-row-title">
              {note.title}
            </Link>
            {note.date && <time dateTime={note.date}>{note.date}</time>}
          </div>
          {showDescription && note.description && (
            <p className="lab-note-row-description">{note.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
