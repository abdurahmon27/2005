import type { Metadata } from "next";

import { LogView } from "./_components/log-view";

export const metadata: Metadata = {
  title: "Log | Haywan",
  description: "A running log — written in Notion, rendered here.",
};

export default function LogPage() {
  return <LogView />;
}
