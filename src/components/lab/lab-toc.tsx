"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Heading = { id: string; text: string; depth: number };

/** Reads the headings straight out of the rendered MDX — no per-page wiring. */
export function LabToc() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const article = document.querySelector(".lab-prose");
    if (!article) return;

    const found = [...article.querySelectorAll<HTMLElement>("h2[id], h3[id]")].map(
      (element) => ({
        id: element.id,
        text: element.textContent?.replace(/#$/, "").trim() ?? "",
        depth: element.tagName === "H2" ? 2 : 3,
      })
    );
    setHeadings(found);
    setActiveId(found[0]?.id ?? "");

    if (found.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: [0, 1] }
    );

    for (const heading of found) {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [pathname]);

  if (headings.length === 0) return null;

  return (
    <section aria-labelledby="lab-toc-heading">
      <div className="lab-section-head">
        <h2 id="lab-toc-heading" className="lab-section-title">
          contents
        </h2>
      </div>
      <ul className="lab-toc">
        {headings.map((heading) => (
          <li key={heading.id} data-depth={heading.depth}>
            <a href={`#${heading.id}`} data-active={activeId === heading.id}>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
