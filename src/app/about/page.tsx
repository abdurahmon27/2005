
import React from "react";

export default function AboutPage() {
    const aboutData = {
        title: "About Me",
        publish_date: "2017-01-01",
        updated_at: "2025-09-24",
        readingTime: 3,
        tags: ["about", "bio", "personal"],
        blocks: [
            {
                type: "heading_1",
                content: [{ content: "I am Abdurahmon, a Software Engineer from Jizzax, Uzbekistan." }],
            },
            {
                type: "paragraph",
                content: [
                    {
                        content:
                            "My journey into programming began in 2017, driven by curiosity and the need to understand how systems work. Over the years, I have built a strong foundation in JavaScript, TypeScript, React, and Node.js, refining my ability to design and develop software with precision.\n\nI often immerse myself in side projects, exploring ideas that interest me, sometimes at the expense of my primary work. I see programming as more than just building applications—it is a way to dissect problems, break them down, and construct solutions that are both efficient and maintainable.\n\nCurrently, I am learning Go with databases, delving deeper into backend architecture and data management.",
                    },
                ],
            },
            {
                type: "paragraph",
                content: [
                    {
                        content: "You can learn more about me on the ",
                    },
                    {
                        content: "blog about page",
                        href: "/blog/about",
                    },
                    {
                        content: ".",
                    },
                ],
            },
        ],
    };

    return (
        <div className="min-h-screen bg-current py-10">
            <article className="font-mono bg-secondary rounded-lg mx-auto mt-8 mb-8 overflow-hidden container">
                <div className="px-8 py-8">
                    <BlogPageContent blog={aboutData} />
                </div>
            </article>
        </div>
    );
}

function BlogPageContent({ blog }: { blog: any }) {
    return (
        <>
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4 leading-tight text-primary">{blog.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-4">
                    <span className="flex items-center gap-2">
                        <span>::</span>
                        <span>{new Date(blog.publish_date).toLocaleDateString()}</span>
                    </span>
                    <span className="flex items-center gap-2">
                        <span>::</span>
                        <span>Updated {new Date(blog.updated_at).toLocaleDateString()}</span>
                    </span>
                    <span className="flex items-center gap-2">
                        <span>::</span>
                        <span>{blog.readingTime} min read</span>
                    </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                    {blog.tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 text-xs text-primary font-mono rounded-full hover:border-accent transition-colors">#{tag}</span>
                    ))}
                </div>
                <div className="square-dotted-border pt-6"></div>
                <div className="square-dotted-border mt-1"></div>
            </header>
            <div className="prose prose-invert max-w-none">
                {blog.blocks.map((block: any, i: number) => {
                    if (block.type === "heading_1") {
                        return <h1 key={i} className="text-3xl font-bold text-primary mb-2 border-b border-muted pb-2">{block.content[0].content}</h1>;
                    }
                    if (block.type === "paragraph") {
                        return <p key={i} className="text-foreground mb-4 leading-relaxed whitespace-pre-wrap">{block.content.map((c: any, j: number) => c.href ? <a key={j} href={c.href} className="text-accent underline underline-offset-2 hover:text-primary transition-colors">{c.content}</a> : c.content)}</p>;
                    }
                    return null;
                })}
            </div>
        </>
    );
}