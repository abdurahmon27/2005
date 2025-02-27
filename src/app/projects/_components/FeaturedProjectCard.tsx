import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ExternalLink, GitFork, Github, PlayCircle, Star } from "lucide-react";


export const FeaturedProjectCard: React.FC<{
    project: Project;
    onProjectClick: (project: Project) => void;
}> = ({ project, onProjectClick }) => {
    return (
        <div className="block group" onClick={() => onProjectClick(project)}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group-hover:border-primary/30 border-primary/10 cursor-pointer">
                <div className="flex flex-col lg:flex-row h-full">
                    {project.thumb && (
                        <div className="w-full lg:w-1/2 h-64 lg:h-auto overflow-hidden relative">
                            <Image
                                src={project.thumb}
                                alt={project.title}
                                width={600}
                                height={400}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

                            <div className="absolute top-4 left-4">
                                <Badge variant="default" className="bg-primary/90 hover:bg-primary">
                                    Featured Project
                                </Badge>
                            </div>
                        </div>
                    )}

                    <div className={cn("flex flex-col justify-between h-full", project.thumb ? "w-full lg:w-1/2" : "w-full")}>
                        <CardHeader className="flex-grow py-5 px-6">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <Badge variant="outline" className="text-xs font-normal rounded-md bg-primary/5 border-primary/20">
                                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                                </Badge>
                                <Badge variant="outline" className="text-xs font-normal rounded-md">
                                    {project.status.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                </Badge>
                            </div>

                            <div onClick={() => onProjectClick(project)} className="group cursor-pointer">
                                <CardTitle className="group-hover:text-primary transition-colors duration-300 text-2xl">
                                    {project.title}
                                </CardTitle>
                            </div>

                            <CardDescription className="mt-4 text-base">
                                {project.longDescription || project.preview || project.description}
                            </CardDescription>

                            <div className="flex flex-wrap gap-2 mt-6">
                                {project.technologies.map((tech) => (
                                    <Badge
                                        key={tech.name}
                                        variant="secondary"
                                        className="rounded-md font-normal text-xs px-3 py-1"
                                        style={tech.color ? { backgroundColor: `${tech.color}20`, color: tech.color } : {}}
                                    >
                                        {tech.name}
                                    </Badge>
                                ))}
                            </div>
                        </CardHeader>

                        <CardFooter className="border-t pt-4 pb-5 px-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
                                <div className="flex items-center gap-4">
                                    {project.stats && (
                                        <div className="flex items-center gap-4">
                                            {project.stats.stars && (
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-amber-400 stroke-amber-400" />
                                                    <span className="text-sm font-medium">{project.stats.stars}</span>
                                                </div>
                                            )}
                                            {project.stats.forks && (
                                                <div className="flex items-center gap-1">
                                                    <GitFork className="h-4 w-4" />
                                                    <span className="text-sm font-medium">{project.stats.forks}</span>
                                                </div>
                                            )}
                                            {project.stats.users && (
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm font-medium">{project.stats.users.toLocaleString()} Users</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    {project.links.map((link) => {
                                        let icon;
                                        let label;
                                        switch (link.type) {
                                            case "github":
                                                icon = <Github className="h-4 w-4" />;
                                                label = "GitHub";
                                                break;
                                            case "live":
                                                icon = <ExternalLink className="h-4 w-4" />;
                                                label = "Live Demo";
                                                break;
                                            case "docs":
                                                icon = <BookOpen className="h-4 w-4" />;
                                                label = "Docs";
                                                break;
                                            case "demo":
                                                icon = <PlayCircle className="h-4 w-4" />;
                                                label = "Demo";
                                                break;
                                        }

                                        return (
                                            <Button
                                                key={link.type}
                                                size="sm"
                                                variant={link.type === "github" ? "default" : "outline"}
                                                className={link.type === "github" ? "bg-primary" : ""}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(link.url, '_blank');
                                                }}
                                            >
                                                {icon}
                                                <span className="ml-1">{label}</span>
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        </CardFooter>
                    </div>
                </div>
            </Card>
        </div>
    );
};