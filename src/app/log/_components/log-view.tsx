"use client";

import { useMemo } from "react";
import useSWR from "swr";

import { CodeBlock } from "@/components/blog";
import { GiscusComments } from "@/components/shared";

type RichText = {
  content: string;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
  };
  href?: string | null;
};

type Block = {
  id: string;
  type: string;
  content: RichText[] | string;
  checked?: boolean;
  caption?: RichText[];
  videoUrl?: string;
  language?: string;
};

type LogData = {
  title?: string;
  publish_date?: string | null;
  updated_at?: string | null;
  readingTime?: number;
  tags?: string[];
  blocks?: Block[];
};

const HEADINGS = new Set(["heading_1", "heading_2", "heading_3"]);
const LIST_ITEMS = new Set(["bulleted_list_item", "numbered_list_item"]);

const fetcher = (url: string) =>
  fetch(url).then((response) => {
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response.json() as Promise<LogData>;
  });

function plainText(content: Block["content"]): string {
  if (typeof content === "string") return content;
  return content.map((item) => item.content).join("");
}

function headingId(block: Block): string {
  const slug = plainText(block.content)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `section-${block.id.slice(0, 6)}`;
}

function formatDate(value?: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Text({ items }: { items: RichText[] }) {
  return (
    <>
      {items.map((item, index) => {
        const { annotations } = item;
        let node: React.ReactNode = item.content;

        if (annotations?.code) {
          node = (
            <code className="rounded bg-[#32302f] px-1.5 py-0.5 font-mono text-[0.85em] text-[#fb4934]">
              {node}
            </code>
          );
        }
        if (annotations?.bold) node = <strong className="text-[#fe8019]">{node}</strong>;
        if (annotations?.italic) node = <em className="text-[#d3869b]">{node}</em>;
        if (annotations?.underline) node = <u>{node}</u>;
        if (annotations?.strikethrough) node = <s className="text-[#7c6f64]">{node}</s>;

        if (item.href) {
          node = (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#83a598] underline decoration-dotted underline-offset-[3px] hover:text-[#8ec07c]"
            >
              {node}
            </a>
          );
        }

        return <span key={index}>{node}</span>;
      })}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  const rich = Array.isArray(block.content) ? block.content : [];

  switch (block.type) {
    case "paragraph":
      if (rich.length === 0) return null;
      return (
        <p className="my-5 leading-[1.75] text-[#d5c4a1]">
          <Text items={rich} />
        </p>
      );

    case "heading_1":
      return (
        <h2
          id={headingId(block)}
          className="mt-12 mb-3 scroll-mt-24 text-xl font-semibold text-[#fabd2f]"
        >
          <Text items={rich} />
        </h2>
      );

    case "heading_2":
      return (
        <h3
          id={headingId(block)}
          className="mt-10 mb-3 scroll-mt-24 text-lg font-semibold text-[#d79921]"
        >
          <Text items={rich} />
        </h3>
      );

    case "heading_3":
      return (
        <h4
          id={headingId(block)}
          className="mt-8 mb-2 scroll-mt-24 text-base font-semibold text-[#b8bb26]"
        >
          <Text items={rich} />
        </h4>
      );

    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li className="my-1.5 leading-[1.7] text-[#d5c4a1] marker:text-[#665c54]">
          <Text items={rich} />
        </li>
      );

    case "to_do":
      return (
        <label className="my-1.5 flex items-start gap-2.5 text-[#d5c4a1]">
          <input
            type="checkbox"
            checked={!!block.checked}
            readOnly
            className="mt-[0.35rem] h-3 w-3 shrink-0 accent-[#fe8019]"
          />
          <span className={block.checked ? "text-[#7c6f64] line-through" : undefined}>
            <Text items={rich} />
          </span>
        </label>
      );

    case "code":
      return (
        <div className="my-6">
          <CodeBlock code={plainText(block.content)} language={block.language} />
        </div>
      );

    case "image":
      return (
        <figure className="my-8">
          {/* Notion serves images from expiring URLs on hosts we don't control */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={typeof block.content === "string" ? block.content : ""}
            alt={block.caption?.[0]?.content ?? ""}
            loading="lazy"
            className="w-full rounded-md border border-[#32302f]"
          />
          {block.caption && block.caption.length > 0 && (
            <figcaption className="mt-2 text-center font-mono text-xs text-[#665c54]">
              <Text items={block.caption} />
            </figcaption>
          )}
        </figure>
      );

    case "video": {
      const url = block.videoUrl;
      if (!url) return null;
      const youtubeId =
        /youtu\.be\/([^?&]+)/.exec(url)?.[1] ??
        /[?&]v=([^&]+)/.exec(url)?.[1] ??
        /youtube\.com\/embed\/([^?&]+)/.exec(url)?.[1];

      return (
        <div className="my-8 overflow-hidden rounded-md border border-[#32302f]">
          {youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={block.caption?.[0]?.content ?? "Video"}
              allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full"
            />
          ) : (
            <video controls className="w-full">
              <source src={url} />
            </video>
          )}
        </div>
      );
    }

    case "divider":
      return <hr className="my-10 border-t border-[#32302f]" />;

    default:
      // Unsupported Notion blocks arrive empty from the parser — skip quietly.
      return null;
  }
}

/** Wraps runs of list items in a single ul/ol so markers line up. */
function Blocks({ blocks }: { blocks: Block[] }) {
  const grouped: React.ReactNode[] = [];
  let run: Block[] = [];

  const flush = () => {
    if (run.length === 0) return;
    const ordered = run[0].type === "numbered_list_item";
    const items = run.map((block) => <BlockView key={block.id} block={block} />);
    grouped.push(
      ordered ? (
        <ol key={`list-${run[0].id}`} className="my-5 list-decimal pl-5">
          {items}
        </ol>
      ) : (
        <ul key={`list-${run[0].id}`} className="my-5 list-disc pl-5">
          {items}
        </ul>
      )
    );
    run = [];
  };

  for (const block of blocks) {
    if (LIST_ITEMS.has(block.type)) {
      if (run.length > 0 && run[0].type !== block.type) flush();
      run.push(block);
      continue;
    }
    flush();
    grouped.push(<BlockView key={block.id} block={block} />);
  }
  flush();

  return <>{grouped}</>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8">{children}</div>
  );
}

