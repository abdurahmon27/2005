import "server-only";

import fs from "node:fs";
import path from "node:path";

import { labHref, slugify, tagHref, tagNodeId, toLabSlug } from "./slug";
import type {
  LabGraph,
  LabGraphLink,
  LabGraphNode,
  LabIndex,
  LabNote,
  LabTag,
  LabTreeItem,
} from "./types";

const LAB_DIR = path.join(process.cwd(), "src", "app", "lab");
const WORDS_PER_MINUTE = 200;
/** Routes under /lab that are generated, not authored notes. */
const RESERVED_SEGMENTS = new Set(["tags"]);

type Frontmatter = Record<string, string | string[]>;

/** Minimal frontmatter reader — the lab only uses flat `key: value` pairs. */
function readFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data: Frontmatter = {};
  let lastKey: string | null = null;

  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;

    // `  - item` continues the previous key as a list
    const listItem = /^\s*-\s+(.*)$/.exec(line);
    if (listItem && lastKey) {
      const previous = data[lastKey];
      const items = Array.isArray(previous) ? previous : [];
      items.push(unquote(listItem[1]));
      data[lastKey] = items;
      continue;
    }

    const pair = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
    if (!pair) continue;
    const [, key, rest] = pair;
    lastKey = key;
    const value = rest.trim();
    if (!value) {
      data[key] = [];
    } else if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((item) => unquote(item))
        .filter(Boolean);
    } else {
      data[key] = unquote(value);
    }
  }

  return { data, body: raw.slice(match[0].length) };
}

function unquote(value: string): string {
  return value.trim().replace(/^['"]|['"]$/g, "").trim();
}

function asString(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value.join(", ");
  return value ?? "";
}

function readTags(data: Frontmatter): string[] {
  const raw = data.tags ?? data.tag;
  const list = Array.isArray(raw) ? raw : asString(raw).split(",");
  const seen = new Set<string>();
  for (const item of list) {
    const tag = slugify(item);
    if (tag) seen.add(tag);
  }
  return [...seen];
}

/** Strips code, JSX and markdown noise so the text can be counted and searched. */
function toPlainText(body: string): string {
  return body
    .replace(/^import .*$/gm, "")
    .replace(/^export .*$/gm, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, target, label) => label || target)
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\|.*\|\s*$/gm, " ")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Every lab note this body points at, via markdown links or `[[wikilinks]]`. */
function extractOutgoing(body: string, selfSlug: string): string[] {
  const linkable = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ");
  const found = new Set<string>();

  const add = (target: string) => {
    const slug = toLabSlug(target);
    if (slug === null || slug === selfSlug) return;
    found.add(slug);
  };

  for (const match of linkable.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g)) {
    add(match[1]);
  }
  for (const match of linkable.matchAll(/\]\((\/lab[^)\s]*)\)/g)) {
    add(match[1]);
  }

  return [...found];
}

function parseTimestamp(date: string): number {
  if (!date) return 0;
  const value = Date.parse(date.replace(/\//g, "-"));
  return Number.isNaN(value) ? 0 : value;
}

function collectNoteFiles(dir: string, segments: string[] = []): string[][] {
  if (!fs.existsSync(dir)) return [];
  const found: string[][] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && (entry.name === "page.mdx" || entry.name === "page.md")) {
      found.push(segments);
      continue;
    }
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("_") || entry.name.startsWith("[")) continue;
    if (segments.length === 0 && RESERVED_SEGMENTS.has(entry.name)) continue;
    found.push(...collectNoteFiles(path.join(dir, entry.name), [...segments, entry.name]));
  }

  return found;
}

function readNote(segments: string[]): LabNote | null {
  const dir = path.join(LAB_DIR, ...segments);
  const file = ["page.mdx", "page.md"]
    .map((name) => path.join(dir, name))
    .find((candidate) => fs.existsSync(candidate));
  if (!file) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, body } = readFrontmatter(raw);
  const slug = segments.join("/");
  const text = toPlainText(body);
  const words = text ? text.split(" ").length : 0;

  return {
    slug,
    href: labHref(slug),
    title:
      asString(data.title) ||
      segments.at(-1)?.replace(/-/g, " ") ||
      "Lab",
    date: asString(data.date) || null,
    timestamp: parseTimestamp(asString(data.date)),
    description: asString(data.description),
    tags: readTags(data),
    words,
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    folders: segments.slice(0, -1),
    outgoing: extractOutgoing(body, slug),
    excerpt: text.slice(0, 280),
  };
}

