"use client";

import React from "react";
import Image from "next/image";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import ShikiCodeBlock from "../../blog/[route]/_components/CodeBlock";
import { LogPageData } from "@/utils/getLogPage";

interface TextContent {
  content: string;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
    color?: string;
  };
  href?: string | null;
}

interface BlockContent {
  id: string;
  type: string;
  content: TextContent[] | string;
  caption?: TextContent[];
  checked?: boolean;
  videoUrl?: string;
  language?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface BlockProps {
  block: BlockContent;
}

interface TextBlockProps {
  text: TextContent;
}

const TextRenderer: React.FC<TextBlockProps> = ({ text }) => {
  if (!text) return null;

  const { content, annotations, href } = text;

  let component = <span>{content}</span>;

  if (annotations?.bold) component = <strong>{component}</strong>;
  if (annotations?.italic) component = <em>{component}</em>;
  if (annotations?.underline) component = <u>{component}</u>;
  if (annotations?.strikethrough) component = <s>{component}</s>;
  if (annotations?.code)
    component = (
      <code className="bg-muted px-1 py-0.5 rounded text-sm">{component}</code>
    );

  if (href)
    return (
      <a href={href} className="text-primary hover:underline">
        {component}
      </a>
    );

  return component;
};

const TextContent: React.FC<{ content: TextContent[] }> = ({ content }) => {
  return (
    <>
      {content.map((text, index) => (
        <TextRenderer key={index} text={text} />
      ))}
    </>
  );
};

const ParagraphBlock: React.FC<BlockProps> = ({ block }) => (
  <p className="my-4 leading-relaxed">
    <TextContent content={block.content as TextContent[]} />
  </p>
);

const HeadingOneBlock: React.FC<BlockProps> = ({ block }) => (
  <h1 id={block.id} className="text-3xl font-bold mt-8 mb-4">
    <TextContent content={block.content as TextContent[]} />
  </h1>
);

const HeadingTwoBlock: React.FC<BlockProps> = ({ block }) => (
  <h2 id={block.id} className="text-2xl font-bold mt-6 mb-3">
    <TextContent content={block.content as TextContent[]} />
  </h2>
);

const HeadingThreeBlock: React.FC<BlockProps> = ({ block }) => (
  <h3 id={block.id} className="text-xl font-semibold mt-5 mb-2">
    <TextContent content={block.content as TextContent[]} />
  </h3>
);

const BulletedListItemBlock: React.FC<BlockProps> = ({ block }) => (
  <li className="ml-6 my-1 list-disc">
    <TextContent content={block.content as TextContent[]} />
  </li>
);

const NumberedListItemBlock: React.FC<BlockProps> = ({ block }) => (
  <li className="ml-6 my-1 list-decimal">
    <TextContent content={block.content as TextContent[]} />
  </li>
);

const ImageBlock: React.FC<BlockProps> = ({ block }) => (
  <figure className="my-8 mx-auto rounded-md">
    <div className="overflow-hidden relative max-w-3xl mx-auto rounded-md">
      <div className="aspect-[16/9] relative rounded-md">
        <Image
          src={block.content as string}
          alt={block.caption?.[0]?.content || "Temporary page image"}
          fill
          className="rounded-md w-auto h-auto object-contain"
          priority={true}
        />
      </div>
    </div>
    {block.caption && block.caption.length > 0 && (
      <figcaption className="text-sm text-muted-foreground text-center mt-3">
        <TextContent content={block.caption} />
      </figcaption>
    )}
  </figure>
);

const DividerBlock: React.FC<BlockProps> = () => (
  <hr className="w-full border-t border-t-primary" />
);

const TodoBlock: React.FC<BlockProps> = ({ block }) => (
  <div className="flex items-start gap-2 my-2">
    <input type="checkbox" checked={block.checked} readOnly className="mt-1" />
    <div>
      <TextContent content={block.content as TextContent[]} />
    </div>
  </div>
);

const VideoBlock: React.FC<BlockProps> = ({ block }) => {
  if (!block.videoUrl) return <div>Loading video...</div>;

  const url = block.videoUrl;
  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|.+?v=))([^?&]+)/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
  };

  const embedUrl = isYouTube ? getYouTubeEmbedUrl(url) : url;

  return isYouTube ? (
    <div className="w-full flex items-center justify-center rounded-md min-h-full">
      <iframe
        width="650"
        height="490"
        src={embedUrl}
        className="w-full min-h-full rounded-md"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  ) : (
    <video controls width="100%">
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

const BlockRenderer: React.FC<BlockProps> = ({ block }) => {
  switch (block.type) {
    case "paragraph":
      return <ParagraphBlock block={block} />;
    case "heading_1":
      return <HeadingOneBlock block={block} />;
    case "heading_2":
      return <HeadingTwoBlock block={block} />;
    case "heading_3":
      return <HeadingThreeBlock block={block} />;
    case "bulleted_list_item":
      return <BulletedListItemBlock block={block} />;
    case "numbered_list_item":
      return <NumberedListItemBlock block={block} />;
    case "image":
      return <ImageBlock block={block} />;
    case "code":
      return <ShikiCodeBlock block={block} />;
    case "to_do":
      return <TodoBlock block={block} />;
    case "divider":
      return <DividerBlock block={block} />;
    case "video":
      return <VideoBlock block={block} />;
    default:
      return <div>Unsupported block type: {block.type}</div>;
  }
};

const GroupBlocks: React.FC<{ blocks: BlockContent[] }> = ({ blocks }) => {
  let currentListType: string | null = null;
  let result: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;

    result.push(
      currentListType === "bulleted_list_item" ? (
        <ul className="my-4" key={`list-${result.length}`}>
          {listItems}
        </ul>
      ) : (
        <ol className="my-4" key={`list-${result.length}`}>
          {listItems}
        </ol>
      )
    );
    listItems = [];
    currentListType = null;
  };

  blocks.forEach((block) => {
    if (
      block.type === "bulleted_list_item" ||
      block.type === "numbered_list_item"
    ) {
      if (currentListType && currentListType !== block.type) {
        flushList();
      }
      currentListType = block.type;
      listItems.push(<BlockRenderer key={block.id} block={block} />);
    } else {
      flushList();
      result.push(<BlockRenderer key={block.id} block={block} />);
    }
  });

  flushList();

  return <>{result}</>;
};

