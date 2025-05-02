"use client";
import React from 'react';
import { Badge } from "@/components/ui/badge";
import type { Highlighter, BuiltinLanguage, ThemedToken } from 'shiki';

interface BlockProps {
    block: any;
}

// Map for common language aliases that might not be recognized directly by Shiki
const languageMap: Record<string, string> = {
    'plaintext': 'txt',
    'plain text': 'txt',
    'text': 'txt',
    'js': 'javascript',
    'ts': 'typescript',
    'py': 'python',
};

const ShikiCodeBlockAdvanced: React.FC<BlockProps> = ({ block }) => {
    // Normalize language identifier using the map or fallback to 'txt'
    const rawLanguage = block.language || 'txt';
    const language = languageMap[rawLanguage.toLowerCase()] || rawLanguage;
    
    const code = block.content.map((part: any) => part.content).join('');
    const [codeTokens, setCodeTokens] = React.useState<ThemedToken[][]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [loadError, setLoadError] = React.useState(false);

    React.useEffect(() => {
        const loadShiki = async () => {
            setIsLoading(true);
            setLoadError(false);
            
            try {
                const shiki = await import('shiki');
                const highlighter: Highlighter = await shiki.createHighlighter({
                    themes: ['andromeeda'],
                    // Use a standard set of common languages to avoid dynamic loading issues
                    langs: ['txt', 'javascript', 'typescript', 'jsx', 'tsx', 'html', 'css', 'json', 'markdown', 'python', 'bash', 'sql'],
                });

                // Try to highlight with requested language, fallback to txt if not available
                try {
                    const tokens = highlighter.codeToTokens(code, {
                        lang: language as BuiltinLanguage,
                        theme: 'andromeeda',
                    });
                    setCodeTokens(tokens.tokens);
                } catch (e) {
                    console.warn(`Language '${language}' not supported, using fallback`, e);
                    const tokens = highlighter.codeToTokens(code, {
                        lang: 'txt' as BuiltinLanguage,
                        theme: 'andromeeda',
                    });
                    setCodeTokens(tokens.tokens);
                }
            } catch (error) {
                console.error('Error loading Shiki:', error);
                setLoadError(true);
            } finally {
                setIsLoading(false);
            }
        };

        loadShiki();
    }, [code, language]);

    return (
        <div className="bg-[#252525] rounded-lg my-4 overflow-hidden relative">
            <div className="absolute top-2 right-2 z-10">
                <Badge variant="outline" className="text-xs uppercase bg-primary/80 text-secondary">
                    {block.language || 'Text'}
                </Badge>
            </div>

            <div className="p-4">
                {isLoading ? (
                    <pre>
                        <code className="text-sm block text-slate-300">{code}</code>
                    </pre>
                ) : loadError ? (
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