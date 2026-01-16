import { Client } from "@notionhq/client";
import { NOTION_API_KEY } from "@/lib/constants";

export const NotionClient = new Client({
  auth: NOTION_API_KEY || "",
});
