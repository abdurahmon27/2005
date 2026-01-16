"use client";
import Giscus from "@giscus/react";
import { usePathname } from "next/navigation";

export function GiscusComments() {
  const pathname = usePathname();

  if (pathname?.endsWith("support")) {
    return null;
  }

  return (
    <Giscus
      id="comments"
      repo="abdurahmon27/2005.uz-discussion"
      repoId="R_kgDOOBe1Pg"
      category="Announcements"
      categoryId="DIC_kwDOOBe1Ps4CndR0"
      mapping="pathname"
      term="Discussion"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="transparent_dark"
      lang="en"
      loading="lazy"
    />
  );
}
