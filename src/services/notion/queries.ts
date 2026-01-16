import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";
import { NotionClient } from "./client";
import {
  parseBlockForRendering,
  extractPreview,
  calculateReadingTime,
} from "./parsers";
import { NOTION_DATABASE_ID } from "@/lib/constants";

export interface LogPageData {
  id: string;
  title: string;
  route: string;
  publish_date: string;
  tags: string[];
  thumb?: string;
  preview?: string;
  readingTime?: number;
  content?: any[];
  blocks?: any[];
}

const getPageContent = cache(async (pageId: string) => {
  const blocks = await NotionClient.blocks.children
    .list({
      block_id: pageId,
    })
    .then((res) => res.results as BlockObjectResponse[]);

  return blocks.map(parseBlockForRendering);
});

export async function getLogPage(): Promise<LogPageData | null> {
  try {
    const response = await NotionClient.databases.query({
      database_id: NOTION_DATABASE_ID as string,
      filter: {
        property: "route",
        rich_text: {
          equals: "log",
        },
      },
    });

    if (!response.results.length) {
      return null;
    }

    const pageData = response.results[0] as PageObjectResponse;
    const properties = pageData.properties as any;

    const logPage = {
      id: pageData.id,
      title: properties.title?.title[0]?.text.content || "Log",
      route: properties.route?.rich_text[0]?.text.content || "log",
      publish_date: properties.publish_date?.date?.start || null,
      tags: properties.tags?.multi_select?.map((tag: any) => tag.name) || [],
      thumb: properties.thumb?.files?.[0]?.file?.url || null,
    };

    const content = await getPageContent(logPage.id);
    const preview = extractPreview(content);
    const readingTime = calculateReadingTime(content);

    return {
      ...logPage,
      preview,
      readingTime,
      content,
      blocks: content,
    };
  } catch (error) {
    console.error("Error fetching Log page:", error);
    return null;
  }
}
