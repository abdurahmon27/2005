"use client";
import React from "react";
import { createHighlighter, type Highlighter } from "shiki";

type CodeBlockProps = {
  code: string;
  language?: string;
};

const theme = "vesper";
const DEFAULT_LANGUAGE = "javascript";

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function CodeBlock({ code, language = DEFAULT_LANGUAGE }: CodeBlockProps) {
  const [html, setHtml] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);

        const highlighter: Highlighter = await createHighlighter({
          themes: [theme],
          langs: [language, DEFAULT_LANGUAGE],
        });

        const availableLanguages = highlighter.getLoadedLanguages();
        const langToUse = availableLanguages.includes(language)
          ? language
          : DEFAULT_LANGUAGE;

        const htmlResult = highlighter.codeToHtml(code, {
          lang: langToUse,
          theme: theme,
        });

        if (mounted) {
          setHtml(htmlResult);
          setLoading(false);
        }
      } catch (err) {
        console.error("Shiki highlight error:", err);
        if (mounted) {
          setHtml(`<pre><code>${escapeHtml(code)}</code></pre>`);
          setLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [code, language]);

  if (loading) {
    return (
      <div className="rounded-lg my-4 overflow-hidden relative">
        <div className="p-4">
          <div className="text-gray-300 text-sm">
            Loading syntax highlighting...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded square-dotted-border  my-4 overflow-hidden relative">
      <div className="bg-primary px-4 py-2 text-sm text-secondary border-b border-muted">
        {language}
      </div>
      <div className="p-4">
        <div
          className="text-sm overflow-x-auto [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!bg-transparent [&_pre]:!m-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
