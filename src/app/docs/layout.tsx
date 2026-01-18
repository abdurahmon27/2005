import { Footer, Layout, Navbar } from "nextra-theme-blog";
import { Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import Link from "next/link";
import "./nextra-docs.css";

export const metadata = {
  title: "Documentation | Haywan",
  description: "Documentation and learning resources",
};

export default async function DocsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageMap = await getPageMap("/docs");

  return (
    <div className="nextra-docs-container">
      <Layout>
        <Navbar pageMap={pageMap}>
          <Search />
        </Navbar>
        {children}
        <Footer>
          <Link href="/">Home</Link>
          <span> | </span>
          <Link href="/blog">Blog</Link>
          <span> | </span>
          <Link
            href="https://t.me/abdurahmon_mamadiyorov"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram
          </Link>
        </Footer>
      </Layout>
    </div>
  );
}
