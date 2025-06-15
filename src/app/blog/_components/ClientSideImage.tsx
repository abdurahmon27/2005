"use client"
import Image from 'next/image';

export const ClientSideImage = ({
    thumb,
    title,
}:
    {
        thumb: string,
        title: string
    }
) => {
    return (
        <div className="w-full md:w-1/4 h-48 md:h-auto relative">
            <Image
                src={thumb}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105 z-0"
                onLoad={(e) => {
                    e.currentTarget.classList.remove("opacity-0");
                    e.currentTarget.classList.add("opacity-100");
                }}
                onError={(e) => {
                    e.currentTarget.src = "/placeholder.jpeg";
                }}
                loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
        </div>
    )
}
