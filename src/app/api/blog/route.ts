import { getPages, getPageContent } from "@/utils/notion";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const published = url.searchParams.get("published") === "true";
    
    const posts = await getPages(published);
    
    const postsWithExtras = await Promise.all(
      posts.map(async (post) => {
        const content = await getPageContent(post.id);
        const preview = extractPreview(content);
        const readingTime = calculateReadingTime(content);

        return {
          ...post,
          preview,
          readingTime,
        };
      }),
    );

    const sortedPosts = [...postsWithExtras].sort((a, b) => {
      return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
    });

    return NextResponse.json(sortedPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

function extractPreview(blocks: any[], maxLength = 150): string {
  let preview = "";

  for (const block of blocks) {
    if (block.type === "paragraph" && Array.isArray(block.content)) {
      for (const textBlock of block.content) {
        if (textBlock.type === "text") {
          preview += textBlock.content + " ";
          if (preview.length >= maxLength) {
            return preview.slice(0, maxLength) + "...";
          }
        }
      }
    }
  }

  return preview.length > 0 ? preview + "..." : "No preview available";
}

function calculateReadingTime(blocks: any[]): number {
  let totalWords = 0;

  const countWordsInContent = (content: any): number => {
    if (typeof content === "string") {
      return content.split(/\s+/).length;
    } else if (Array.isArray(content)) {
      return content.reduce((sum, item) => {
        if (typeof item === "object" && item.content) {
          return sum + countWordsInContent(item.content);
        }
        return sum;
      }, 0);
    }
    return 0;
  };

  blocks.forEach((block) => {
    totalWords += countWordsInContent(block.content);
  });

  const minutes = Math.ceil(totalWords / 200);
  return minutes > 0 ? minutes : 1;
}