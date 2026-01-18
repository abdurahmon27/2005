"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [subscribers, setSubscribers] = useState<number | null>(null);
  const [watchTimeHours, setWatchTimeHours] = useState<number | null>(null);
  const [videoCount, setVideoCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchYouTubeData() {
      try {
        const subsResponse = await fetch("/api/youtube/subscribers");
        const subsData = await subsResponse.json();
        setSubscribers(subsData.subscribers);

        const watchTimeResponse = await fetch("/api/youtube/watch-time");
        const watchTimeData = await watchTimeResponse.json();
        setWatchTimeHours(watchTimeData.watchTimeHours);

        const videosResponse = await fetch("/api/youtube/videos");
        const videosData = await videosResponse.json();
        setVideoCount(videosData.videoCount);
      } catch (error) {
        console.error("Failed to fetch YouTube data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchYouTubeData();
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const formatNumber = (num: number | null): string => {
    if (num === null) return loading ? "..." : "0";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const stats = [
    {
      label: "Subscribers",
      value: formatNumber(subscribers),
    },
    {
      label: "Videos",
      value: formatNumber(videoCount),
    },
    {
      label: "Watch Time (Hours)",
      value: formatNumber(watchTimeHours),
    },
  ];

  return (
    <div className="min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div
          className={`mb-10  pb-6 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 font-mono flex items-center gap-2 text-primary">
            projects
            <Image src={'/projects.jpeg'} alt="Haywan Monkey" width={32} height={32} className="rounded-md -translate-y-1" />
          </h1>
          <p className="text-sm text-muted-foreground font-mono">
            things i&apos;ve built and shipped
          </p>
        </div>

        <div className="my-8 flex items-center">
          <div className="flex-1 border-t border-muted"></div>
          <div className="px-4">
            <span className="text-muted text-sm">• • •</span>
          </div>
          <div className="flex-1 border-t border-muted"></div>
        </div>

        {/* Projects List */}
        <div className="space-y-4 mb-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="space-y-1">
                <a
                  href={project.link || project.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block underline decoration-2 decoration-foreground/30 hover:decoration-foreground transition-all group font-mono font-bold text-base text-foreground"
                >
                  {project.title}
                </a>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="my-8 flex items-center">
          <div className="flex-1 border-t border-muted"></div>
          <div className="px-4">
            <span className="text-muted text-sm">• • •</span>
          </div>
          <div className="flex-1 border-t border-muted"></div>
        </div>

        {/* You Section - YouTube */}
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="mb-8">
            <pre className="font-mono text-xs mb-3 text-muted-foreground">
              {`┌─────────────────────┐
│  ▶ YOU / YOUTUBE    │
└─────────────────────┘`}
            </pre>
            <p className="text-sm text-muted-foreground font-mono">
              tech content, tutorials, and coding tips
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`transform transition-all duration-700 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold font-mono text-foreground">
                  {stat.value}
                </p>
                <div className="w-full h-px bg-border mt-2" />
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <a
            href="https://www.youtube.com/@bekzotovich"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block text-foreground underline decoration-2 decoration-foreground font-mono font-bold text-sm hover:text-primary transition-colors ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "900ms" }}
          >
            → youtube.com/@bekzotovich
          </a>
        </div>
      </div>
    </div>
  );
}
