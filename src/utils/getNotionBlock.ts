import { NOTION_API_KEY } from "@/constants";

export async function getNotionBlock(blockId: string) {
  const response = await fetch(`https://api.notion.com/v1/blocks/${blockId}`, {
    headers: {
      Authorization: `${NOTION_API_KEY}`,
      "Notion-Version": "2022-06-28",
    },
  });
  return response.json();
}
