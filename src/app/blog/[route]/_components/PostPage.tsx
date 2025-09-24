import { BlogPage } from "../../_components/BlogPage";

interface PostPageProps {
  params: { route: string };
}

export default function BlogPostPage({ params }: PostPageProps) {
  return <BlogPage slug={params.route} />;
}