function buildTree(notes: LabNote[]): LabTreeItem[] {
  const root: LabTreeItem[] = [];
  const folders = new Map<string, Extract<LabTreeItem, { type: "folder" }>>();

  const folderAt = (segments: string[]): LabTreeItem[] => {
    let children = root;
    let walked = "";
    for (const segment of segments) {
      walked = walked ? `${walked}/${segment}` : segment;
      let folder = folders.get(walked);
      if (!folder) {
        folder = {
          type: "folder",
          name: segment.replace(/-/g, " "),
          path: walked,
          note: null,
          children: [],
        };
        folders.set(walked, folder);
        children.push(folder);
      }
      children = folder.children;
    }
    return children;
  };

  // Folders first, so a note can attach itself to its own folder afterwards.
  for (const note of notes) {
    if (note.folders.length) folderAt(note.folders);
  }

  for (const note of notes) {
    if (!note.slug) continue; // the /lab index is rendered separately
    const owned = folders.get(note.slug);
    if (owned) {
      owned.note = note;
      continue;
    }
    folderAt(note.folders).push({ type: "note", note });
  }

  const sort = (items: LabTreeItem[]): LabTreeItem[] => {
    const sorted = [...items].sort((a, b) => {
      if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
      if (a.type === "folder" && b.type === "folder") {
        return a.name.localeCompare(b.name);
      }
      const noteA = a.type === "note" ? a.note : null;
      const noteB = b.type === "note" ? b.note : null;
      if (!noteA || !noteB) return 0;
      if (noteA.timestamp !== noteB.timestamp) {
        return noteB.timestamp - noteA.timestamp;
      }
      return noteA.title.localeCompare(noteB.title);
    });
    for (const item of sorted) {
      if (item.type === "folder") item.children = sort(item.children);
    }
    return sorted;
  };

  return sort(root);
}

function buildGraph(notes: LabNote[], tags: LabTag[]): LabGraph {
  const byHref = new Map(notes.map((note) => [note.href, note]));
  const nodes: LabGraphNode[] = notes.map((note) => ({
    id: note.href,
    kind: note.slug ? "note" : "index",
    label: note.title,
    href: note.href,
    degree: 0,
  }));

  for (const tag of tags) {
    nodes.push({
      id: tagNodeId(tag.name),
      kind: "tag",
      label: `#${tag.name}`,
      href: tagHref(tag.name),
      degree: 0,
    });
  }

  const links: LabGraphLink[] = [];
  const seen = new Set<string>();
  const push = (source: string, target: string, kind: LabGraphLink["kind"]) => {
    const key = [source, target].sort().join("->");
    if (source === target || seen.has(key)) return;
    seen.add(key);
    links.push({ source, target, kind });
  };

  for (const note of notes) {
    for (const slug of note.outgoing) {
      const target = byHref.get(labHref(slug));
      if (target) push(note.href, target.href, "link");
    }
    // a note also belongs to its folder's index note, if that note exists
    for (let depth = note.folders.length; depth > 0; depth--) {
      const parent = byHref.get(labHref(note.folders.slice(0, depth).join("/")));
      if (parent) {
        push(note.href, parent.href, "parent");
        break;
      }
    }
    for (const tag of note.tags) {
      push(note.href, tagNodeId(tag), "tag");
    }
  }

  const degrees = new Map<string, number>();
  for (const link of links) {
    degrees.set(link.source, (degrees.get(link.source) ?? 0) + 1);
    degrees.set(link.target, (degrees.get(link.target) ?? 0) + 1);
  }
  for (const node of nodes) {
    node.degree = degrees.get(node.id) ?? 0;
  }

  return { nodes, links };
}

function buildIndex(): LabIndex {
  const notes = collectNoteFiles(LAB_DIR)
    .map(readNote)
    .filter((note): note is LabNote => note !== null)
    .sort((a, b) => b.timestamp - a.timestamp || a.title.localeCompare(b.title));

  const tagMap = new Map<string, string[]>();
  for (const note of notes) {
    for (const tag of note.tags) {
      tagMap.set(tag, [...(tagMap.get(tag) ?? []), note.href]);
    }
  }
  const tags: LabTag[] = [...tagMap.entries()]
    .map(([name, hrefs]) => ({ name, count: hrefs.length, notes: hrefs }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  const backlinks: Record<string, string[]> = {};
  const hrefs = new Set(notes.map((note) => note.href));
  for (const note of notes) {
    for (const slug of note.outgoing) {
      const target = labHref(slug);
      if (!hrefs.has(target)) continue;
      backlinks[target] = [...(backlinks[target] ?? []), note.href];
    }
  }

  return { notes, tree: buildTree(notes), tags, graph: buildGraph(notes, tags), backlinks };
}

let cached: LabIndex | null = null;

/** Built once per process from the MDX files on disk — no runtime data source. */
export function getLabIndex(): LabIndex {
  if (!cached || process.env.NODE_ENV === "development") {
    cached = buildIndex();
  }
  return cached;
}

export function getLabNotes(): LabNote[] {
  return getLabIndex().notes.filter((note) => note.slug);
}

export function getLabTags(): LabTag[] {
  return getLabIndex().tags;
}

export function getNotesByTag(tag: string): LabNote[] {
  const normalised = slugify(tag);
  return getLabNotes().filter((note) => note.tags.includes(normalised));
}
