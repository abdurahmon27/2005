import { getPages, getPageContent } from "@/utils/notion";

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
}

/**
 * Fetch the Log page regardless of its published status
 * @returns Promise<LogPageData | null>
 */
export async function getLogPage(): Promise<LogPageData | null> {
  try {
    // Get all pages without published filter (published = undefined)
    const allPages = await getPages(undefined);
    
    // Find the Log page
    const logPage = allPages.find(
      (post) => post.route === "log" || post.title.toLowerCase().includes("log")
    );

    if (!logPage) {
      return null;
    }

    // Get the content for the Log page
    const content = await getPageContent(logPage.id);
    const preview = extractPreview(content);
    const readingTime = calculateReadingTime(content);

    return {
      ...logPage,
      preview,
      readingTime,
      content,
    };
  } catch (error) {
    console.error("Error fetching Log page:", error);
    return null;
  }
}

// Helper functions
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
