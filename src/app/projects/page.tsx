"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { projects } from "@/data/projects";

const YOUTUBE_CHANNEL = "https://www.youtube.com/@bekzotovich";

type YouTubeStats = {
  subscribers: number | null;
  videos: number | null;
  watchHours: number | null;
};

function format(value: number | null, loading: boolean): string {
  if (value === null) return loading ? "…" : "—";
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

export default function ProjectsPage() {
  const [stats, setStats] = useState<YouTubeStats>({
    subscribers: null,
    videos: null,
    watchHours: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      const read = async (path: string) => {
        const response = await fetch(path);
        if (!response.ok) throw new Error(path);
        return response.json();
      };

      try {
        const [subs, videos, watchTime] = await Promise.all([
          read("/api/youtube/subscribers"),
          read("/api/youtube/videos"),
          read("/api/youtube/watch-time"),
        ]);
        if (!active) return;
        setStats({
          subscribers: subs.subscribers ?? null,
          videos: videos.videoCount ?? null,
          watchHours: watchTime.watchTimeHours ?? null,
        });
      } catch {
        // the channel stats are a nice-to-have; the page works without them
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const numbers = [
    { label: "subscribers", value: format(stats.subscribers, loading) },
    { label: "videos", value: format(stats.videos, loading) },
    { label: "hours watched", value: format(stats.watchHours, loading) },
  ];

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-12 sm:px-8">
      <header className="mb-8">
        <h1 className="mb-3 flex items-center gap-2.5 text-[clamp(1.6rem,3vw,2.1rem)] leading-tight text-[#fe8019]">
          Projects
          <Image
            src="/projects.jpeg"
            alt="Haywan Monkey"
            width={28}
            height={28}
            className="rounded-md"
          />
        </h1>
        <p className="text-[0.92rem] leading-relaxed text-[#928374]">
          Things I&apos;ve built and shipped.
        </p>
      </header>

      {projects.map((project) => (
        <article key={project.id} className="border-t border-[#32302f] py-5">
          <h2 className="mb-2 font-mono text-[0.95rem] text-[#d5c4a1]">
            {project.title}
          </h2>
          <p className="mb-3 text-[0.88rem] leading-[1.7] text-[#928374]">
            {project.description}
          </p>
          <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.78rem] text-[#83a598] underline decoration-dotted underline-offset-[3px] transition-colors hover:text-[#8ec07c]"
              >
                {link.label} →
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-[0.7rem] text-[#665c54]">
                #{tag.toLowerCase().replace(/\s+/g, "-")}
              </span>
            ))}
          </div>
        </article>
      ))}

      <section className="border-t border-[#32302f] py-5">
        <h2 className="mb-2 font-mono text-[0.95rem] text-[#d5c4a1]">youtube</h2>
        <p className="mb-4 text-[0.88rem] leading-[1.7] text-[#928374]">
          Tech content, tutorials and coding tips.
        </p>

        <dl className="mb-3 flex flex-wrap gap-x-8 gap-y-2">
          {numbers.map((item) => (
            <div key={item.label}>
              <dd className="font-mono text-[1.05rem] text-[#d5c4a1]">
                {item.value}
              </dd>
              <dt className="font-mono text-[0.68rem] text-[#665c54]">
                {item.label}
              </dt>
            </div>
          ))}
        </dl>

        <a
          href={YOUTUBE_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.78rem] text-[#83a598] underline decoration-dotted underline-offset-[3px] transition-colors hover:text-[#8ec07c]"
        >
          youtube.com/@bekzotovich →
        </a>
      </section>
    </main>
  );
}
