import { Footer, Layout, Navbar } from "nextra-theme-blog";
import { Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import Link from "next/link";
import "./nextra.css";

export const metadata = {
  title: "Bekzotovich",
  description: "MDX-based blog posts",
};

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageMap = await getPageMap("/blog");

  return (
    <div className="nextra-blog-container">
      <Layout>
        <Navbar pageMap={pageMap}>
          <Link href="/" className="font-bold text-lg">
            Bekzotovich
          </Link>
          <Search />
        </Navbar>
        {children}
        <Footer>
          <Link href="/">Home</Link>
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
