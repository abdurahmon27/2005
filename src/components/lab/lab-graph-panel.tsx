"use client";

import { Maximize2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import type { LabGraph } from "@/lib/lab/types";

import { LabGraph as LabGraphCanvas } from "./lab-graph";

/** /lab/tags/react -> tag:react, everything else -> the note href itself. */
function activeNodeId(pathname: string): string {
  const tag = /^\/lab\/tags\/([^/]+)\/?$/.exec(pathname);
  if (tag) return `tag:${decodeURIComponent(tag[1])}`;
  return pathname.replace(/\/$/, "") || "/lab";
}

/** Quartz-style local graph: the current note plus everything `depth` hops away. */
function localGraph(graph: LabGraph, rootId: string, depth: number): LabGraph {
  if (!graph.nodes.some((node) => node.id === rootId)) return graph;

  const adjacency = new Map<string, string[]>();
  for (const link of graph.links) {
    adjacency.set(link.source, [...(adjacency.get(link.source) ?? []), link.target]);
    adjacency.set(link.target, [...(adjacency.get(link.target) ?? []), link.source]);
  }

  const visible = new Set([rootId]);
  let frontier = [rootId];
  for (let step = 0; step < depth; step++) {
    const next: string[] = [];
    for (const id of frontier) {
      for (const neighbor of adjacency.get(id) ?? []) {
        if (visible.has(neighbor)) continue;
        visible.add(neighbor);
        next.push(neighbor);
      }
    }
    frontier = next;
  }

  return {
    nodes: graph.nodes.filter((node) => visible.has(node.id)),
    links: graph.links.filter(
      (link) => visible.has(link.source) && visible.has(link.target)
    ),
  };
}

export function LabGraphPanel({ graph }: { graph: LabGraph }) {
  const pathname = usePathname() || "/lab";
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const activeId = activeNodeId(pathname);
  const isIndex = activeId === "/lab";

  // The side panel stays readable by showing notes only; tags live in the
  // expanded graph (unless the reader is standing on a tag page).
  const panelGraph = useMemo(() => {
    const onTagPage = activeId.startsWith("tag:");
    const base = onTagPage
      ? graph
      : {
          nodes: graph.nodes.filter((node) => node.kind !== "tag"),
          links: graph.links.filter((link) => link.kind !== "tag"),
        };
    return isIndex ? base : localGraph(base, activeId, 1);
  }, [graph, activeId, isIndex]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

  return (
    <section aria-labelledby="lab-graph-heading">
      <div className="lab-section-head">
        <h2 id="lab-graph-heading" className="lab-section-title">
          {isIndex ? "graph" : "local graph"}
        </h2>
        <button
          type="button"
          className="lab-icon-button"
          onClick={() => setExpanded(true)}
          aria-label="Expand the global graph"
          title="Global graph"
        >
          <Maximize2 size={13} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <div className="lab-graph-box">
        <LabGraphCanvas graph={panelGraph} activeId={isIndex ? "/lab" : activeId} />
      </div>

      {expanded &&
        mounted &&
        createPortal(
          <div
            className="lab-graph-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Global graph"
            onClick={(event) => {
              if (event.target === event.currentTarget) setExpanded(false);
            }}
          >
            <div className="lab-graph-modal">
              <div className="lab-graph-modal-head">
                <span className="lab-section-title">global graph</span>
                <button
                  type="button"
                  className="lab-icon-button"
                  onClick={() => setExpanded(false)}
                  aria-label="Close the global graph"
                >
                  <X size={14} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
              <LabGraphCanvas
                graph={graph}
                activeId={isIndex ? "/lab" : activeId}
                interactive
                className="lab-graph-modal-canvas"
              />
              <p className="lab-graph-hint">
                scroll to zoom · drag to pan · esc to close
              </p>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
