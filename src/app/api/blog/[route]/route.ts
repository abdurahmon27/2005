/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
// @ts-nocheck - Disable TypeScript checking for this file
import { getPageByRoute, getPageContent } from "@/utils/notion";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  try {
    const params = await context.params;
    const route = params.route;
    
    // Get page by route
    const page = await getPageByRoute(route);
    
    if (!page) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    
    // Get page content
    const blocks = await getPageContent(page.id);
    const readingTime = calculateReadingTime(blocks);
    
    const properties = page.properties;
    const post = {
      id: page.id,
      title: properties.title?.title[0]?.text.content || "Untitled",
      publish_date: properties.publish_date?.date?.start,
      tags: properties.tags?.multi_select?.map((tag) => tag.name) || [],
      thumb: properties.thumb?.files?.[0]?.file?.url || null,
      blocks: blocks,
      readingTime
    };
    
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
  }
}

function calculateReadingTime(blocks) {
  let totalWords = 0;

  const countWordsInContent = (content) => {
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

  return Math.ceil(totalWords / 200) || 1;
}