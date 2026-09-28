/** Shared, serializable shapes for the Lab (digital-garden) section. */

export type LabHeading = {
  id: string;
  text: string;
  depth: number;
};

export type LabNote = {
  /** Path below /lab, e.g. "react-native-for-react-devs" or "go/channels". */
  slug: string;
  /** Route to the note, e.g. "/lab/react-native-for-react-devs". */
  href: string;
  title: string;
  /** Raw frontmatter date ("YYYY/MM/DD"), kept as written. */
  date: string | null;
  /** Sortable value derived from `date`, 0 when undated. */
  timestamp: number;
  description: string;
  tags: string[];
  words: number;
  readingMinutes: number;
  /** Folder segments the note lives in, "" for top level notes. */
  folders: string[];
  /** Slugs of other lab notes this note links to. */
  outgoing: string[];
  /** Plain-text snippet used by the explorer filter. */
  excerpt: string;
};

export type LabGraphNodeKind = "note" | "tag" | "index";

export type LabGraphNode = {
  id: string;
  kind: LabGraphNodeKind;
  label: string;
  href: string;
  /** Number of edges touching the node, drives the dot radius. */
  degree: number;
};

export type LabGraphLink = {
  source: string;
  target: string;
  /** "link" = written in the note, "parent" = folder hierarchy, "tag" = shared tag */
  kind: "link" | "parent" | "tag";
};

export type LabGraph = {
  nodes: LabGraphNode[];
  links: LabGraphLink[];
};

export type LabTreeItem =
  | {
      type: "folder";
      name: string;
      path: string;
      /** The folder's own index note (`<folder>/page.mdx`), when it has one. */
      note: LabNote | null;
      children: LabTreeItem[];
    }
  | { type: "note"; note: LabNote };

export type LabTag = {
  name: string;
  count: number;
  /** Hrefs of the notes carrying the tag. */
  notes: string[];
};

export type LabIndex = {
  notes: LabNote[];
  tree: LabTreeItem[];
  tags: LabTag[];
  graph: LabGraph;
  /** note href -> hrefs of notes linking to it */
  backlinks: Record<string, string[]>;
};
