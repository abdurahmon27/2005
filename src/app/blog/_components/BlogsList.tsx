import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useCallback } from "react";
import { BlogCard } from "./BlogCard";
import { useBlogSearch } from "./useBlogSearch";
import Image from "next/image";

export function BlogsList() {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs", "published"],
    queryFn: async () => {
      const res = await fetch("/api/blog?published=true");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 20,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 5,
  });

  const { search, tag, filtered, onTagClick, onSearch, clearFilters } =
    useBlogSearch(blogs || []);

  const allTags = useMemo(() => {
    if (!blogs || !Array.isArray(blogs)) return [];
    return Array.from(new Set(blogs.flatMap((b: any) => b.tags || [])));
  }, [blogs]);

  const memoizedOnTagClick = useCallback(
    (tag: string) => {
      onTagClick(tag);
    },
    [onTagClick]
  );

  if (isLoading) return <div className="p-8 text-center">Loading blogs...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500">Failed to load blogs</div>
    );
  if (!blogs?.length)
    return <div className="p-8 text-center">No blogs found.</div>;

  return (
    <div className="fire-code w-full">
      <div className="w-full flex justify-between items-start relative">
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            <span className="text-xs text-[#7c7c7c] mr-2">tags:</span>
            {allTags.map((t) => (
              <TagButton
                key={t}
                tag={t}
                isActive={tag === t}
                onClick={memoizedOnTagClick}
              />
            ))}
          </div>
        )}
        <div className="w-auto h-auto translate-y-10 relative max-md:hidden">
          <Image
            src="/blog-boy-2.png"
            alt="Blog Boy"
            width={200}
            height={200}
            priority={false}
            loading="lazy"
            className=""
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 items-center w-full">
        <input
          type="text"
          value={search}
          onChange={onSearch}
          placeholder="Search blogs..."
          className="px-3 py-2 rounded w-full bg-[#232425] border border-[#393939] text-sm text-[#e7c664] focus:outline-none focus:ring-2 focus:ring-[#e7c664]"
        />
        {(tag || search) && (
          <button
            onClick={clearFilters}
            className="ml-2 px-2 py-1 rounded bg-[#393939] text-xs text-[#e7c664] hover:bg-[#232425]"
          >
            Clear
          </button>
        )}
        {tag && (
          <span className="ml-2 text-xs text-[#e7c664]">
            tags: <b className="underline">#{tag}</b>
          </span>
        )}
      </div>

      <div className="flex items-center justify-center flex-col gap-4 w-full">
        {filtered.map((blog: any) => (
          <BlogCard key={blog.id} blog={blog} onTagClick={memoizedOnTagClick} />
        ))}
      </div>
    </div>
  );
}

const TagButton = React.memo(
  ({
    tag,
    isActive,
    onClick,
  }: {
    tag: string;
    isActive: boolean;
    onClick: (tag: string) => void;
  }) => {
    const handleClick = useCallback(() => {
      onClick(tag);
    }, [tag, onClick]);

    return (
      <button
        className={`px-2 py-0.5 rounded text-xs underline transition-colors cursor-pointer ${
          isActive
            ? " text-[#e7c664]"
            : " text-[#7c7c7c] hover:text-[#e7c664] hover:border-[#e7c664]"
        }`}
        onClick={handleClick}
        type="button"
      >
        #{tag}
      </button>
    );
  }
);
