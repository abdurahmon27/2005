"use client";

import { useState, useEffect, useRef } from "react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    observer.current = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, current) =>
            prev.boundingClientRect.top < current.boundingClientRect.top
              ? prev
              : current
          );
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    headingElements.forEach((el) => {
      if (el && observer.current) {
        observer.current.observe(el);
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [items]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <>
      {/* Mobile TOC Toggle Button */}
      <div className="lg:hidden fixed top-24 right-4 z-[150]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-secondary border border-muted rounded-lg p-3 shadow-lg hover:bg-muted transition-colors backdrop-blur-sm"
          aria-label="Toggle table of contents"
        >
          <svg
            className={`w-5 h-5 text-primary transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Desktop TOC */}
      <div className="hidden lg:block absolute right-[5rem] top-[20rem] -translate-y-1/2 w-64 z-[150]">
        <div className="bg-secondary/95 backdrop-blur-sm border border-muted rounded-lg shadow-lg max-h-[70vh] overflow-y-auto">
          <div className="p-4 border-b border-muted">
            <h3 className="font-semibold text-primary text-sm font-mono flex items-center gap-2">
              <span>::</span>
              <span>Table of Contents</span>
            </h3>
          </div>
          <nav className="p-2">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToHeading(item.id)}
                    className={`w-full text-left px-3 py-2 rounded text-sm font-mono transition-colors ${
                      activeId === item.id
                        ? "bg-accent/20 text-accent border-l-2 border-accent"
                        : "text-foreground hover:bg-muted hover:text-primary"
                    }`}
                    style={{
                      paddingLeft: `${0.75 + (item.level - 1) * 0.75}rem`,
                    }}
                  >
                    <span className="text-muted mr-2">
                      {"#".repeat(item.level)}
                    </span>
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile TOC Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm">
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-secondary/95 backdrop-blur-sm border-l border-muted shadow-xl overflow-y-auto">
            <div className="p-4 border-b border-muted flex items-center justify-between">
              <h3 className="font-semibold text-primary text-sm font-mono flex items-center gap-2">
                <span>::</span>
                <span>Table of Contents</span>
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-primary transition-colors"
                aria-label="Close table of contents"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToHeading(item.id)}
                      className={`w-full text-left px-3 py-3 rounded text-sm font-mono transition-colors ${
                        activeId === item.id
                          ? "bg-accent/20 text-accent border-l-2 border-accent"
                          : "text-foreground hover:bg-muted hover:text-primary"
                      }`}
                      style={{
                        paddingLeft: `${0.75 + (item.level - 1) * 0.75}rem`,
                      }}
                    >
                      <span className="text-muted mr-2">
                        {"#".repeat(item.level)}
                      </span>
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
