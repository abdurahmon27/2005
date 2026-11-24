import Link from "next/link";
import React from "react";

const LINK =
  "text-[#83a598] underline decoration-dotted underline-offset-[3px] transition-colors hover:text-[#8ec07c]";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-12 sm:px-8">
      <header className="mb-8">
        <h1 className="mb-3 text-[clamp(1.6rem,3vw,2.1rem)] leading-tight text-[#fe8019]">
          {title}
        </h1>
        <p className="font-mono text-[0.75rem] text-[#7c6f64]">{updated}</p>
      </header>
      {children}
    </div>
  );
}

export function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-[#32302f] py-6">
      <h2 className="mb-3 text-[1.1rem] text-[#fabd2f]">{title}</h2>
      <div className="space-y-3 text-[0.92rem] leading-relaxed text-[#d5c4a1]">
        {children}
      </div>
    </section>
  );
}

export function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={LINK}>
      {children}
    </a>
  );
}

export function Local({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={LINK}>
      {children}
    </Link>
  );
}

export function Lang({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="mb-2 mt-12 border-t-2 border-[#fe8019] pt-4 font-mono text-[0.8rem] uppercase tracking-widest text-[#fe8019]"
    >
      {children}
    </h2>
  );
}

export const EMAIL = "bekzotovich12@gmail.com";
