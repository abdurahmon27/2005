import React from 'react'
import { getPageByRoute, getPageContent } from "@/utils/notion"
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ChevronLeft } from "lucide-react"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ShikiCodeBlock from './_components/CodeBlock'
import { Metadata } from 'next'
import { getNotionBlock } from '@/utils/getNotionBlock'

interface BlockProps {
    block: any
}

const TextRenderer: React.FC<{ text: any }> = ({ text }) => {
    if (!text) return null

    const { content, annotations, href } = text

    let component = <span>{content}</span>

    if (annotations?.bold) component = <strong>{component}</strong>
    if (annotations?.italic) component = <em>{component}</em>
    if (annotations?.underline) component = <u>{component}</u>
    if (annotations?.strikethrough) component = <s>{component}</s>
    if (annotations?.code) component = <code className="bg-muted px-1 py-0.5 rounded text-sm">{component}</code>

    if (href) return <a href={href} className="text-primary hover:underline">{component}</a>

    return component
}

const TextContent: React.FC<{ content: any[] }> = ({ content }) => {
    return (
        <>
            {content.map((text, index) => (
                <TextRenderer key={index} text={text} />
            ))}
        </>
    )
}

const ParagraphBlock: React.FC<BlockProps> = ({ block }) => (
    <p className="my-4 leading-relaxed">
        <TextContent content={block.content} />
    </p>
)

const HeadingOneBlock: React.FC<BlockProps> = ({ block }) => (
    <h1 className="text-3xl font-bold mt-8 mb-4">
        <TextContent content={block.content} />
    </h1>
)

const HeadingTwoBlock: React.FC<BlockProps> = ({ block }) => (
    <h2 className="text-2xl font-bold mt-6 mb-3">
        <TextContent content={block.content} />
    </h2>
)

const HeadingThreeBlock: React.FC<BlockProps> = ({ block }) => (
    <h3 className="text-xl font-semibold mt-5 mb-2">
        <TextContent content={block.content} />
    </h3>
)

const BulletedListItemBlock: React.FC<BlockProps> = ({ block }) => (
    <li className="ml-6 my-1 list-disc">
        <TextContent content={block.content} />
    </li>
)

const NumberedListItemBlock: React.FC<BlockProps> = ({ block }) => (
    <li className="ml-6 my-1 list-decimal">
        <TextContent content={block.content} />
    </li>
)

const ImageBlock: React.FC<BlockProps> = ({ block }) => (
    <figure className="my-6">
        <div className="rounded-lg overflow-hidden relative aspect-video">
            <Image
                src={block.content}
                alt={block.caption?.[0]?.content || "Blog post image"}
                fill
                className="object-cover"
            />
        </div>
        {block.caption && block.caption.length > 0 && (
            <figcaption className="text-sm text-muted-foreground text-center mt-2">
                <TextContent content={block.caption} />
            </figcaption>
        )}
    </figure>
)

const DividerBlock: React.FC<BlockProps> = () => (
    <hr className='w-full border-t border-t-primary' />
)



const TodoBlock: React.FC<BlockProps> = ({ block }) => (
    <div className="flex items-start gap-2 my-2">
        <input
            type="checkbox"
            checked={block.checked}
            readOnly
            className="mt-1"
        />
        <div>
            <TextContent content={block.content} />
        </div>
    </div>
)

const VideoBlock: React.FC<BlockProps> = async ({ block }) => {
    console.log(block)
    const res = await getNotionBlock(block.id)
    const url = res.video.external.url || 'sth for now';
    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

    const getYouTubeEmbedUrl = (url: string) => {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|.+?v=))([^?&]+)/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    };
    const embedUrl = isYouTube ? getYouTubeEmbedUrl(url) : url;
    console.log(embedUrl)
    return (
        isYouTube ? (
            <iframe
                width="560"
                height="315"
                src={embedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        ) : (
            <video controls width="100%">
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        )
    )
}

const BlockRenderer: React.FC<BlockProps> = ({ block }) => {
    switch (block.type) {
        case 'paragraph': return <ParagraphBlock block={block} />
        case 'heading_1': return <HeadingOneBlock block={block} />
        case 'heading_2': return <HeadingTwoBlock block={block} />
        case 'heading_3': return <HeadingThreeBlock block={block} />
        case 'bulleted_list_item': return <BulletedListItemBlock block={block} />
        case 'numbered_list_item': return <NumberedListItemBlock block={block} />
        case 'image': return <ImageBlock block={block} />
        case 'code': return <ShikiCodeBlock block={block} />
        case 'to_do': return <TodoBlock block={block} />
        case 'divider': return <DividerBlock block={block} />
        case 'video': return <VideoBlock block={block} />
        default: return `${block.type}`
    }
}

