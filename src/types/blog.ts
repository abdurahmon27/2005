export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export interface Post {
  id: string;
  title: string;
  route: string;
  publish_date: string;
  tags: string[];
  thumb?: string;
  preview?: string;
  readingTime?: number;
}
