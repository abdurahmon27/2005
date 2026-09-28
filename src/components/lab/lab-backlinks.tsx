"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type BacklinkEntry = { href: string; title: string; description: string };

/** entries is keyed by note href, built once on the server. */
export function LabBacklinks({
  entries,
}: {
  entries: Record<string, BacklinkEntry[]>;
}) {
  const pathname = (usePathname() || "/lab").replace(/\/$/, "") || "/lab";
  if (pathname.startsWith("/lab/tags")) return null;

  const links = entries[pathname] ?? [];

  return (
    <section aria-labelledby="lab-backlinks-heading">
      <div className="lab-section-head">
        <h2 id="lab-backlinks-heading" className="lab-section-title">
          backlinks
        </h2>
      </div>
      {links.length === 0 ? (
        <p className="lab-empty">none yet</p>
      ) : (
        <ul className="lab-backlinks">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
