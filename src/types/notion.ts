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
