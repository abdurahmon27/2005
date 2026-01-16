"use client";

import { BlogPage } from "@/components/blog";

// You may want to get the slug from the URL or use a static one for logs
// For demo, we'll use a static slug 'log' (adjust as needed)
const LogPage = () => {
    // If you have dynamic log slugs, use next/navigation or next/router to get params
    return <BlogPage slug="log" />;
}

export default LogPage;
