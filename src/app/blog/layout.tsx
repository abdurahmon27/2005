import { ReactQueryProvider } from "./_components/ReactQueryProvider";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
