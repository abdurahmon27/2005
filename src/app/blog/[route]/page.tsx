import { BlogPage } from "../_components/BlogPage";

interface BlogPostPageProps {
  params: Promise<{
    route: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  return <BlogPage slug={resolvedParams.route} />;
}
