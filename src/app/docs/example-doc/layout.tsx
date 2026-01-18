import { DocsLayout } from "@/components/docs";

export const metadata = {
  title: "Example Documentation | Haywan",
  description: "Example documentation with lorem ipsum content",
};

export default function ExampleDocLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayout>{children}</DocsLayout>;
}
