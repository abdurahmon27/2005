import { DocsLayout } from "@/components/docs";

export const metadata = {
  title: "Notes API | Haywan",
  description: "Express.js va MongoDB bilan Notes API yaratish",
};

export default function NotesApiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayout>{children}</DocsLayout>;
}
