"use client";
import React from 'react';
import { Badge } from "@/components/ui/badge";
import type { Highlighter, BuiltinLanguage, ThemedToken } from 'shiki';

interface BlockProps {
    block: any;
}

const ShikiCodeBlockAdvanced: React.FC<BlockProps> = ({ block }) => {
    const language = block.language || 'plaintext';
    const code = block.content.map((part: any) => part.content).join('');
    const [codeTokens, setCodeTokens] = React.useState<ThemedToken[][]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const loadShiki = async () => {
            setIsLoading(true);
            const shiki = await import('shiki');
            const highlighter: Highlighter = await shiki.createHighlighter({
                themes: ['andromeeda'],
                langs: [language as BuiltinLanguage],
            });

            const tokens = highlighter.codeToTokens(code, {
                lang: language as BuiltinLanguage,
                theme: 'andromeeda',
            });

            setCodeTokens(tokens.tokens);
            setIsLoading(false);
        };

        loadShiki();
    }, [code, language]);

    return (
        <div className="bg-[#252525] rounded-lg my-4 overflow-hidden relative">
            <div className="absolute top-2 right-2 z-10">
                <Badge variant="outline" className="text-xs uppercase bg-primary/80 text-secondary">
                    {language}
                </Badge>
            </div>

            <div className="p-4">
                {isLoading ? (
                    <pre>
                        <code className="text-sm block text-slate-300">{code}</code>
                    </pre>
                ) : (
                    <pre className="m-0 overflow-x-auto">
                        {codeTokens.map((line, i) => (
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
};

export default ShikiCodeBlockAdvanced;