"use client";

import { DocsSidebar } from "./DocsSidebar";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="docs-layout relative">
      <DocsSidebar />
      <main className="docs-main">{children}</main>
    </div>
  );
}
