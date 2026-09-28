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
    id: "yamu",
    title: "yamu",
    description:
      "Yandex Music has no public API and its endpoints refuse cross-origin calls, so nobody could put their playlist on a portfolio the way Spotify users do. yamu collects the data in a scheduled GitHub Action inside your own repository and commits it as static JSON and an SVG card — no hosted service, and nobody's token is stored anywhere but their own repo.",
    tags: ["TypeScript", "GitHub Action", "SVG", "Open Source"],
    links: [
      { label: "github.com/abdurahmon27/yamu", href: "https://github.com/abdurahmon27/yamu" },
    ],
  },
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
