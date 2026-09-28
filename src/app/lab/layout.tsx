import { LabBacklinks, LabExplorer, LabGraphPanel, LabToc } from "@/components/lab";
import type { BacklinkEntry } from "@/components/lab/lab-backlinks";
import { getLabIndex } from "@/lib/lab/notes";

import "./nextra.css";
import "./lab.css";

export const metadata = {
  title: "Lab | Haywan",
  description:
    "A digital garden — my skills, the projects living in my head, and notes about myself.",
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  const { tree, graph, backlinks, notes } = getLabIndex();
  const byHref = new Map(notes.map((note) => [note.href, note]));

  const backlinkEntries: Record<string, BacklinkEntry[]> = Object.fromEntries(
    Object.entries(backlinks).map(([href, sources]) => [
      href,
      sources.map((source) => ({
        href: source,
        title: byHref.get(source)?.title ?? source,
        description: byHref.get(source)?.description ?? "",
      })),
    ])
  );

  return (
    <div className="dark lab-shell">
      <div className="lab-column lab-column-left">
        <LabExplorer tree={tree} />
      </div>

      <div className="lab-main nextra-blog-container">{children}</div>

      <div className="lab-column lab-column-right">
        <LabGraphPanel graph={graph} />
        <LabToc />
        <LabBacklinks entries={backlinkEntries} />
      </div>
    </div>
  );
}
