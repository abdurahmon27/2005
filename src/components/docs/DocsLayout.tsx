"use client";

import { DocsSidebar } from "./DocsSidebar";
import { GiscusComments } from "@/components/shared";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="docs-layout relative">
      <DocsSidebar />
      <main className="docs-main">
        {children}
        <div className="mt-12 pt-8 border-t border-[#3c3836]">
          <GiscusComments />
        </div>
      </main>
    </div>
  );
}
