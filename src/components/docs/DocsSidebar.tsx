"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

interface NavItem {
  title: string;
  href: string;
  children?: { title: string; href: string }[];
}

interface DocConfig {
  basePath: string;
  title: string;
  overviewLabel: string;
  items: NavItem[];
}

const docsConfig: Record<string, DocConfig> = {
  "notes-api": {
    basePath: "/docs/notes-api",
    title: "Notes API yaratish",
    overviewLabel: "Umumiy",
    items: [
      { title: "Kirish", href: "/docs/notes-api" },
      {
        title: "Kirish",
        href: "/docs/notes-api/kirish",
        children: [
          { title: "Nimalar kerak?", href: "/docs/notes-api/kirish#nimalar-kerak" },
          { title: "Nima qilamiz?", href: "/docs/notes-api/kirish#nima-qilamiz" },
          { title: "Loyihani boshlash", href: "/docs/notes-api/kirish#loyihani-boshlash" },
        ],
      },
      {
        title: "Loyiha tuzilishi",
        href: "/docs/notes-api/loyiha-tuzilishi",
        children: [
          { title: "Papkalar", href: "/docs/notes-api/loyiha-tuzilishi#papkalar" },
          { title: "Har bir papkaning vazifasi", href: "/docs/notes-api/loyiha-tuzilishi#har-bir-papkaning-vazifasi" },
          { title: "Asosiy fayl", href: "/docs/notes-api/loyiha-tuzilishi#asosiy-fayl" },
        ],
      },
      {
        title: "MongoDB",
        href: "/docs/notes-api/mongodb",
        children: [
          { title: "MongoDB ga ulanish", href: "/docs/notes-api/mongodb#mongodb-ga-ulanish" },
          { title: "Model yaratish", href: "/docs/notes-api/mongodb#model-yaratish" },
          { title: "Model bilan ishlash", href: "/docs/notes-api/mongodb#model-bilan-ishlash" },
        ],
      },
      {
        title: "Controller",
        href: "/docs/notes-api/controller",
        children: [
          { title: "Controller yaratish", href: "/docs/notes-api/controller#controller-yaratish" },
          { title: "Har bir funksiya", href: "/docs/notes-api/controller#har-bir-funksiya-nima-qiladi" },
          { title: "Xatolarni ushlash", href: "/docs/notes-api/controller#xatolarni-ushlash" },
        ],
      },
      {
        title: "API",
        href: "/docs/notes-api/api",
        children: [
          { title: "Route yaratish", href: "/docs/notes-api/api#route-yaratish" },
          { title: "API ni tekshirish", href: "/docs/notes-api/api#api-ni-tekshirish" },
          { title: "Xulosa", href: "/docs/notes-api/api#xulosa" },
        ],
      },
    ],
  },
  "example-doc": {
    basePath: "/docs/example-doc",
    title: "Example Documentation",
    overviewLabel: "Overview",
    items: [
      { title: "Overview", href: "/docs/example-doc" },
      {
        title: "Introduction",
        href: "/docs/example-doc/introduction",
        children: [
          { title: "What is This?", href: "/docs/example-doc/introduction#what-is-this" },
          { title: "Why Use It?", href: "/docs/example-doc/introduction#why-use-it" },
          { title: "Quick Example", href: "/docs/example-doc/introduction#quick-example" },
        ],
      },
      {
        title: "Getting Started",
        href: "/docs/example-doc/getting-started",
        children: [
          { title: "Prerequisites", href: "/docs/example-doc/getting-started#prerequisites" },
          { title: "Installation", href: "/docs/example-doc/getting-started#installation" },
          { title: "Basic Setup", href: "/docs/example-doc/getting-started#basic-setup" },
          { title: "First Steps", href: "/docs/example-doc/getting-started#first-steps" },
        ],
      },
      {
        title: "Features",
        href: "/docs/example-doc/features",
        children: [
          { title: "Core Features", href: "/docs/example-doc/features#core-features" },
          { title: "Advanced Features", href: "/docs/example-doc/features#advanced-features" },
        ],
      },
      {
        title: "API Reference",
        href: "/docs/example-doc/api-reference",
        children: [
          { title: "Methods", href: "/docs/example-doc/api-reference#methods" },
          { title: "Events", href: "/docs/example-doc/api-reference#events" },
          { title: "Configuration", href: "/docs/example-doc/api-reference#configuration" },
          { title: "Error Codes", href: "/docs/example-doc/api-reference#error-codes" },
        ],
      },
    ],
  },
};

