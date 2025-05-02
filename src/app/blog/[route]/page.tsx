import ClientPostPage from "./_components/ClientPostPage";

interface PostPageProps {
  params: Promise<{
    route: string;
  }>;
}

const PostPage = async ({ params }: PostPageProps) => {
  const { route } = await params;
  return <ClientPostPage route={route} />;
};

export default PostPage;
