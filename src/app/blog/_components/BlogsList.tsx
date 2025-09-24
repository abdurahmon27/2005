import { useQuery } from "@tanstack/react-query";

import { BlogCard } from "./BlogCard";
import { useBlogSearch } from "./useBlogSearch";

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
  });

  const { search, tag, filtered, onTagClick, onSearch, clearFilters } =
    useBlogSearch(blogs || []);

  if (isLoading) return <div className="p-8 text-center">Loading blogs...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500">Failed to load blogs</div>
    );
  if (!blogs?.length)
    return <div className="p-8 text-center">No blogs found.</div>;

  // Collect all unique tags from blogs
  const allTags =
    blogs && Array.isArray(blogs)
      ? Array.from(new Set(blogs.flatMap((b: any) => b.tags || [])))
      : [];

  return (
    <div className="fire-code">
      {/* Tag filter bar */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <span className="text-xs text-[#7c7c7c] mr-2">tags:</span>
          {allTags.map((t) => (
            <button
              key={t}
              className={`px-2 py-0.5 rounded text-xs underline transition-colors cursor-pointer ${
                tag === t
                  ? " text-[#e7c664]"
                  : " text-[#7c7c7c] hover:text-[#e7c664] hover:border-[#e7c664]"
              }`}
              onClick={() => onTagClick(t)}
              type="button"
            >
              #{t}
            </button>
          ))}
        </div>
      )}
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
          <BlogCard key={blog.id} blog={blog} onTagClick={onTagClick} />
        ))}
      </div>
    </div>
  );
}
