"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Drop-in replacement for `@theguild/remark-mermaid`'s <Mermaid> (aliased in
 * next.config.ts) with one difference: renders are queued.
 *
 * `mermaid.render()` keeps global state, so when several diagrams on the same
 * page come into view together — a tall screen, an anchor jump — one of them
 * comes back as "Syntax error in text" even though the chart is fine.
 */
let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(job: () => Promise<T>): Promise<T> {
  const run = queue.then(job, job);
  queue = run.catch(() => undefined);
  return run;
}

export function Mermaid({ chart }: { chart: string }) {
  const id = useId();
  const [svg, setSvg] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        setIsVisible(true);
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const htmlElement = document.documentElement;
    const observer = new MutationObserver(renderChart);
    observer.observe(htmlElement, { attributes: true });
    renderChart();
    return () => observer.disconnect();

    async function renderChart() {
      const isDark =
        htmlElement.classList.contains("dark") ||
        htmlElement.getAttribute("data-theme") === "dark";
      const { default: mermaid } = await import("mermaid");

      try {
        const rendered = await enqueue(async () => {
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: "loose",
            fontFamily: "inherit",
            themeCSS: "margin: 1.5rem auto 0;",
            theme: isDark ? "dark" : "default",
          });
          return mermaid.render(
            // `:` is not valid in an id attribute
            id.replaceAll(":", ""),
            chart.replaceAll("\\n", "\n"),
          );
        });
        setSvg(rendered.svg);
      } catch (error) {
        console.error("Error while rendering mermaid", error);
      }
    }
  }, [chart, id, isVisible]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: svg }} />;
}
