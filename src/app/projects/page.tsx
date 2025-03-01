"use client";
import type React from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Bot, Layers, Star, PlayCircle, BookOpen, Code, Projector } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { PROJECTS } from "./_components/data";
import { FeaturedProjectCard } from "./_components/FeaturedProjectCard";
import { ProjectSheet } from "./_components/ProjectSheet";
import { ProjectCard } from "./_components/ProjectCard";
import { motion } from "framer-motion";
import { GiscusComponent } from "@/components/Giscus";
import Giscus from "@giscus/react";

const getCategoryIcon = (category: string) => {
    switch (category) {
        case 'web':
            return <ExternalLink className="h-4 w-4" />;
        case 'landing':
            return <Projector className="h-4 w-4" />;
        case 'telegram-bot':
            return <Bot className="h-4 w-4" />;
        case 'library':
            return <BookOpen className="h-4 w-4" />;
        case 'game':
            return <PlayCircle className="h-4 w-4" />;
        default:
            return <Layers className="h-4 w-4" />;
    }
};

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.1
        }
    }
};

const techBadgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: any) => ({
        scale: 1,
        opacity: 1,
        transition: {
            delay: i * 0.05,
            type: "spring",
            stiffness: 100
        }
    })
};

const ProjectsComponent: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setIsSheetOpen(true);
    };

    const featuredProjects = PROJECTS.filter(p => p.level === "featured");
    const highlightedProjects = PROJECTS.filter(p => p.level === "highlighted");

    const categories = [...new Set(PROJECTS.map(project => project.category))];

    const allTechnologies = [...new Set(PROJECTS.flatMap(project => project.technologies.map(tech => tech.name)))];

    return (
        <motion.div
            className="container mx-auto px-4 py-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="flex flex-col gap-8">
                {/* Header Section */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                    variants={headerVariants}
                >
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Projects</h1>
                        <p className="text-muted-foreground mt-2">Explore my software development and research projects.</p>
                        <p className="text-muted-foreground mt-2">I&lsquo;m afraid to open source my projects at this point. Juniors will laugh at me.</p>
                    </div>

                    <div className="flex flex-col gap-3 w-full md:w-auto">
                        <div className="flex flex-wrap gap-2 py-1 max-w-md">
                            {allTechnologies.slice(0, 10).map((tech, i) => (
                                <motion.div
                                    key={tech}
                                    variants={techBadgeVariants}
                                    custom={i}
                                >
                                    <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap hover:bg-primary/5 hover:text-primary transition-colors">
                                        {tech}
                                    </Button>
                                </motion.div>
                            ))}
                            {allTechnologies.length > 10 && (
                                <motion.div
                                    variants={techBadgeVariants}
                                    custom={10}
                                >
                                    <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap hover:bg-primary/5 hover:text-primary transition-colors">
                                        +{allTechnologies.length - 10} more
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>

                <Separator className="bg-primary/10" />

                {/* Featured Projects */}
                {featuredProjects.length > 0 && (
                    <motion.div
                        className="space-y-6"
                        variants={itemVariants}
                    >
                        <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-primary" />
                            <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
                        </div>

                        <motion.div
                            className="space-y-6"
                            variants={containerVariants}
                        >
                            {featuredProjects.slice(0, 2).map((project) => (
                                <motion.div
                                    key={project.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    <FeaturedProjectCard
                                        project={project}
                                        onProjectClick={handleProjectClick}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}

                {/* Highlighted Projects */}
                {highlightedProjects.length > 0 && (
                    <motion.div
                        className="space-y-6 mt-10"
                        variants={itemVariants}
                    >
                        <div className="flex items-center gap-2">
                            <Layers className="h-5 w-5 text-primary" />
                            <h2 className="text-2xl font-bold tracking-tight">Highlighted Work</h2>
                        </div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            variants={containerVariants}
                        >
                            {highlightedProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    <ProjectCard
                                        project={project}
                                        onProjectClick={handleProjectClick}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}

                {/* Projects by Category */}
                <motion.div
                    className="space-y-6 mt-10"
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-primary" />
                        <h2 className="text-2xl font-bold tracking-tight">All Projects</h2>
                    </div>

                    <Tabs defaultValue={categories[0]} className="w-full">
                        <TabsList className="mb-6 flex flex-wrap h-auto">
                            <TabsTrigger value="all" className="data-[state=active]:bg-primary/10">All</TabsTrigger>
                            {categories.map((category) => (
                                <TabsTrigger
                                    key={category}
                                    value={category}
                                    className="data-[state=active]:bg-primary/10"
                                >
                                    <div className="flex items-center gap-1.5">
                                        {getCategoryIcon(category)}
                                        <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                                    </div>
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <TabsContent value="all" className="mt-0">
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                key="all"
                            >
                                {PROJECTS.map((project) => (
                                    <motion.div
                                        key={project.id}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        <ProjectCard
                                            project={project}
                                            featured={project.featured}
                                            onProjectClick={handleProjectClick}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </TabsContent>

                        {categories.map((category) => (
                            <TabsContent key={category} value={category} className="mt-0">
                                <motion.div
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    key={category}
                                >
                                    {PROJECTS.filter(project => project.category === category).map((project) => (
                                        <motion.div
                                            key={project.id}
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                            <ProjectCard
                                                project={project}
                                                featured={project.featured}
                                                onProjectClick={handleProjectClick}
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </motion.div>
                <GiscusComponent />
            </div>
            <ProjectSheet
                project={selectedProject}
                isOpen={isSheetOpen}
                onOpenChange={setIsSheetOpen}
            />

        </motion.div>
    );
}

export default ProjectsComponent