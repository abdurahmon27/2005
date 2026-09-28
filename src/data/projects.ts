export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    id: "shoshshi",
    title: "shoshshi",
    description:
      "A Telegram Mini App that pairs two strangers for a live voice conversation — no text chat, and company rather than dating. You filter by age, gender and language, skip whenever you want, and swap Telegram contacts only through a mutual-consent handshake.",
    tags: ["TypeScript", "Telegram Mini App", "WebRTC", "Fastify", "Postgres"],
    links: [
      { label: "@shoshshi_bot", href: "https://t.me/shoshshi_bot" },
      { label: "shoshshi.haywan.uz", href: "https://shoshshi.haywan.uz" },
    ],
  },
];
