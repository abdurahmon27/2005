import { ReactQueryProvider } from "../blog/_components/ReactQueryProvider";

export default function LogLayout({ children }: { children: React.ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
