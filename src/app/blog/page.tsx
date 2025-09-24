"use client";

import { BlogsList } from './_components/BlogsList';

export default function BlogPage() {
    return (
        <main className="max-w-5xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 fire-code">Blogs</h1>
            <BlogsList />
        </main>
    );
}