import Link from "next/link";
import { BlurImage } from "./BlurImage";
import React from "react";

type BlogCardProps = {
  blog: any;
  onTagClick?: (tag: string) => void;
};

export const BlogCard = React.memo(function BlogCard({
  blog,
  onTagClick,
}: BlogCardProps) {
  return (
    <article
      className="font-mono w-full bg-[#191a1c] border border-[#393939] rounded-xl shadow-md hover:shadow-xl transition flex flex-row items-stretch overflow-hidden min-h-[120px] mb-4"
      style={{ boxShadow: "0 2px 16px 0 #181818cc" }}
    >
      {blog.thumb && (
        <div className="flex-shrink-0 w-24 sm:w-32 h-24 sm:h-32 rounded-l-xl overflow-hidden flex items-center justify-center">
          <div className="flex items-center justify-center w-full h-full p-1">
            <BlurImage
              src={blog.thumb}
              alt={blog.title || "Blog thumbnail"}
              className="object-cover w-full h-full rounded"
              style={{
                objectPosition: "center center",
                display: "block",
                margin: "auto",
              }}
            />
          </div>
        </div>
      )}
      <div className="flex flex-col flex-1 gap-2 min-w-0 p-4">
        <header className="flex items-center gap-2 mb-1">
          <span className="text-xs text-[#7c7c7c] select-none font-semibold tracking-wide">
            {`// blog`}
          </span>
          <span className="ml-auto text-xs text-[#7c7c7c]">
            {blog.publish_date
              ? new Date(blog.publish_date).toLocaleDateString()
              : ""}
          </span>
        </header>
        <h2 className="text-lg font-bold text-[#e7c664] tracking-tight leading-tight truncate">
          <Link href={`/blog/${blog.route}`}>{blog.title || "Untitled"}</Link>
        </h2>
        <p className="text-[#b2b2b2] text-sm leading-snug line-clamp-3 whitespace-pre-line">
          {blog.preview || "No preview available"}
        </p>
        <div className="flex flex-wrap gap-1">
          {blog.tags &&
            blog.tags.map((tag: string) => (
              <button
                key={tag}
                className="bg-[#232425] border border-[#393939] text-[#7c7c7c] px-2 py-0.5 rounded text-xs hover:text-[#e7c664] hover:border-[#e7c664] transition-colors cursor-pointer"
                onClick={() => onTagClick && onTagClick(tag)}
                tabIndex={0}
                type="button"
              >
                #{tag}
              </button>
            ))}
        </div>
        <div className="flex items-center justify-between text-xs text-[#7c7c7c] mt-auto pt-2 border-t border-[#232425]">
          <span>{blog.readingTime ? `${blog.readingTime} min read` : ""}</span>
          <span className="italic">{blog.published ? "draft" : ""}</span>
        </div>
      </div>
    </article>
  );
});
