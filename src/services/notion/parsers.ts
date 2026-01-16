import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type ParsedBlock = {
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
  checked?: boolean;
  videoUrl?: string;
  caption?: ParsedBlock[];
  language?: string;
};

export function parseBlockForRendering(block: BlockObjectResponse): ParsedBlock {
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
    case "video":
      return {
        id,
        type,
        content: "",
        videoUrl:
          block.video.type === "file"
            ? block.video.file.url
            : block.video.external.url,
        caption: block.video.caption?.map(parseRichText) || [],
      } as any;
    case "divider":
      return {
        id,
        type,
        content: "",
      } as any;
    default:
      return {
        id,
        type,
        content: "",
      };
  }
}

export function parseRichText(richText: any): ParsedBlock {
  return {
    id: richText.plain_text,
    type: "text",
    content: richText.plain_text,
    annotations: richText.annotations,
    href: richText.href,
  };
}

export function extractPreview(blocks: any[], maxLength = 150): string {
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

export function calculateReadingTime(blocks: any[]): number {
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