export function LogView() {
  const { data, error, isLoading } = useSWR<LogData>("/api/temporary", fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 300_000,
  });

  const toc = useMemo(
    () =>
      (data?.blocks ?? [])
        .filter((block) => HEADINGS.has(block.type))
        .map((block) => ({
          id: headingId(block),
          title: plainText(block.content),
          depth: block.type === "heading_1" ? 2 : 3,
        })),
    [data]
  );

  if (isLoading) {
    return (
      <Shell>
        <div className="mx-auto max-w-2xl animate-pulse space-y-3">
          <div className="h-7 w-2/3 rounded bg-[#32302f]" />
          <div className="h-3 w-40 rounded bg-[#282828]" />
          <div className="h-px w-full bg-[#32302f]" />
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-3 w-full rounded bg-[#282828]" />
          ))}
        </div>
      </Shell>
    );
  }

  if (error || !data || !data.blocks) {
    return (
      <Shell>
        <p className="mx-auto max-w-2xl font-mono text-sm text-[#7c6f64]">
          {error ? "could not load the log right now." : "nothing logged yet."}
        </p>
      </Shell>
    );
  }

  const hasToc = toc.length > 2;
  const published = formatDate(data.publish_date);
  const updated = formatDate(data.updated_at);

  return (
    <Shell>
      <div className="flex justify-center gap-12">
        <article className="min-w-0 max-w-2xl flex-1">
          <header className="mb-10">
            <h1 className="mb-3 text-[clamp(1.6rem,3vw,2.1rem)] leading-tight text-[#fe8019]">
              {data.title ?? "Log"}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[0.7rem] text-[#665c54]">
              {published && <span>{published}</span>}
              {updated && updated !== published && <span>updated {updated}</span>}
              {data.readingTime && <span>{data.readingTime} min read</span>}
              {data.tags?.map((tag) => (
                <span key={tag} className="text-[#7c6f64]">
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          <div className="text-[0.95rem]">
            <Blocks blocks={data.blocks} />
          </div>

          <section className="mt-16 border-t border-[#32302f] pt-8">
            <h2 className="mb-4 font-mono text-[0.7rem] text-[#7c6f64]">comments</h2>
            <GiscusComments />
          </section>
        </article>

        {hasToc && (
          <aside className="sticky top-24 hidden h-fit w-48 shrink-0 xl:block">
            <p className="mb-2 font-mono text-[0.7rem] text-[#7c6f64]">contents</p>
            <ul>
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`block py-[0.16rem] text-[0.75rem] leading-snug text-[#7c6f64] hover:text-[#a89984] ${
                      item.depth === 3 ? "pl-3 text-[0.72rem]" : ""
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </Shell>
  );
}
