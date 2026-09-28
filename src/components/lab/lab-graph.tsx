"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";

import type { LabGraph, LabGraphLink, LabGraphNode } from "@/lib/lab/types";

type SimNode = LabGraphNode & {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

type SimLink = {
  source: SimNode;
  target: SimNode;
  kind: LabGraphLink["kind"];
};

/** One accent, everything else grey — the graph should whisper. */
const COLORS = {
  link: "rgba(80, 73, 69, 0.95)",
  linkActive: "rgba(168, 153, 132, 0.8)",
  note: "#a89984",
  tag: "#5a524c",
  index: "#a89984",
  active: "#fe8019",
  label: "#665c54",
  labelActive: "#d5c4a1",
};

/** Deterministic 0..1 from a string, so the layout is stable between visits. */
function hash01(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 0) % 10000) / 10000;
}

function colorFor(node: SimNode, activeId: string | null): string {
  if (node.id === activeId) return COLORS.active;
  if (node.kind === "tag") return COLORS.tag;
  if (node.kind === "index") return COLORS.index;
  return COLORS.note;
}

export function LabGraph({
  graph,
  activeId = null,
  interactive = false,
  className,
}: {
  graph: LabGraph;
  activeId?: string | null;
  /** Expanded mode: wheel zooming and double-click reset are enabled. */
  interactive?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hoverRef = useRef<string | null>(null);
  const viewRef = useRef({ zoom: 1, panX: 0, panY: 0 });

  const { nodes, links, neighbors } = useMemo(() => {
    const simNodes: SimNode[] = graph.nodes.map((node) => ({
      ...node,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: 3 + Math.min(node.degree, 8) * 0.6,
    }));
    const byId = new Map(simNodes.map((node) => [node.id, node]));
    const simLinks: SimLink[] = [];
    const adjacency = new Map<string, Set<string>>();

    for (const link of graph.links) {
      const source = byId.get(link.source);
      const target = byId.get(link.target);
      if (!source || !target) continue;
      simLinks.push({ source, target, kind: link.kind });
      if (!adjacency.has(source.id)) adjacency.set(source.id, new Set());
      if (!adjacency.has(target.id)) adjacency.set(target.id, new Set());
      adjacency.get(source.id)!.add(target.id);
      adjacency.get(target.id)!.add(source.id);
    }

    return { nodes: simNodes, links: simLinks, neighbors: adjacency };
  }, [graph]);

  const nodesKey = useMemo(() => nodes.map((node) => node.id).join("|"), [nodes]);

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
    },
    [router]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || nodes.length === 0) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = canvas.clientWidth || 280;
    let height = canvas.clientHeight || 220;
    let alpha = 1;
    let frame = 0;
    let dragging: SimNode | null = null;
    let panning = false;
    /** Once the reader moves the view themselves, stop auto-fitting it. */
    let userAdjusted = false;
    let fitting = true;
    let pointerStart = { x: 0, y: 0, time: 0, moved: 0 };
    const view = viewRef.current;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Seed on a spiral around the centre: deterministic and already spread out.
    nodes.forEach((node, index) => {
      const angle = index * 2.399963 + hash01(node.id) * 0.9;
      const spread = 18 + Math.sqrt(index + 1) * 26;
      node.x = Math.cos(angle) * spread;
      node.y = Math.sin(angle) * spread;
      node.vx = 0;
      node.vy = 0;
    });

    // Ideal edge length scales with the box, so the same graph reads well in a
    // 240px panel and in the fullscreen modal.
    let linkLength = 48;
    let repulsion = 1400;

    const rescale = () => {
      const ideal = Math.sqrt((width * height) / Math.max(4, nodes.length)) * 0.6;
      linkLength = Math.max(26, Math.min(120, ideal));
      repulsion = linkLength * linkLength * 0.55;
    };

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = canvas.clientWidth || width;
      height = canvas.clientHeight || height;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      rescale();
    };

    const tick = () => {
      const heat = 0.25 + 0.75 * alpha;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          let d2 = dx * dx + dy * dy;
          if (d2 < 1) {
            dx = (hash01(a.id + b.id) - 0.5) * 2;
            dy = (hash01(b.id + a.id) - 0.5) * 2;
            d2 = dx * dx + dy * dy + 0.5;
          }
          const d = Math.sqrt(d2);
          const force = (repulsion / d2) * heat;
          const ux = (dx / d) * force;
          const uy = (dy / d) * force;
          a.vx -= ux;
          a.vy -= uy;
          b.vx += ux;
          b.vy += uy;
        }
      }

      for (const link of links) {
        const dx = link.target.x - link.source.x;
        const dy = link.target.y - link.source.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 0.01;
        const pull = ((d - linkLength) / d) * 0.09 * heat;
        const ux = dx * pull;
        const uy = dy * pull;
        link.source.vx += ux;
        link.source.vy += uy;
        link.target.vx -= ux;
        link.target.vy -= uy;
      }

      for (const node of nodes) {
        node.vx -= node.x * 0.042 * heat;
        node.vy -= node.y * 0.042 * heat;
        if (node === dragging) {
          node.vx = 0;
          node.vy = 0;
          continue;
        }
        node.vx *= 0.78;
        node.vy *= 0.78;
        node.x += Math.max(-12, Math.min(12, node.vx));
        node.y += Math.max(-12, Math.min(12, node.vy));
      }

      alpha = Math.max(0, alpha - 0.009);
    };

    const toScreen = (node: SimNode) => ({
      x: width / 2 + (node.x + view.panX) * view.zoom,
      y: height / 2 + (node.y + view.panY) * view.zoom,
    });

    /** Keeps every node inside the panel until the reader takes over. */
    const fitToView = () => {
      if (userAdjusted) {
        fitting = false;
        return;
      }
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      for (const node of nodes) {
        minX = Math.min(minX, node.x);
        maxX = Math.max(maxX, node.x);
        minY = Math.min(minY, node.y);
        maxY = Math.max(maxY, node.y);
      }
      const padding = 42;
      const spanX = Math.max(60, maxX - minX);
      const spanY = Math.max(60, maxY - minY);
      // never shrink so far that the nodes turn into dust
      const targetZoom = Math.max(
        0.55,
        Math.min(1.8, (width - padding) / spanX, (height - padding) / spanY)
      );
      const targetPanX = -(minX + maxX) / 2;
      const targetPanY = -(minY + maxY) / 2;

      view.zoom += (targetZoom - view.zoom) * 0.14;
      view.panX += (targetPanX - view.panX) * 0.14;
      view.panY += (targetPanY - view.panY) * 0.14;

      fitting =
        Math.abs(targetZoom - view.zoom) > 0.004 ||
        Math.abs(targetPanX - view.panX) > 0.6 ||
        Math.abs(targetPanY - view.panY) > 0.6;
    };

    const draw = () => {
      fitToView();
      context.clearRect(0, 0, width, height);
      const hovered = hoverRef.current;
      const focus = hovered ?? activeId;
      const related = focus ? neighbors.get(focus) : null;
      const showAllLabels = nodes.length <= 8 || view.zoom > 1.2;

      for (const link of links) {
        const lit =
          !!focus && (link.source.id === focus || link.target.id === focus);
        const source = toScreen(link.source);
        const target = toScreen(link.target);
        context.beginPath();
        context.moveTo(source.x, source.y);
        context.lineTo(target.x, target.y);
        context.strokeStyle = lit ? COLORS.linkActive : COLORS.link;
        context.lineWidth = lit ? 1.1 : 0.8;
        context.globalAlpha = focus && !lit ? 0.35 : 1;
        context.stroke();
      }

      context.globalAlpha = 1;

      for (const node of nodes) {
        const { x, y } = toScreen(node);
        const isFocus = node.id === focus;
        const isRelated = !focus || isFocus || !!related?.has(node.id);
        const radius =
          (node.radius + (isFocus ? 1.6 : 0)) *
          Math.min(1.35, Math.max(0.9, view.zoom));

        context.globalAlpha = isRelated ? 1 : 0.32;

        if (node.id === activeId) {
          context.beginPath();
          context.arc(x, y, radius + 4, 0, Math.PI * 2);
          context.fillStyle = "rgba(254, 128, 25, 0.14)";
          context.fill();
        }

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = colorFor(node, activeId);
        context.fill();

        if (node.id === hovered) {
          context.lineWidth = 1;
          context.strokeStyle = COLORS.labelActive;
          context.stroke();
        }

        if (showAllLabels || isFocus || !!related?.has(node.id)) {
          context.font = `400 9.5px var(--font-fira-code), monospace`;
          context.textAlign = "center";
          context.textBaseline = "top";
          context.fillStyle = isFocus ? COLORS.labelActive : COLORS.label;
          const label =
            node.label.length > 26 ? `${node.label.slice(0, 24)}…` : node.label;
          context.fillText(label, x, y + radius + 4);
        }
      }

      context.globalAlpha = 1;
    };

    const loop = () => {
      tick();
      draw();
      frame = alpha > 0.002 || fitting ? requestAnimationFrame(loop) : 0;
    };

    const restart = (heat = 0.5) => {
      alpha = Math.max(alpha, heat);
      if (!frame) frame = requestAnimationFrame(loop);
    };

    resize();
    if (reducedMotion) {
      for (let i = 0; i < 260; i++) tick();
      alpha = 0;
      for (let i = 0; i < 60; i++) draw();
    } else {
      restart(1);
    }

    const pick = (event: PointerEvent | MouseEvent): SimNode | null => {
      const rect = canvas.getBoundingClientRect();
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;
      let closest: SimNode | null = null;
      let closestDistance = Infinity;
      for (const node of nodes) {
        const { x, y } = toScreen(node);
        const distance = Math.hypot(px - x, py - y);
        const threshold = Math.max(10, node.radius * view.zoom + 6);
        if (distance < threshold && distance < closestDistance) {
          closest = node;
          closestDistance = distance;
        }
      }
      return closest;
    };

    const onPointerDown = (event: PointerEvent) => {
      const node = pick(event);
      pointerStart = { x: event.clientX, y: event.clientY, time: Date.now(), moved: 0 };
      if (node) {
        dragging = node;
      } else {
        panning = true;
      }
      userAdjusted = true;
      canvas.setPointerCapture(event.pointerId);
      restart(0.35);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (dragging) {
        dragging.x = (event.clientX - rect.left - width / 2) / view.zoom - view.panX;
        dragging.y = (event.clientY - rect.top - height / 2) / view.zoom - view.panY;
        pointerStart.moved += 1;
        restart(0.3);
        return;
      }
      if (panning) {
        const dx = event.clientX - pointerStart.x;
        const dy = event.clientY - pointerStart.y;
        pointerStart.x = event.clientX;
        pointerStart.y = event.clientY;
        pointerStart.moved += Math.abs(dx) + Math.abs(dy);
        view.panX += dx / view.zoom;
        view.panY += dy / view.zoom;
        draw();
        return;
      }
      const node = pick(event);
      const nextHover = node?.id ?? null;
      if (nextHover !== hoverRef.current) {
        hoverRef.current = nextHover;
        canvas.style.cursor = node ? "pointer" : "grab";
        draw();
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      const wasDragging = dragging;
      const quick = Date.now() - pointerStart.time < 400 && pointerStart.moved < 4;
      dragging = null;
      panning = false;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
      if (wasDragging && quick) navigate(wasDragging.href);
      restart(0.2);
    };

    const onPointerLeave = () => {
      if (hoverRef.current) {
        hoverRef.current = null;
        draw();
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (!interactive) return;
      event.preventDefault();
      userAdjusted = true;
      const factor = Math.exp(-event.deltaY * 0.0015);
      view.zoom = Math.min(4, Math.max(0.35, view.zoom * factor));
      draw();
    };

    const onDoubleClick = () => {
      userAdjusted = false;
      fitting = true;
      restart(0.6);
    };

    const observer = new ResizeObserver(() => {
      resize();
      draw();
    });
    observer.observe(canvas);

    canvas.style.cursor = "grab";
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("dblclick", onDoubleClick);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("dblclick", onDoubleClick);
    };
    // nodesKey keeps the simulation from restarting on unrelated re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodesKey, activeId, interactive, navigate, neighbors]);

  if (nodes.length === 0) {
    return (
      <p className="lab-empty">Nothing to plot here yet.</p>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="Lab notes graph"
    />
  );
}
