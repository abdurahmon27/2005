export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Qulay Makon",
    description:
      "an e-commerce website for a company that provides equipment for creating accessible physical environments for people with disabilities.",
    tags: ["Next.js", "TypeScript", "MongoDB"],
    link: "https://qulaymakon.uz",
  },
  {
    id: "2",
    title: "IlmTown",
    description: "Landing page for an educational center",
    tags: ["React", "TypeScript"],
    link: "https://ilmtown.uz",
  },
];