const GroupBlocks: React.FC<{ blocks: any[] }> = ({ blocks }) => {
    let currentListType: string | null = null
    let result: React.ReactNode[] = []
    let listItems: React.ReactNode[] = []

    const flushList = () => {
        if (listItems.length === 0) return

        result.push(
            currentListType === 'bulleted_list_item'
                ? <ul className="my-4" key={`list-${result.length}`}>{listItems}</ul>
                : <ol className="my-4" key={`list-${result.length}`}>{listItems}</ol>
        )
        listItems = []
        currentListType = null
    }

    blocks.forEach((block) => {
        if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
            if (currentListType && currentListType !== block.type) {
                flushList()
            }
            currentListType = block.type
            listItems.push(<BlockRenderer key={block.id} block={block} />)
        } else {
            flushList()
            result.push(<BlockRenderer key={block.id} block={block} />)
        }
    })

    flushList()

    return <>{result}</>
}

const calculateReadingTime = (blocks: any[]): number => {
    let totalWords = 0

    const countWordsInContent = (content: any): number => {
        if (typeof content === 'string') {
            return content.split(/\s+/).length
        } else if (Array.isArray(content)) {
            return content.reduce((sum, item) => {
                if (typeof item === 'object' && item.content) {
                    return sum + countWordsInContent(item.content)
                }
                return sum
            }, 0)
        }
        return 0
    }

    blocks.forEach((block) => {
        totalWords += countWordsInContent(block.content)
    })

    return Math.ceil(totalWords / 200) || 1
}

const PostPage = async ({ params }: { params: Promise<{ route: string }> }) => {
    const { route } = await params

    try {
        const page = await getPageByRoute(route)

        if (!page) {
            return notFound()
        }

        const blocks = await getPageContent(page.id)
        const readingTime = calculateReadingTime(blocks)

        const properties = page.properties as any
        const title = properties.title?.title[0]?.text.content || "Untitled"
        const publishDate = properties.publish_date?.date?.start
            ? new Date(properties.publish_date.date.start).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
            : null
        const tags = properties.tags?.multi_select?.map((tag: any) => tag.name) || []
        const thumb = properties.thumb?.files?.[0]?.file?.url || null
        const hasImage = !!thumb

        return (
            <article className="container mx-auto px-4 py-12 max-w-4xl">
                <Link href="/blog" className="inline-flex items-center mb-6">
                    <Button variant="ghost" size="sm" className="text-primary group">
                        <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                        Back to blog
                    </Button>
                </Link>

                {hasImage ? (
                    <div className="relative rounded-xl overflow-hidden mb-8">
                        <div className="w-full aspect-video relative">
                            <Image
                                src={thumb}
                                alt={title}
                                fill
                                className="object-cover"
                                priority
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white z-10">
                                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                                    {title}
                                </h1>

                                <div className="flex flex-wrap gap-4 mt-3">
                                    {publishDate && (
                                        <div className="flex items-center gap-1.5 text-white/80">
                                            <Calendar className="h-4 w-4" />
                                            <span className="text-sm">{publishDate}</span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-1.5 text-white/80">
                                        <Clock className="h-4 w-4" />
                                        <span className="text-sm">{readingTime} min read</span>
                                    </div>
                                </div>

                                {tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {tags.map((tag: string) => (
                                            <Badge key={tag} className="bg-white/20 text-white hover:bg-white/30 border-transparent">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mb-8 relative rounded-xl overflow-hidden">
                        <div className="bg-gradient-to-br from-primary/10 via-primary/20 to-primary/30 p-6 sm:p-8">
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                                {title}
                            </h1>

                            <div className="flex flex-wrap gap-4 mt-3">
                                {publishDate && (
                                    <div className="flex items-center gap-1.5 text-foreground/80">
                                        <Calendar className="h-4 w-4" />
                                        <span className="text-sm">{publishDate}</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-1.5 text-foreground/80">
                                    <Clock className="h-4 w-4" />
                                    <span className="text-sm">{readingTime} min read</span>
                                </div>
                            </div>

                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {tags.map((tag: string) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
                    <GroupBlocks blocks={blocks} />
                </div>
            </article>
        )
    } catch (error) {
        console.error("Error fetching post:", error)
        return notFound()
    }
}

export default PostPage

export async function generateMetadata({ params }: { params: Promise<{ route: string }> }): Promise<Metadata> {
    try {
        const { route } = await params
        const page = await getPageByRoute(route)

        if (!page) {
            return {
                title: 'Post Not Found',
            }
        }

        const properties = page.properties as any
        const title = properties.title?.title[0]?.text.content || "Untitled"
        const description = properties.description?.rich_text[0]?.text.content ||
            "Read this blog post on our website"
        const tags = properties.tags?.multi_select?.map((tag: any) => tag.name) || []
        const thumb = properties.thumb?.files?.[0]?.file?.url || null

        return {
            title,
            description,
            keywords: tags,
            openGraph: {
                title,
                description,
                type: 'article',
                publishedTime: properties.publish_date?.date?.start || undefined,
                authors: ['Your Name'],
                tags,
                images: thumb ? [{ url: thumb }] : undefined,
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: thumb ? [thumb] : undefined,
            }
        }
    } catch (error) {
        console.error("Error generating metadata:", error)
        return {
            title: 'Blog Post',
            description: 'Read our latest blog post',
        }
    }
}
