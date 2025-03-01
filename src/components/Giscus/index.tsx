"use client"
import Giscus from "@giscus/react";

export const GiscusComponent = ({

}) => {
  return (
    <Giscus
      id="comments"
      repo="abdurahmon27/2005.uz-disccussion"
      repoId="R_kgDOOBe1Pg"
      category="Announcements"
      categoryId="DIC_kwDOOBe1Ps4CndR0"
      mapping="pathname"
      term="Discussion"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="gruvbox_light"
      lang="en"
      loading="lazy"
    />
  );
};
