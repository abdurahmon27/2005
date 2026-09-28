"use client";

import { ChevronDown, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import type { LabTreeItem } from "@/lib/lab/types";

const STORAGE_KEY = "lab:explorer:collapsed";

type Searchable = {
  title: string;
  slug: string;
  tags: string[];
  excerpt: string;
  description: string;
};

function noteMatches(note: Searchable, query: string): boolean {
  return (
    note.title.toLowerCase().includes(query) ||
    note.slug.toLowerCase().includes(query) ||
    note.description.toLowerCase().includes(query) ||
    note.excerpt.toLowerCase().includes(query) ||
    note.tags.some((tag) => tag.includes(query))
  );
}

function matches(item: LabTreeItem, query: string): boolean {
  if (!query) return true;
  if (item.type === "folder") {
    if (item.name.toLowerCase().includes(query)) return true;
    if (item.note && noteMatches(item.note, query)) return true;
    return item.children.some((child) => matches(child, query));
  }
  return noteMatches(item.note, query);
}

function countNotes(items: LabTreeItem[]): number {
  return items.reduce(
    (total, item) =>
      total +
      (item.type === "note" ? 1 : (item.note ? 1 : 0) + countNotes(item.children)),
    0
  );
}

export function LabExplorer({ tree }: { tree: LabTreeItem[] }) {
  const pathname = usePathname() || "/lab";
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setCollapsed(JSON.parse(stored) as string[]);
    } catch {
      // a stale or blocked localStorage just means everything starts open
    }
  }, []);

  const toggleFolder = (path: string) => {
    setCollapsed((previous) => {
      const next = previous.includes(path)
        ? previous.filter((item) => item !== path)
        : [...previous, path];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore — collapse state is a nicety, not state we depend on
      }
      return next;
    });
  };

  const filtered = useMemo(() => {
    const normalised = query.trim().toLowerCase();
    if (!normalised) return tree;
    const prune = (items: LabTreeItem[]): LabTreeItem[] =>
      items
        .filter((item) => matches(item, normalised))
        .map((item) =>
          item.type === "folder" ? { ...item, children: prune(item.children) } : item
        );
    return prune(tree);
  }, [tree, query]);

  const searching = query.trim().length > 0;

  const renderItems = (items: LabTreeItem[], depth = 0) => (
    <ul className="lab-tree" data-depth={depth}>
      {items.map((item) => {
        if (item.type === "note") {
          return (
            <li key={item.note.href}>
              <Link
                href={item.note.href}
                className="lab-tree-note"
                data-active={pathname === item.note.href}
                title={item.note.description || item.note.title}
              >
                {item.note.title}
              </Link>
            </li>
          );
        }

        const isCollapsed = !searching && collapsed.includes(item.path);
        const folderActive = pathname.startsWith(`/lab/${item.path}`);

        return (
          <li key={item.path}>
            <div className="lab-tree-folder-row">
              <button
                type="button"
                className="lab-tree-chevron"
                onClick={() => toggleFolder(item.path)}
                aria-expanded={!isCollapsed}
                aria-label={`${isCollapsed ? "Expand" : "Collapse"} ${item.name}`}
              >
                {isCollapsed ? (
                  <ChevronRight size={11} strokeWidth={2.2} aria-hidden="true" />
                ) : (
                  <ChevronDown size={11} strokeWidth={2.2} aria-hidden="true" />
                )}
              </button>
              {item.note ? (
                <Link
                  href={item.note.href}
                  className="lab-tree-folder"
                  data-active={pathname === item.note.href}
                  data-branch={folderActive}
                >
                  {item.name}
                </Link>
              ) : (
                <span className="lab-tree-folder" data-branch={folderActive}>
                  {item.name}
                </span>
              )}
            </div>
            {!isCollapsed &&
              item.children.length > 0 &&
              renderItems(item.children, depth + 1)}
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav className="lab-explorer" data-mobile-open={mobileOpen}>
      <div className="lab-section-head">
        <h2 className="lab-section-title">explorer</h2>
        <button
          type="button"
          className="lab-icon-button lab-explorer-toggle"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label="Toggle the note explorer"
        >
          {mobileOpen ? (
            <ChevronDown size={13} strokeWidth={2} aria-hidden="true" />
          ) : (
            <ChevronRight size={13} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="lab-explorer-body">
        <label className="lab-search">
          <Search size={11} strokeWidth={2} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="filter"
            aria-label="Filter lab notes"
            spellCheck={false}
          />
        </label>

        {countNotes(filtered) === 0 ? (
          <p className="lab-empty">nothing matches “{query.trim()}”</p>
        ) : (
          renderItems(filtered)
        )}

        <Link href="/lab/tags" className="lab-quiet-link lab-explorer-tags">
          all tags →
        </Link>
      </div>
    </nav>
  );
}
