import { QueryProvider } from "@/providers";

export default function LogLayout({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
