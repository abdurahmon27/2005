
import React from "react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Bookmark, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ClientSideImage } from "./ClientSideImage";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";

interface Post {
  id: string;
  title: string;
  route: string;
  publish_date: string;
  tags: string[];
  thumb?: string;
  preview?: string;
  readingTime?: number;
}

interface GroupedPosts {
  [key: string]: Post[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ClientBlogs: React.FC = () => {
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR("/api/blog?published=true", fetcher, {
    revalidateOnFocus: true,
    revalidateIfStale: true,
    refreshInterval: 60000,
  });

  if (error)
    return <div className="text-center py-12">Failed to load blog posts</div>;

  let latestPosts: Post[] = [];
  let groupedPosts: GroupedPosts = {};
  let sortedMonths: string[] = [];

  if (posts) {
    latestPosts = posts.slice(0, 3);

    groupedPosts = posts.slice(3).reduce((acc: GroupedPosts, post: Post) => {
      if (!post.publish_date) return acc;

      const date = new Date(post.publish_date);
      const monthYear = `${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }

      acc[monthYear].push(post);
      return acc;
    }, {});

    sortedMonths = Object.keys(groupedPosts).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB.getTime() - dateA.getTime();
    });
  }

  // Skeletons for loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-8">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <Skeleton className="h-10 w-40 mb-4" />
              <Skeleton className="h-4 w-64 mb-2" />
              <Skeleton className="h-4 w-72" />
            </div>
            <div className="flex flex-wrap gap-2 py-1 max-w-md">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-full" />
              ))}
            </div>
          </div>

          <Separator className="bg-primary/10" />

          {/* Featured Posts Skeleton */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-32" />
            </div>

            <div className="grid grid-cols-1 gap-6 px-2">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden h-full">
                  <div className="flex flex-col md:flex-row h-full">
                    <Skeleton className="h-60 w-full md:w-1/3" />
                    <div className="w-full p-5">
                      <Skeleton className="h-6 w-32 mb-4" />
                      <Skeleton className="h-8 w-full mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-4" />
                      <div className="flex justify-between mt-4">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-6">
          <div className="flex flex-col items-end">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-muted-foreground mt-2">
              Discover thoughts, stories, and insights.
            </p>
            <p className="text-muted-foreground mt-2">
              Telegram channel:{" "}
              <a
                href="https://t.me/abdurahmon_mamadiyorov"
                className="text-primary"
                target="_blank"
              >
                Soutpaw&lsquo;s Mindscape🦅
              </a>
            </p>
          </div>
        </div>

        <Separator className="bg-primary/10" />

        {/* Featured Posts Section */}
        {latestPosts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Latest</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 px-2">
              {latestPosts.map((post) => (
                <Link
                  href={`/blog/${post.route}`}
                  key={post.id}
                  className="block group"
                >
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group-hover:border-primary/30 h-full">
                    <div className="flex flex-col md:flex-row h-full">
                      {post.thumb && (
                        <ClientSideImage
                          thumb={post.thumb}
                          title={post.title}
                        />
                      )}

                      <div
                        className={cn(
                          "flex flex-col justify-between h-full",
                          "w-full"
                        )}
                      >
                        <CardHeader className="flex-grow py-4 px-5">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge
                              variant="outline"
                              className="text-xs font-normal rounded-md bg-primary/5 border-primary/20"
                            >
                              {new Date(post.publish_date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </Badge>

                            <div className="flex items-center text-xs text-muted-foreground gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{post.readingTime} min read</span>
                            </div>
                          </div>

                          <CardTitle className="group-hover:text-primary transition-colors duration-300 text-lg md:text-xl">
                            {post.title}
                          </CardTitle>

                          <CardDescription className="mt-2 line-clamp-3 text-sm">
                            {post.preview}
                          </CardDescription>
                        </CardHeader>

                        <CardFooter className="border-t pt-3 pb-4 px-5">
                          <div className="flex justify-between items-center w-full">
                            <div className="flex flex-wrap gap-1.5">
                              {post.tags.slice(0, 2).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="rounded-md font-normal text-xs bg-secondary/50"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {post.tags.length > 2 && (
                                <Badge
                                  variant="outline"
                                  className="rounded-md text-xs"
                                >
                                  +{post.tags.length - 2}
                                </Badge>
                              )}
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-0 h-8 px-2 text-primary group-hover:translate-x-1 transition-transform hover:bg-primary/5"
                            >
                              Read
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Archive Posts Section */}
        {sortedMonths.length > 0 && (
          <div className="space-y-6 mt-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">Blogs</h2>
            </div>

            <div className="relative">
              {sortedMonths.map((monthYear, monthIndex) => (
                <div
                  key={monthYear}
                  className={cn(
                    "mb-12",
                    monthIndex === sortedMonths.length - 1 ? "mb-4" : ""
                  )}
                >
                  <div className="sticky top-[5rem] bg-background/95 backdrop-blur-sm z-10 py-2 border-b shadow-sm rounded-md px-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-primary/90">
                        {monthYear}
                      </h3>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {groupedPosts[monthYear].length} posts
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4 mt-4 px-2">
                    {groupedPosts[monthYear].map((post) => (
                      <Link
                        href={`/blog/${post.route}`}
                        key={post.id}
                        className="block group"
                      >
                        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group-hover:border-primary/20">
                          <div className="flex flex-col md:flex-row">
                            {post.thumb && (
                              <ClientSideImage
                                thumb={post.thumb}
                                title={post.title}
                              />
                            )}

                            <div className="w-full">
                              <CardHeader className="flex-grow py-4 px-5">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  <Badge
                                    variant="outline"
                                    className="text-xs font-normal rounded-md"
                                  >
                                    {new Date(
                                      post.publish_date
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </Badge>

                                  <div className="flex items-center text-xs text-muted-foreground gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{post.readingTime} min read</span>
                                  </div>
                                </div>

                                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                                  {post.title}
                                </CardTitle>

                                <CardDescription className="mt-2 line-clamp-2 text-sm">
                                  {post.preview}
                                </CardDescription>
                              </CardHeader>

                              <CardFooter className="border-t pt-3 pb-4 px-5">
                                <div className="flex justify-between items-center w-full">
                                  <div className="flex flex-wrap gap-1.5">
                                    {post.tags.slice(0, 2).map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="rounded-md font-normal text-xs"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                    {post.tags.length > 2 && (
                                      <Badge
                                        variant="outline"
                                        className="rounded-md text-xs"
                                      >
                                        +{post.tags.length - 2}
                                      </Badge>
                                    )}
                                  </div>

                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-0 h-8 px-2 text-primary group-hover:translate-x-1 transition-transform hover:bg-primary/5"
                                  >
                                    Read
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                  </Button>
                                </div>
                              </CardFooter>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {posts && posts.length === 0 && (
          <div className="text-center py-16 bg-muted/20 rounded-lg border border-dashed">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Bookmark className="h-8 w-8 text-primary/70" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              There are no blog posts available at the moment. Check back later
              for new content.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientBlogs;
