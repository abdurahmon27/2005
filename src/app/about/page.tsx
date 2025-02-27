'use client'
import Link from "next/link"
import { motion } from "framer-motion"

export default function BioSection() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`max-w-3xl mx-auto px-4 py-8 space-y-8 text-foreground`}
        >
            <div className="space-y-4 w-full">
                <motion.h1
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl font-medium tracking-tight"
                >
                    I am Abdurahmon, a Software Engineer from Jizzax, Uzbekistan.
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-lg text-muted-foreground leading-relaxed"
                >
                    My journey into programming began in 2017, driven by curiosity and the need to understand how systems work. Over the years, I have built a strong foundation in JavaScript, TypeScript, React, and Node.js, refining my ability to design and develop software with precision.
                    <br /><br />
                    I often immerse myself in side projects, exploring ideas that interest me, sometimes at the expense of my primary work. I see programming as more than just building applications—it is a way to dissect problems, break them down, and construct solutions that are both efficient and maintainable.
                    <br /><br />
                    Currently, I am learning Go with databases, delving deeper into backend architecture and data management.
                </motion.p>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    className="w-full flex items-center justify-center"
                >
                    <Link href={'/blog/about'} className="mx-auto bg-primary text-secondary py-2 px-4 rounded-md hover:bg-primary/90">
                        More
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    )
}