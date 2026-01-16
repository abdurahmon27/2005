import { useMDXComponents as getDocsMDXComponents } from "nextra-theme-blog";

const docsComponents = getDocsMDXComponents();

export function useMDXComponents(components) {
  return {
    ...docsComponents,
    ...components,
  };
}
