import { useState, useCallback, useMemo, useEffect } from "react";

export function useBlogSearch(blogs: any[]) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);

    return () => clearTimeout(timer);
  }, [search]);

  const filtered = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];

    return blogs.filter((blog) => {
      const matchesTag = tag ? blog.tags?.includes(tag) : true;
      if (!matchesTag) return false;

      const matchesSearch = debouncedSearch
        ? (blog.title || "")
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase()) ||
          (blog.preview || "")
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase())
        : true;

      return matchesSearch;
    });
  }, [blogs, tag, debouncedSearch]);

  const onTagClick = useCallback((t: string) => {
    setTag((current) => (current === t ? "" : t));
    setSearch("");
    setDebouncedSearch("");
  }, []);

  const onSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setTag("");
  }, []);

  const clearFilters = useCallback(() => {
    setTag("");
    setSearch("");
    setDebouncedSearch("");
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
    isSearching: search !== debouncedSearch,
    totalBlogs: blogs?.length || 0,
    filteredCount: filtered.length,
  };
}

export function useBlogSearchOptimized(blogs: any[]) {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");

  const searchLower = useMemo(() => search.toLowerCase(), [search]);

  const filtered = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];

    if (!tag && !search) return blogs;

    return blogs.filter((blog) => {
      if (tag && !blog.tags?.includes(tag)) return false;

      if (search) {
        const title = (blog.title || "").toLowerCase();
        const preview = (blog.preview || "").toLowerCase();

        if (!title.includes(searchLower) && !preview.includes(searchLower)) {
          return false;
        }
      }

      return true;
    });
  }, [blogs, tag, search, searchLower]);

  const onTagClick = useCallback((t: string) => {
    setTag((current) => (current === t ? "" : t));
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
    totalBlogs: blogs?.length || 0,
    filteredCount: filtered.length,
  };
}
