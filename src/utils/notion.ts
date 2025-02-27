import { NOTION_API_KEY, NOTION_DATABASE_ID } from "@/constants";
import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";
import { revalidatePath } from "next/cache";

export const NotionClient = new Client({
  auth: NOTION_API_KEY,
});

export type PageData = {
  id: string;
  title: string;
  route: string;
  publish_date: string;
  published: boolean;
  tags: string[];
  thumb: string;
};

export const getPages = cache(
  async (published?: boolean, revalidate = false): Promise<PageData[]> => {
    if (revalidate) {
      revalidatePath("/");
      revalidatePath("/blog");
    }

    const response = await NotionClient.databases.query({
      database_id: NOTION_DATABASE_ID as string,
      filter:
        published !== undefined
          ? {
              property: "published",
              checkbox: { equals: published },
            }
          : undefined,
      sorts: [{ property: "route", direction: "ascending" }],
    });

    return response.results.map((page) => {
      const pageData = page as PageObjectResponse;
      const properties = pageData.properties as any;

      return {
        id: pageData.id,
        title: properties.title?.title[0]?.text.content || "",
        route: properties.route?.rich_text[0]?.text.content || "",
        publish_date: properties.publish_date?.date?.start || null,
        published: properties.published?.checkbox || false,
        tags: properties.tags?.multi_select?.map((tag: any) => tag.name) || [],
        thumb: properties.thumb?.files?.[0]?.file?.url || null,
      };
    });
  }
);

type ParsedBlock = {
  id: string;
  type: string;
  content: string | ParsedBlock[];
  annotations?: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  href?: string | null;
};

export const getPageContent = cache(
  async (pageId: string, revalidate = false) => {
    if (revalidate) {
      revalidatePath(`/[route]`);
    }

    const blocks = await NotionClient.blocks.children
      .list({
        block_id: pageId,
      })
      .then((res) => res.results as BlockObjectResponse[]);

    return blocks.map(parseBlockForRendering);
  }
);

function parseBlockForRendering(block: BlockObjectResponse): ParsedBlock {
  const { id, type } = block;

  switch (type) {
    case "paragraph":
      return {
        id,
        type,
        content: block.paragraph.rich_text.map(parseRichText),
      };
    case "heading_1":
      return {
        id,
        type,
        content: block.heading_1.rich_text.map(parseRichText),
      };
    case "heading_2":
      return {
        id,
        type,
        content: block.heading_2.rich_text.map(parseRichText),
      };
    case "heading_3":
      return {
        id,
        type,
        content: block.heading_3.rich_text.map(parseRichText),
      };
    case "bulleted_list_item":
      return {
        id,
        type,
        content: block.bulleted_list_item.rich_text.map(parseRichText),
      };
    case "numbered_list_item":
      return {
        id,
        type,
        content: block.numbered_list_item.rich_text.map(parseRichText),
      };
    case "to_do":
      return {
        id,
        type,
        content: block.to_do.rich_text.map(parseRichText),
        checked: block.to_do.checked,
      } as any;
    case "image":
      return {
        id,
        type,
        content:
          block.image.type === "file"
            ? block.image.file.url
            : block.image.external.url,
        caption: block.image.caption?.map(parseRichText) || [],
      } as any;
    case "code":
      return {
        id,
        type,
        content: block.code.rich_text.map(parseRichText),
        language: block.code.language,
      } as any;
    default:
      return {
        id,
        type,
        content: "",
      };
  }
}

function parseRichText(richText: any): ParsedBlock {
  return {
    id: richText.plain_text,
    type: "text",
    content: richText.plain_text,
    annotations: richText.annotations,
    href: richText.href,
  };
}

export const getPageByRoute = async (route: string, revalidate = false) => {
  if (revalidate) {
    revalidatePath(`/${route}`);
  }

  return NotionClient.databases
    .query({
      database_id: NOTION_DATABASE_ID as string,
      filter: {
        property: "route",
        rich_text: {
          equals: route,
        },
      },
    })
    .then((res) => res.results[0] as PageObjectResponse);
};

export async function handleNotionWebhook(req: any, res: any) {
  const { pageId } = req.body;

  revalidatePath("/");
  revalidatePath("/blog");

  return res.status(200).json({ message: "Revalidation triggered" });
}
