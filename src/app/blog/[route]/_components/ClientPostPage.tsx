/* eslint-disable no-console */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Calendar,
  ChevronLeft,
  Share2,
  Eye,
  Copy,
  Link as LinkIcon,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ShikiCodeBlock from "../_components/CodeBlock";
import { GiscusComponent } from "@/components/Giscus";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BlockProps {
  block: BlockContent;
}

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

interface TextBlockProps {
  text: TextContent;
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

interface PostData {
  id: string;
  title: string;
  publish_date: string;
  tags: string[];
  thumb: string | null;
  blocks: BlockContent[];
  readingTime: number;
}

interface Heading {
  id: string;
  level: number;
  content: string;
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
          alt={block.caption?.[0]?.content || "Blog post image"}
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
      return <div>{block.type}</div>;
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ClientPostPage = ({ route }: { route: string }) => {
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const {
    data: post,
    error,
    isLoading,
  } = useSWR<PostData>(`/api/blog/${route}`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // Deduping interval of 1 minute
  });

  // Calculate reading progress - moved outside of conditional rendering
  useEffect(() => {
    const updateReadingProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setReadingProgress(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100
        );
      }
    };

    window.addEventListener("scroll", updateReadingProgress);
    return () => window.removeEventListener("scroll", updateReadingProgress);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform?: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post?.title || "Read this article");

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          "_blank"
        );
        break;
      case "telegram":
        window.open(
          `https://t.me/share/url?url=${url}&text=${title}`,
          "_blank"
        );
        break;
      default:
        if (navigator.share) {
          navigator
            .share({
              title: post?.title,
              url: window.location.href,
            })
            .catch(console.error);
        } else {
          handleCopyLink();
        }
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center py-12 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-100 dark:border-red-900/30 text-primary">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
            <Eye className="h-8 w-8 text-red-500 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Unable to load post</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-4">
            There was an error loading this blog post. Please try again later.
          </p>
          <Link href="/blog">
            <Button variant="outline" className="mt-2">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Return to blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center mb-6">
          <Skeleton className="h-8 w-32" />
        </div>

        <div className="rounded-xl overflow-hidden mb-8 relative">
          <Skeleton className="aspect-video w-full" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <div className="flex gap-3 mb-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-28" />
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-6 w-16 rounded-full" />
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 mb-8">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-11/12" />
            <Skeleton className="h-6 w-10/12" />
            <Skeleton className="h-6 w-full" />
          </div>

          <Skeleton className="h-48 w-full rounded-lg mb-8" />

          <div className="space-y-4 mb-6">
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-11/12" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const { title, publish_date, tags, thumb, blocks, readingTime } = post;
  const hasImage = !!thumb;
  const publishDate = publish_date
    ? new Date(publish_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const headings: Heading[] = blocks
    .filter((block: BlockContent) =>
      ["heading_1", "heading_2", "heading_3"].includes(block.type)
    )
    .map((block: BlockContent) => {
      let level = 0;
      switch (block.type) {
        case "heading_1":
          level = 1;
          break;
        case "heading_2":
          level = 2;
          break;
        case "heading_3":
          level = 3;
          break;
      }

      const content = Array.isArray(block.content)
        ? block.content.map((item: TextContent) => item.content).join(" ")
        : "";

      return {
        id: block.id,
        level,
        content,
      };
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-primary/30 z-50"
        style={{ width: `${readingProgress}%` }}
      />

      <article className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/4">
            <Link
              href="/blog"
              className="inline-flex items-center mb-6 text-white hover:text-primary"
            >
              <Button
                variant="ghost"
                size="sm"
                className="group hover:bg-primary/5 hover:text-primary"
              >
                <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                Back to articles
              </Button>
            </Link>

            {hasImage ? (
              <div className="relative rounded-xl overflow-hidden mb-8 shadow-md">
                <div className="w-full aspect-[21/9] relative">
                  <Image
                    src={thumb}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white z-10">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tags.length > 0 &&
                        tags.map((tag: string) => (
                          <Badge
                            key={tag}
                            className="bg-white/20 text-white hover:bg-white/30 border-transparent backdrop-blur-sm"
                          >
                            {tag}
                          </Badge>
                        ))}
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
                      {title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 mt-4">
                      {publishDate && (
                        <div className="flex items-center gap-1.5 text-white/80">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{publishDate}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 text-white/80">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{readingTime} min read</span>
                      </div>

                      <div className="ml-auto">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-white/10 hover:bg-white/20 text-white border-transparent backdrop-blur-sm group"
                            >
                              <Share2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                              Share
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem
                              className="flex items-center cursor-pointer"
                              onClick={() => handleShare("twitter")}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                className="mr-2 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                              </svg>
                              Twitter
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center cursor-pointer"
                              onClick={() => handleShare("facebook")}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                className="mr-2 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                              </svg>
                              Facebook
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center cursor-pointer"
                              onClick={() => handleShare("linkedin")}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                className="mr-2 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
                              </svg>
                              LinkedIn
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center cursor-pointer"
                              onClick={() => handleShare("telegram")}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                className="mr-2 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.04.01-.07-.02-.1-.03-.03-.08-.02-.12-.01-.06.02-1.03.65-2.89 1.89-.27.18-.52.27-.74.27-.25 0-.72-.15-1.07-.27-.43-.15-.76-.23-.74-.49.01-.13.13-.27.36-.41C10.52 8.73 12.22 8 13.28 8c.18 0 .72.05.65.47z" />
                              </svg>
                              Telegram
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={handleCopyLink}
                              className="flex items-center cursor-pointer"
                            >
                              {copied ? (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <LinkIcon className="h-4 w-4 mr-2" />
                                  <span>Copy link</span>
                                </>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-8 relative rounded-xl overflow-hidden shadow-md">
                <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/20 p-6 sm:p-8 relative">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags &&
                      tags.length > 0 &&
                      tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-primary/10"
                        >
                          {tag}
                        </Badge>
                      ))}
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
                    {title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    {publishDate && (
                      <div className="flex items-center gap-1.5 text-foreground/80">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{publishDate}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 text-foreground/80">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{readingTime} min read</span>
                    </div>

                    <div className="ml-auto">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline" className="group">
                            <Share2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                            Share
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem
                            className="flex items-center cursor-pointer"
                            onClick={() => handleShare("twitter")}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              className="mr-2 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                            </svg>
                            Twitter
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center cursor-pointer"
                            onClick={() => handleShare("facebook")}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              className="mr-2 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                            </svg>
                            Facebook
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center cursor-pointer"
                            onClick={() => handleShare("linkedin")}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              className="mr-2 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
                            </svg>
                            LinkedIn
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center cursor-pointer"
                            onClick={() => handleShare("telegram")}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              className="mr-2 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.04.01-.07-.02-.1-.03-.03-.08-.02-.12-.01-.06.02-1.03.65-2.89 1.89-.27.18-.52.27-.74.27-.25 0-.72-.15-1.07-.27-.43-.15-.76-.23-.74-.49.01-.13.13-.27.36-.41C10.52 8.73 12.22 8 13.28 8c.18 0 .72.05.65.47z" />
                            </svg>
                            Telegram
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={handleCopyLink}
                            className="flex items-center cursor-pointer"
                          >
                            {copied ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <LinkIcon className="h-4 w-4 mr-2" />
                                <span>Copy link</span>
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="max-w-3xl mx-auto">
              <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-img:rounded-lg prose-img:shadow-md">
                <GroupBlocks blocks={blocks} />
              </div>

              <Separator className="my-12" />

              {/* Author section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12 p-6 rounded-lg bg-muted/30 border border-border/50">
                <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="/avatar.png"
                    alt="Author"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-1">
                    {`Soutpaw's Mindscape🦅`}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">#nerd</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs gap-1"
                      asChild
                    >
                      <a
                        href="https://t.me/abdurahmon_mamadiyorov"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="24"
                          height="24"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#29b6f6"
                            d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"
                          ></path>
                          <path
                            fill="#b0bec5"
                            d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"
                          ></path>
                          <path
                            fill="#cfd8dc"
                            d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"
                          ></path>
                        </svg>
                        Follow on Telegram
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="py-8 px-6 rounded-lg bg-muted/30 border border-border/50 mb-12">
                <h3 className="text-xl font-semibold mb-4">
                  Join the discussion
                </h3>
                <GiscusComponent />
              </div>
            </div>
          </div>

          {headings.length > 2 && (
            <div className="w-full md:w-1/4 hidden md:block">
              <div className="sticky top-20">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                  <h3 className="font-medium mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                    Table of Contents
                  </h3>
                  <Separator className="mb-3" />
                  <ScrollArea className="h-[calc(100vh-250px)]">
                    <nav className="space-y-1.5">
                      {headings.map((heading: Heading) => (
                        <a
                          key={heading.id}
                          href={`#${heading.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document
                              .getElementById(heading.id)
                              ?.scrollIntoView({
                                behavior: "smooth",
                              });
                          }}
                          className={cn(
                            "block py-1 text-sm hover:text-primary transition-colors",
                            heading.level === 1 && "font-medium",
                            heading.level === 2 && "pl-3 text-muted-foreground",
                            heading.level === 3 &&
                              "pl-6 text-muted-foreground/80 text-xs"
                          )}
                        >
                          {heading.content}
                        </a>
                      ))}
                    </nav>
                  </ScrollArea>
                </div>

                <div className="mt-6 rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                  <div className="flex flex-col gap-3">
                    <h3 className="font-medium mb-1 text-sm uppercase tracking-wide text-muted-foreground">
                      Share This Article
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="aspect-square"
                        onClick={() => handleShare("twitter")}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          className="fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </svg>
                        <span className="sr-only">Twitter</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="aspect-square"
                        onClick={() => handleShare("facebook")}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          className="fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                        </svg>
                        <span className="sr-only">Facebook</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="aspect-square"
                        onClick={() => handleShare("linkedin")}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          className="fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
                        </svg>
                        <span className="sr-only">LinkedIn</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="aspect-square"
                        onClick={() => handleShare("telegram")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="24"
                          height="24"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#29b6f6"
                            d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"
                          ></path>
                          <path
                            fill="#b0bec5"
                            d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"
                          ></path>
                          <path
                            fill="#cfd8dc"
                            d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"
                          ></path>
                        </svg>
                        <span className="sr-only">Telegram</span>
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyLink}
                      className="w-full mt-1 flex items-center justify-center gap-2"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Copy link</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Related posts teaser */}
                <div className="mt-6 rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                  <div className="bg-muted px-4 py-3 border-b">
                    <h3 className="font-medium text-sm">Continue Reading</h3>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/blog"
                      className="block p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <h4 className="font-medium text-sm mb-1 line-clamp-2">
                        Discover more articles on our blog
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Explore the full collection
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default ClientPostPage;
