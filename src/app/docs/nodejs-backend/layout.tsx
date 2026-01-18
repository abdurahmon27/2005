import { DocsLayout } from "@/components/docs";

export const metadata = {
  title: "Node.js Backend (O'zbek) | Haywan",
  description: "Node.js yordamida backend dasturlash bo'yicha to'liq qo'llanma",
};

export default function NodejsBackendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayout>{children}</DocsLayout>;
}
