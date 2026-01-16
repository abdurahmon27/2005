export interface Achievement {
  role: string;
  org: string;
  href: string;
}

export const achievements: Achievement[] = [
  { role: "Software Engineer at", org: "@numeo", href: "https://numeo.ai" },
  { role: "ex mentor at", org: "@teamituz", href: "https://teamit.uz" },
  {
    role: "Gopher Uzbekistan Chairman at",
    org: "@flossuz",
    href: "https://floss.uz",
  },
];
