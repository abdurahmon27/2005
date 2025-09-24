import { useState, useCallback, useMemo } from "react";

export function useBlogSearch(blogs: any[]) {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");

  const filtered = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesTag = tag ? blog.tags?.includes(tag) : true;
      const matchesSearch = search
        ? (blog.title || "").toLowerCase().includes(search.toLowerCase()) ||
          (blog.preview || "").toLowerCase().includes(search.toLowerCase())
        : true;
      return matchesTag && matchesSearch;
    });
  }, [blogs, tag, search]);

  const onTagClick = useCallback((t: string) => {
    setTag(t);
    setSearch("");
  }, []);

  const onSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setTag("");
  }, []);

  const clearFilters = useCallback(() => {
    setTag("");
    setSearch("");
  }, []);

  return {
    search,
    setSearch,
    tag,
    setTag,
    filtered,
    onTagClick,
    onSearch,
    clearFilters,
  };
}
