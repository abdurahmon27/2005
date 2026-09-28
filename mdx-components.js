import { useMDXComponents as getBlogMDXComponents } from "nextra-theme-blog";

import { LabArticle } from "./src/components/lab/lab-article";

const blogComponents = getBlogMDXComponents();
const BlogWrapper = blogComponents.wrapper;

export function useMDXComponents(components) {
  return {
    ...blogComponents,
    /** Pages with `lab: true` in their frontmatter get the garden shell. */
    wrapper(props) {
      if (props.metadata?.lab) {
        return <LabArticle {...props} />;
      }
      return <BlogWrapper {...props} />;
    },
    ...components,
  };
}
