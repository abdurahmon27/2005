"use client";
import React from "react";
import type { Highlighter, BuiltinLanguage, ThemedToken } from "shiki";

type CodeBlockProps = {
  code: string;
  language?: string;
};

const theme = "gruvbox-dark-soft";

export function CodeBlock({ code, language = "txt" }: CodeBlockProps) {
  const [tokens, setTokens] = React.useState<ThemedToken[][]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(false);
      try {
        const shiki = await import("shiki");
        const highlighter: Highlighter = await shiki.createHighlighter({
          themes: [theme],
          langs: [
            "txt",
            "javascript",
            "typescript",
            "jsx",
            "tsx",
            "html",
            "css",
            "json",
            "markdown",
            "python",
            "bash",
            "sql",
          ],
        });
        let lang = language;
        if (
          !highlighter.getLoadedLanguages().includes(lang as BuiltinLanguage)
        ) {
          lang = "txt";
        }
        const result = highlighter.codeToTokens(code, {
          lang: lang as BuiltinLanguage,
          theme,
        });
        if (mounted) setTokens(result.tokens);
      } catch (e) {
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [code, language]);

  return (
    <div className="bg-transparent rounded-lg my-4 overflow-hidden relative">
      <div className="p-4">
        {loading || error ? (
          <pre className="fire-code bg-[#252525] rounded-lg p-4 text-sm overflow-x-auto">
            <code>{code}</code>
          </pre>
        ) : (
          <pre
            className="m-0 overflow-x-auto bg-transparent text-sm"
            style={{ background: "none" }}
          >
            {tokens.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.map((token, j) => (
                  <span key={j} style={{ color: token.color }}>
                    {token.content}
                  </span>
                ))}
              </div>
            ))}
          </pre>
        )}
      </div>
    </div>
  );
}
