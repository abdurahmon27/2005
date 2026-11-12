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
    id: "botxona",
    title: "botxona",
    description:
      "Telegram bot hosting for Uzbekistan. Writing a bot takes a day; keeping it running still asks for a VPS, Docker and a foreign card, so most bots die when the laptop closes. On Botxona you drop in a zip or connect a GitHub repo, it gets checked, and it runs in its own container with nightly backups and analytics. The panel is in Uzbek and billing is in so'm. I built it to grow an audience for my channel, and it turned into a small paying business: its first month brought 96 users, 71 bots and the first paying customers, with nothing spent on ads, because most people found it by asking an AI.",
    tags: ["Go", "Docker", "Telegram", "Infra", "SaaS"],
    links: [
      { label: "botxona.uz", href: "https://botxona.uz" },
      { label: "@botxona_uz_bot", href: "https://t.me/botxona_uz_bot" },
      { label: "lab note", href: "/lab/ideas/botxona" },
    ],
  },
  {
    id: "slaydxona",
    title: "slaydxona",
    description:
      "An AI presentation generator for students in Uzbekistan: type a topic, get a .pptx that's ready for class, with a proper university title slide, correct Uzbek and real sources. The templates come from 201 real student decks I analysed, so it doesn't look AI-made. It's honestly an audience machine: the first deck is free once you join my channel, and paid decks cover the AI bill and then some. Over a thousand students have used it.",
    tags: ["Python", "aiogram", "FastAPI", "Claude", "PPTX"],
    links: [
      { label: "umbra.uz", href: "https://umbra.uz" },
      { label: "@slaydxona_bot", href: "https://t.me/slaydxona_bot" },
      { label: "lab note", href: "/lab/ideas/slaydxona" },
    ],
  },
  {
    id: "yamu",
    title: "yamu",
    description:
      "Yandex Music has no public API and its endpoints refuse cross-origin calls, so nobody could put their playlist on a portfolio the way Spotify users do. yamu collects it in a scheduled GitHub Action inside your own repository and commits static JSON and an SVG card. The whole setup is one playlist link — no login, no token, no hosted service, and nothing of yours stored anywhere but your own repo. The playlist in my lab note about it is the first thing using it.",
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
