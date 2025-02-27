import Link from "next/link"


export default function BioSection() {
    return (
        <div className={`max-w-3xl mx-auto px-4 py-8 space-y-8 text-foreground`}>
            <div className="space-y-4 w-full">
                <h1 className="text-2xl font-medium tracking-tight">
                    I am Abdurahmon, a Software Engineer from Jizzax, Uzbekistan.
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed">
                    My journey into programming began in 2017, driven by curiosity and the need to understand how systems work. Over the years, I have built a strong foundation in JavaScript, TypeScript, React, and Node.js, refining my ability to design and develop software with precision.
                    <br /><br />
                    I often immerse myself in side projects, exploring ideas that interest me, sometimes at the expense of my primary work. I see programming as more than just building applications—it is a way to dissect problems, break them down, and construct solutions that are both efficient and maintainable.
                    <br /><br />
                    Currently, I am learning Go with databases, delving deeper into backend architecture and data management.
                </p>

                <div className="w-full flex items-center justify-center">
                    <Link href={'/blog/about'} className="mx-auto bg-primary text-secondary py-2 px-4 rounded-md hover:bg-primary/90">
                        More
                    </Link>
                </div>

            </div>
        </div>
    )
}
