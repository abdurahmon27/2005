"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CodeBlock } from "./CodeBlock";
import { BlurImage } from "./BlurImage";
import { GiscusComponent } from "@/components/Giscus";
import { TableOfContents } from "./TableOfContents";
import { JSX, useMemo } from "react";
import Image from "next/image";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export function BlogPage({ slug }: { slug: string }) {
  const router = useRouter();
  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const res = await fetch(`/api/blog/${slug}`);
      if (!res.ok) throw new Error("Failed to fetch blog");
      return res.json();
    },
  });

  // Generate TOC items from blog blocks
  const tocItems = useMemo(() => {
    if (!blog?.blocks) return [];

    const items: TOCItem[] = [];
    blog.blocks.forEach((block: any, index: number) => {
      if (block.type.startsWith("heading_")) {
        const level = parseInt(block.type.split("_")[1]);
        const title = renderRichTextPlain(block.content);
        const id = `heading-${index}-${title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`;
        items.push({ id, title, level });
      }
    });
    return items;
  }, [blog]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary">
        <div className="flex items-center gap-3 text-primary">
          <div className="flex items-center justify-center text-4xl animate-pulse">
            *
          </div>
          <span className="fira-code text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary">
        <div className="text-center">
          <div className="text-error text-xl mb-2">✗</div>
          <div className="text-error font-mono">Failed to load blog</div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary">
        <div className="text-center">
          <div className="text-muted text-xl mb-2">404</div>
          <div className="text-muted font-mono">Blog not found</div>
        </div>
      </div>
    );
  }

  function renderRichTextPlain(content: any[]): string {
    if (!content || !Array.isArray(content)) return "";
    return content.map((item: any) => item.content || "").join("");
  }

  function renderRichText(content: any[]): string {
    if (!content || !Array.isArray(content)) return "";
    return content
      .map((item: any) => {
        let text = item.content || "";
        if (item.annotations) {
          if (item.annotations.bold) text = `**${text}**`;
          if (item.annotations.italic) text = `*${text}*`;
          if (item.annotations.strikethrough) text = `~~${text}~~`;
          if (item.annotations.code) text = `\`${text}\``;
          if (item.annotations.underline) text = `<u>${text}</u>`;
        }
        if (item.href) {
          text = `[${text}](${item.href})`;
        }
        return text;
      })
      .join("");
  }

  function processInlineFormatting(text: string) {
    const parts: (string | JSX.Element)[] = [];
    let keyCounter = 0;

    const processedParts: (string | JSX.Element)[] = [];

    let workingText = text;
    const linkMatches: Array<{
      start: number;
      end: number;
      element: JSX.Element;
    }> = [];

    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    while ((match = markdownLinkRegex.exec(text)) !== null) {
      linkMatches.push({
        start: match.index,
        end: match.index + match[0].length,
        element: (
          <a
            key={keyCounter++}
            href={match[2]}
            className="text-accent underline underline-offset-2 hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {match[1]}
          </a>
        ),
      });
    }

    // HTML links <a href="url">text</a>
    const htmlLinkRegex = /<a href="([^"]+)"[^>]*>(.*?)<\/a>/g;
    while ((match = htmlLinkRegex.exec(text)) !== null) {
      linkMatches.push({
        start: match.index,
        end: match.index + match[0].length,
        element: (
          <a
            key={keyCounter++}
            href={match[1]}
            className="text-accent underline underline-offset-2 hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {match[2]}
          </a>
        ),
      });
    }

    // Sort matches by position
    linkMatches.sort((a, b) => a.start - b.start);

    // Process links first
    let lastIndex = 0;
    const textParts: (string | JSX.Element)[] = [];

    linkMatches.forEach((linkMatch) => {
      if (linkMatch.start >= lastIndex) {
        if (linkMatch.start > lastIndex) {
          textParts.push(text.slice(lastIndex, linkMatch.start));
        }
        textParts.push(linkMatch.element);
        lastIndex = linkMatch.end;
      }
    });

    if (lastIndex < text.length) {
      textParts.push(text.slice(lastIndex));
    }

    // If no links were found, use the original text
    if (textParts.length === 0) {
      textParts.push(text);
    }

    // Now process other formatting for text parts only
    const finalParts: (string | JSX.Element)[] = [];

    textParts.forEach((part) => {
      if (typeof part === "string") {
        // Apply other formatting patterns
        const patterns = [
          {
            regex: /\*\*(.*?)\*\*/g,
            tag: "strong",
            className: "font-bold text-primary",
          },
          {
            regex: /\*(.*?)\*/g,
            tag: "em",
            className: "italic text-foreground",
          },
          {
            regex: /~~(.*?)~~/g,
            tag: "del",
            className: "line-through text-muted",
          },
          {
            regex: /`(.*?)`/g,
            tag: "code",
            className:
              "px-1.5 py-0.5 bg-secondary text-accent rounded text-sm font-mono",
          },
          {
            regex: /<u>(.*?)<\/u>/g,
            tag: "u",
            className: "underline text-foreground",
          },
        ];

        let formattedText: (string | JSX.Element)[] = [part];

        patterns.forEach((pattern) => {
          const newFormattedText: (string | JSX.Element)[] = [];

          formattedText.forEach((textPart) => {
            if (typeof textPart === "string") {
              const matches: Array<{
                start: number;
                end: number;
                element: JSX.Element;
              }> = [];
              let formatMatch;

              while ((formatMatch = pattern.regex.exec(textPart)) !== null) {
                const Tag = pattern.tag as any;
                matches.push({
                  start: formatMatch.index,
                  end: formatMatch.index + formatMatch[0].length,
                  element: (
                    <Tag key={keyCounter++} className={pattern.className}>
                      {formatMatch[1]}
                    </Tag>
                  ),
                });
              }

              if (matches.length > 0) {
                matches.sort((a, b) => a.start - b.start);
                let lastIdx = 0;

                matches.forEach((formatMatch) => {
                  if (formatMatch.start >= lastIdx) {
                    if (formatMatch.start > lastIdx) {
                      newFormattedText.push(
                        textPart.slice(lastIdx, formatMatch.start)
                      );
                    }
                    newFormattedText.push(formatMatch.element);
                    lastIdx = formatMatch.end;
                  }
                });

                if (lastIdx < textPart.length) {
                  newFormattedText.push(textPart.slice(lastIdx));
                }
              } else {
                newFormattedText.push(textPart);
              }
            } else {
              newFormattedText.push(textPart);
            }
          });

          formattedText = newFormattedText;
        });

        finalParts.push(...formattedText);
      } else {
        finalParts.push(part);
      }
    });

    return finalParts.length > 0 ? finalParts : [text];
  }

  function renderBlock(block: any, i: number) {
    switch (block.type) {
      case "paragraph":
        const paragraphText = renderRichText(block.content);
        if (!paragraphText.trim()) return <div key={i} className="h-4"></div>;
        return (
          <p
            key={i}
            className="text-foreground mb-4 leading-relaxed whitespace-pre-wrap"
          >
            {processInlineFormatting(paragraphText)}
          </p>
        );

      case "heading_1":
        const h1Title = renderRichTextPlain(block.content);
        const h1Id = `heading-${i}-${h1Title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`;
        return (
          <div key={i} className="group mb-6 mt-8 first:mt-0">
            <h1
              id={h1Id}
              className="text-3xl font-bold text-primary mb-2 border-b border-muted pb-2 scroll-mt-24"
            >
              <span className="text-accent mr-2">#</span>
              {h1Title}
            </h1>
          </div>
        );

      case "heading_2":
        const h2Title = renderRichTextPlain(block.content);
        const h2Id = `heading-${i}-${h2Title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`;
        return (
          <div key={i} className="group mb-5 mt-7">
            <h2
              id={h2Id}
              className="text-2xl font-bold text-primary mb-2 scroll-mt-24"
            >
              <span className="text-accent mr-2">##</span>
              {h2Title}
            </h2>
          </div>
        );

      case "heading_3":
        const h3Title = renderRichTextPlain(block.content);
        const h3Id = `heading-${i}-${h3Title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`;
        return (
          <div key={i} className="group mb-4 mt-6">
            <h3
              id={h3Id}
              className="text-xl font-semibold text-primary mb-2 scroll-mt-24"
            >
              <span className="text-accent mr-2">###</span>
              {h3Title}
            </h3>
          </div>
        );

      case "heading_4":
        const h4Title = renderRichTextPlain(block.content);
        const h4Id = `heading-${i}-${h4Title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`;
        return (
          <div key={i} className="group mb-3 mt-5">
            <h4
              id={h4Id}
              className="text-lg font-semibold text-primary mb-2 scroll-mt-24"
            >
              <span className="text-accent mr-2">####</span>
              {h4Title}
            </h4>
          </div>
        );

      case "heading_5":
        const h5Title = renderRichTextPlain(block.content);
        const h5Id = `heading-${i}-${h5Title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`;
        return (
          <div key={i} className="group mb-3 mt-4">
            <h5
              id={h5Id}
              className="text-base font-semibold text-primary mb-2 scroll-mt-24"
            >
              <span className="text-accent mr-2">#####</span>
              {h5Title}
            </h5>
          </div>
        );

      case "heading_6":
        const h6Title = renderRichTextPlain(block.content);
        const h6Id = `heading-${i}-${h6Title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`;
        return (
          <div key={i} className="group mb-3 mt-4">
            <h6
              id={h6Id}
              className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide scroll-mt-24"
            >
              <span className="text-accent mr-2">######</span>
              {h6Title}
            </h6>
          </div>
        );

      case "bulleted_list_item":
        return (
          <div key={i} className="flex items-start mb-2">
            <span className="text-accent mr-3 mt-1">•</span>
            <span className="text-foreground leading-relaxed flex-1">
              {processInlineFormatting(renderRichText(block.content))}
            </span>
          </div>
        );

      case "numbered_list_item":
        return (
          <div key={i} className="flex items-start mb-2">
            <span className="text-accent mr-3 mt-1 font-mono text-sm min-w-[1.5rem]">
              {(i + 1).toString()}.
            </span>
            <span className="text-foreground leading-relaxed flex-1">
              {processInlineFormatting(renderRichText(block.content))}
            </span>
          </div>
        );

      case "to_do":
        return (
          <div key={i} className="flex items-start mb-3">
            <div className="flex items-center mr-3 mt-0.5">
              <input
                type="checkbox"
                checked={block.checked}
                readOnly
                className="w-4 h-4 text-accent bg-muted border-muted rounded focus:ring-accent focus:ring-2"
              />
            </div>
            <span
              className={`leading-relaxed ${
                block.checked ? "text-muted line-through" : "text-foreground"
              }`}
            >
              {processInlineFormatting(renderRichText(block.content))}
            </span>
          </div>
        );

      case "quote":
        return (
          <blockquote
            key={i}
            className="border-l-4 border-accent pl-4 py-2 my-4 bg-secondary bg-opacity-60"
          >
            <div className="text-foreground italic">
              {processInlineFormatting(renderRichText(block.content))}
            </div>
          </blockquote>
        );

      case "callout":
        const calloutIcon = block.icon || "ℹ️";
        return (
          <div
            key={i}
            className="border border-muted rounded-lg p-4 my-4 bg-secondary"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{calloutIcon}</span>
              <div className="flex-1 text-foreground">
                {processInlineFormatting(renderRichText(block.content))}
              </div>
            </div>
          </div>
        );

      case "toggle":
        return (
          <details
            key={i}
            className="border border-muted rounded-lg my-4 overflow-hidden"
          >
            <summary className="px-4 py-3 bg-secondary cursor-pointer hover:bg-muted text-primary font-medium">
              {renderRichText(block.content)}
            </summary>
            <div className="px-4 py-3 bg-current">
              {block.children &&
                block.children.map((child: any, idx: number) =>
                  renderBlock(child, idx)
                )}
            </div>
          </details>
        );

      case "code":
        return (
          <div key={i} className="my-6">
            <CodeBlock
              code={block.content.map((t: any) => t.content).join("")}
              language={block.language}
            />
          </div>
        );

      case "image":
        return (
          <figure key={i} className="my-8">
            <div className="border border-muted rounded-lg overflow-hidden bg-secondary p-2">
              <BlurImage
                src={block.content}
                alt={block.caption?.[0]?.content || "Blog image"}
                className="rounded-md w-full max-h-96 object-contain"
              />
            </div>
            {block.caption && block.caption.length > 0 && (
              <figcaption className="text-sm text-muted mt-3 text-center italic">
                {renderRichText(block.caption)}
              </figcaption>
            )}
          </figure>
        );

      case "video":
        if (block.videoUrl && block.videoUrl.includes("youtube")) {
          const match = block.videoUrl.match(
            /(?:youtube.com.*[?&]v=|youtu.be\/)([\w-]+)/
          );
          const id = match ? match[1] : null;
          return id ? (
            <figure key={i} className="my-8">
              <div className="border border-muted rounded-lg overflow-hidden bg-secondary p-2">
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  className="rounded-md w-full aspect-video"
                  allowFullScreen
                  title="YouTube video"
                />
              </div>
              {block.caption && (
                <figcaption className="text-sm text-muted mt-3 text-center italic">
                  {renderRichText(block.caption)}
                </figcaption>
              )}
            </figure>
          ) : null;
        }
        return block.videoUrl ? (
          <figure key={i} className="my-8">
            <div className="border border-muted rounded-lg overflow-hidden bg-secondary p-2">
              <video
                src={block.videoUrl}
                controls
                className="rounded-md w-full max-h-96"
              />
            </div>
            {block.caption && (
              <figcaption className="text-sm text-muted mt-3 text-center italic">
                {renderRichText(block.caption)}
              </figcaption>
            )}
          </figure>
        ) : null;

      case "file":
        return (
          <div
            key={i}
            className="border border-muted rounded-lg p-4 my-4 bg-secondary"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">📎</div>
              <div>
                <a
                  href={block.fileUrl}
                  className="text-accent hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {block.name || "Download File"}
                </a>
                {block.size && (
                  <div className="text-sm text-muted">{block.size}</div>
                )}
              </div>
            </div>
          </div>
        );

      case "embed":
        return (
          <div
            key={i}
            className="my-8 border border-muted rounded-lg overflow-hidden"
          >
            <iframe
              src={block.url}
              className="w-full h-96"
              title="Embedded content"
            />
          </div>
        );

      case "bookmark":
        return (
          <div
            key={i}
            className="border border-muted rounded-lg p-4 my-4 bg-secondary hover:bg-muted transition-colors"
          >
            <a
              href={block.url}
              className="block"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex gap-4">
                {block.icon && (
                  <div className="flex-shrink-0">
                    <img src={block.icon} alt="" className="w-6 h-6" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-medium text-primary mb-1">
                    {block.title}
                  </div>
                  {block.description && (
                    <div className="text-sm text-muted mb-2">
                      {block.description}
                    </div>
                  )}
                  <div className="text-xs text-accent">{block.url}</div>
                </div>
              </div>
            </a>
          </div>
        );

      case "table":
        return (
          <div key={i} className="my-6 overflow-x-auto">
            <table className="min-w-full border border-muted rounded-lg overflow-hidden">
              <thead className="bg-secondary">
                <tr>
                  {block.headers?.map((header: any, idx: number) => (
                    <th
                      key={idx}
                      className="px-4 py-3 text-left text-primary font-semibold border-b border-muted"
                    >
                      {renderRichText(header)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows?.map((row: any, rowIdx: number) => (
                  <tr
                    key={rowIdx}
                    className="border-b border-muted last:border-b-0"
                  >
                    {row.map((cell: any, cellIdx: number) => (
                      <td key={cellIdx} className="px-4 py-3 text-foreground">
                        {processInlineFormatting(renderRichText(cell))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "divider":
        return (
          <div key={i} className="my-8 flex items-center">
            <div className="flex-1 border-t border-muted"></div>
            <div className="px-4">
              <span className="text-muted text-sm">• • •</span>
            </div>
            <div className="flex-1 border-t border-muted"></div>
          </div>
        );

      case "link":
        return (
          <div key={i} className="my-4">
            <a
              href={block.url}
              className="text-accent hover:underline font-medium inline-flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>🔗</span>
              {block.url}
            </a>
          </div>
        );

      case "column_list":
        return (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            {block.children?.map((column: any, idx: number) => (
              <div
                key={idx}
                className="border border-muted rounded-lg p-4 bg-secondary"
              >
                {column.children?.map((child: any, childIdx: number) =>
                  renderBlock(child, childIdx)
                )}
              </div>
            ))}
          </div>
        );

      case "synced_block":
        return (
          <div
            key={i}
            className="border-2 border-dashed border-muted rounded-lg p-4 my-4"
          >
            <div className="text-sm text-muted mb-2 font-mono">
              Synced Block
            </div>
            {block.children?.map((child: any, idx: number) =>
              renderBlock(child, idx)
            )}
          </div>
        );

      default:
        return (
          <div
            key={i}
            className="border border-error rounded-lg p-3 my-3 bg-error/10"
          >
            <div className="text-error text-sm font-mono">
              Unknown block type: {block.type}
            </div>
            <pre className="text-xs text-muted mt-2 overflow-x-auto">
              {JSON.stringify(block, null, 2)}
            </pre>
          </div>
        );
    }
  }

  return (
    <div className="min-h-screen bg-current">
      <TableOfContents items={tocItems} />
      <div className="absolute bottom-10 left-10 w-auto max-md:hidden z-50">
        <Image
          src="/darling.png"
          alt="*)"
          width={300}
          height={300}
          objectFit="cover"
        />
      </div>

      <div className="py-10">
        <article className="font-mono bg-secondary rounded-lg mx-auto mt-8 mb-8 overflow-hidden container">
          <div className="px-6 py-4 border-b border-primary flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="text-sm text-primary fira-code transition-colors flex items-center gap-2 hover:text-accent"
                onClick={() => router.back()}
              >
                <span>←</span>
                <span>Back</span>
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted">
              <span>{tocItems.length} sections</span>
              <span>*</span>
              <span>{blog.readingTime || "5"} min read</span>
            </div>
          </div>

          <div className="px-8 py-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4 leading-tight text-primary">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-4">
                {blog.publish_date && (
                  <span className="flex items-center gap-2">
                    <span>::</span>
                    <span>
                      {new Date(blog.publish_date).toLocaleDateString()}
                    </span>
                  </span>
                )}
                {blog.updated_at && (
                  <span className="flex items-center gap-2">
                    <span>::</span>
                    <span>
                      Updated {new Date(blog.updated_at).toLocaleDateString()}
                    </span>
                  </span>
                )}
                {blog.readingTime && (
                  <span className="flex items-center gap-2">
                    <span>::</span>
                    <span>{blog.readingTime} min read</span>
                  </span>
                )}
              </div>

              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs text-primary font-mono   rounded-full hover:border-accent transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* using border-image square dotted double border */}
              <div className="square-dotted-border  pt-6"></div>
              <div className="square-dotted-border mt-1"></div>
            </header>

            {/* Blog content */}
            <div className="prose prose-invert max-w-none">
              {blog.blocks &&
                Array.isArray(blog.blocks) &&
                blog.blocks.map(renderBlock)}
            </div>
          </div>

          {/* Comments section */}
          <div className="border-t border-muted bg-secondary px-8 py-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                <span>::</span>
                <span>Comments</span>
              </h3>
              <div className="border-t border-muted pt-4">
                <GiscusComponent />
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
