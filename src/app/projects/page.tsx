"use client";

import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Play, Users, Video, Eye } from "lucide-react";
import Image from "next/image";
import {
  SketchyWavyLine,
  SketchyBorder,
  SketchyArrow,
  SketchyCornerBracket,
} from "@/components/sketch";
import { useState, useEffect } from "react";

export default function ProjectsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [subscribers, setSubscribers] = useState<number | null>(null);
  const [watchTimeHours, setWatchTimeHours] = useState<number | null>(null);
  const [videoCount, setVideoCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchYouTubeData() {
      try {
        // Fetch subscribers
        const subsResponse = await fetch("/api/subs");
        const subsData = await subsResponse.json();
        setSubscribers(subsData.subscribers);

        // Fetch watch time
        const watchTimeResponse = await fetch("/api/wtime");
        const watchTimeData = await watchTimeResponse.json();
        setWatchTimeHours(watchTimeData.watchTimeHours);

        // Fetch video count
        const videosResponse = await fetch("/api/videos");
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

  // Helper function to format numbers
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
      delay: "0.8s",
    },
    {
      label: "Videos",
      value: formatNumber(videoCount),
      delay: "1s",
    },
    {
      label: "Watch Time (Hours)",
      value: formatNumber(watchTimeHours),
      delay: "1.2s",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="container mx-auto relative max-w-7xl">
        {/* Sketchy decorative elements */}
        <div className="absolute -top-10 -left-10 opacity-30 animate-wiggle hidden md:block">
          <SketchyCornerBracket
            corner="top-left"
            size={40}
            className="text-primary"
          />
        </div>
        <div
          className="absolute -top-10 -right-10 opacity-30 animate-wiggle hidden md:block"
          style={{ animationDelay: "1s" }}
        >
          <SketchyCornerBracket
            corner="top-right"
            size={40}
            className="text-primary"
          />
        </div>
        <div
          className="absolute -bottom-10 -left-10 opacity-30 animate-wiggle hidden md:block"
          style={{ animationDelay: "2s" }}
        >
          <SketchyCornerBracket
            corner="bottom-right"
            size={40}
            className="text-primary rotate-180"
          />
        </div>
        <div
          className="absolute -bottom-10 -right-10 opacity-30 animate-wiggle hidden md:block"
          style={{ animationDelay: "3s" }}
        >
          <SketchyCornerBracket
            corner="bottom-left"
            size={40}
            className="text-primary rotate-180"
          />
        </div>

        {/* Main card with sketchy border */}

        <div className="flex flex-col lg:flex-row overflow-hidden">
          {/* Left side - Text content */}
          <div className="flex-1 p-4 sm:p-6 lg:p-12 relative">
            {/* Animated wavy border */}
            <div className="absolute top-0 left-0 right-0 hidden sm:block">
              <SketchyWavyLine
                className="text-primary"
                width="100%"
                height="8"
              />
            </div>

            <div
              className={`transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="relative mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 leading-tight">
                  Youtube Channel
                </h1>
                <div className="absolute -bottom-2 left-0 hidden sm:block">
                  <SketchyWavyLine
                    className="text-primary/40"
                    width="200"
                    height="4"
                  />
                </div>
              </div>

              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                {`I removed the projects section, bcoz currently I'm focusing on
                real world applications and tech stacks.`}
              </p>

              {/* Stats section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`text-center p-3 sm:p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/30 transform transition-all duration-700 hover:scale-105 ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-5 opacity-0"
                    }`}
                    style={{ transitionDelay: stat.delay }}
                  >
                    <div className="flex justify-center mb-2"></div>
                    <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center">
                <Button
                  asChild
                  variant="outline"
                  className="text-primary border-primary hover:bg-primary/10 transition-colors"
                >
                  <a
                    href="https://www.youtube.com/@bekzotovich"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sub buddy, please👉🏿
                  </a>
                </Button>
              </div>
            </div>

            {/* Bottom wavy border */}
            <div className="absolute bottom-0 left-0 right-0 hidden sm:block">
              <SketchyWavyLine
                className="text-primary"
                width="100%"
                height="8"
              />
            </div>
          </div>

          {/* Right side - 3D Image */}
          <div className="flex-1 p-4 sm:p-6 lg:p-12 flex items-center justify-center relative overflow-hidden">
            <div className="relative group w-full max-w-md lg:max-w-none">
              <Image
                width={900}
                height={500}
                alt="bekzotovich youtube channel"
                src={"/youtube/image.png"}
                className="w-full h-auto rounded-2xl shadow-2xl three-d-img group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Floating wavy lines */}
        <div className="absolute top-1/2 -left-20 -translate-y-1/2 opacity-20 rotate-45 hidden lg:block">
          <SketchyWavyLine className="text-primary" width="100" height="8" />
        </div>
        <div className="absolute top-1/3 -right-20 opacity-20 -rotate-45 hidden lg:block">
          <SketchyWavyLine className="text-primary" width="100" height="8" />
        </div>
      </div>
    </div>
  );
}