export function DocsSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  // Determine which doc collection we're in
  const currentDoc = useMemo(() => {
    for (const [key, config] of Object.entries(docsConfig)) {
      if (pathname.startsWith(config.basePath)) {
        return { key, config };
      }
    }
    return null;
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!currentDoc) return;
    const currentSection = currentDoc.config.items.find(
      (item) => item.children && pathname.startsWith(item.href.split("#")[0])
    );
    if (currentSection) {
      setExpanded((prev) => new Set([...prev, currentSection.href]));
    }
  }, [pathname, currentDoc]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && isOpen && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (!currentDoc) return false;
    const basePath = href.split("#")[0];
    if (basePath === currentDoc.config.basePath) {
      return pathname === currentDoc.config.basePath;
    }
    return pathname.startsWith(basePath);
  };

  const toggleExpand = (href: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(href)) {
        next.delete(href);
      } else {
        next.add(href);
      }
      return next;
    });
  };

  const closeSidebarOnMobile = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  if (!mounted || !currentDoc) return null;

  const { config } = currentDoc;

  const sidebarContent = (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`docs-toggle-fixed p-2 rounded-r-lg border border-l-0 transition-all duration-300 ${
          isOpen
            ? "bg-[#282828] border-[#3c3836] text-[#a89984] hover:text-[#fabd2f] hover:bg-[#3c3836]"
            : "bg-[#ebdbb2] border-[#d5c4a1] text-[#282828] hover:bg-[#fabd2f]"
        }`}
        style={{ left: isOpen ? "14rem" : "0" }}
        aria-label={isOpen ? "Close" : "Open"}
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {isOpen && (
        <div
          className="lg:hidden bg-black/50"
          style={{ position: "fixed", inset: 0, zIndex: 39 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`docs-sidebar-fixed w-56 bg-[#1d2021]/95 backdrop-blur-sm border-r border-[#3c3836] transition-transform duration-300 ease-in-out ${
          isOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="h-full overflow-y-auto px-3 pt-20 pb-6">
          <div className="mb-4 pb-3 border-b border-[#3c3836]">
            <Link
              href={config.basePath}
              className="text-sm font-semibold text-[#fabd2f] hover:text-[#fe8019] transition-colors"
            >
              {config.title}
            </Link>
          </div>

          <nav className="space-y-0.5">
            {config.items.map((item, index) => (
              <div key={item.href}>
                {index === config.items.length - 1 && config.items.length > 1 && (
                  <div className="my-3 border-t border-[#3c3836]/50" />
                )}

                {item.children ? (
                  <button
                    onClick={() => toggleExpand(item.href)}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-sm transition-all ${
                      isActive(item.href)
                        ? "text-[#fabd2f] font-medium"
                        : "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]/50"
                    }`}
                  >
                    <span>{item.title}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        expanded.has(item.href) ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={closeSidebarOnMobile}
                    className={`block px-2 py-1.5 rounded text-sm transition-all ${
                      isActive(item.href)
                        ? "bg-[#fabd2f]/10 text-[#fabd2f] font-medium border-l-2 border-[#fabd2f] pl-1.5"
                        : "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]/50"
                    }`}
                  >
                    {item.title}
                  </Link>
                )}

                {item.children && expanded.has(item.href) && (
                  <div className="ml-2 mt-0.5 pl-2 border-l border-[#3c3836]/50 space-y-0.5">
                    <Link
                      href={item.href}
                      onClick={closeSidebarOnMobile}
                      className={`block px-2 py-1 rounded text-xs transition-all ${
                        pathname === item.href.split("#")[0]
                          ? "text-[#fabd2f]"
                          : "text-[#928374] hover:text-[#ebdbb2]"
                      }`}
                    >
                      {config.overviewLabel}
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={closeSidebarOnMobile}
                        className="block px-2 py-1 rounded text-xs text-[#928374] hover:text-[#ebdbb2] transition-all"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-6 pt-3 border-t border-[#3c3836]">
            <Link
              href="/docs"
              className="flex items-center gap-1.5 text-xs text-[#928374] hover:text-[#83a598] transition-colors"
            >
              <ChevronLeft size={14} />
              All Docs
            </Link>
          </div>
        </div>
      </aside>
    </>
  );

  return createPortal(sidebarContent, document.body);
}