const ClientTemporary: React.FC = () => {
  const {
    data: pageData,
    error,
    isLoading,
  } = useSWR("/api/temporary", fetcher, {
    revalidateOnFocus: true,
    revalidateIfStale: true,
    refreshInterval: 60000, // Refresh every minute
  });

  if (error)
    return (
      <div className="text-center py-12">Failed to load temporary page</div>
    );

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Skeleton */}
          <div className="space-y-4 mb-8">
            <Skeleton className="h-12 w-3/4" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-6 w-20 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <Separator className="mb-8" />

          {/* Content Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-16 bg-muted/20 rounded-lg border border-dashed">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <FileText className="h-8 w-8 text-primary/70" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            No temporary page found
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            The temporary page is not available at the moment. Check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="space-y-6 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {pageData.title}
            </h1>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {pageData.publish_date && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(pageData.publish_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}

            {pageData.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{pageData.readingTime} min read</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {pageData.tags && pageData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {pageData.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Preview/Description */}
          {pageData.preview && (
            <Card className="bg-muted/30 border-primary/20">
              <CardHeader>
                <CardDescription className="text-base leading-relaxed">
                  {pageData.preview}
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>

        <Separator className="mb-8" />

        {/* Content Section */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <div className="space-y-4">
            {pageData.content && pageData.content.length > 0 && (
              <GroupBlocks blocks={pageData.content} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientTemporary;
