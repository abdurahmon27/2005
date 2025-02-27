import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, GitFork, Star } from "lucide-react";
import Image from "next/image";
import { CardDescription, CardFooter, CardHeader, CardTitle, Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";


export const ProjectCard: React.FC<{
    project: Project;
    featured?: boolean;
    onProjectClick: (project: Project) => void;
}> = ({ project, featured = false, onProjectClick }) => {
    return (
        <div className="block group" onClick={() => onProjectClick(project)}>
            <Card className={cn(
                "overflow-hidden transition-all duration-300 hover:shadow-md group-hover:border-primary/30 h-full cursor-pointer",
                featured ? "border-primary/20" : ""
            )}>
                <div className="flex flex-col h-full">
                    {project.thumb && (
                        <div className="w-full h-48 overflow-hidden relative">
                            <Image
                                src={project.thumb}
                                alt={project.title}
                                width={600}
                                height={400}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                            {featured && (
                                <div className="absolute top-3 right-3">
                                    <Badge variant="default" className="bg-primary/90 hover:bg-primary">
                                        Featured
                                    </Badge>
                                </div>
                            )}

                            <div className="absolute bottom-3 left-3 flex gap-2">
                                <Badge variant="outline" className="bg-black/60 border-none text-white backdrop-blur-sm">
                                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                                </Badge>
                                <Badge variant="outline" className="bg-black/60 border-none text-white backdrop-blur-sm">
                                    {project.status.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                </Badge>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col justify-between flex-grow">
                        <CardHeader className="flex-grow py-4 px-5">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs font-normal rounded-md bg-primary/5 border-primary/20">
                                    {new Date(project.startDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        year: "numeric",
                                    })}
                                    {project.endDate ? ` - ${new Date(project.endDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        year: "numeric",
                                    })}` : " - Present"}
                                </Badge>

                                {project.stats && project.stats.stars && (
                                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                                        <Star className="h-3 w-3 fill-amber-400 stroke-amber-400" />
                                        <span>{project.stats.stars}</span>
                                    </div>
                                )}
                                {project.stats && project.stats.forks && (
                                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                                        <GitFork className="h-3 w-3" />
                                        <span>{project.stats.forks}</span>
                                    </div>
                                )}
                            </div>

                            <CardTitle className="group-hover:text-primary transition-colors duration-300 text-xl">
                                {project.title}
                            </CardTitle>

                            <CardDescription className="mt-2 line-clamp-3 text-sm">
                                {project.preview || project.description}
                            </CardDescription>
                        </CardHeader>

                        <CardFooter className="border-t pt-3 pb-4 px-5">
                            <div className="flex justify-between items-center w-full">
                                <div className="flex flex-wrap gap-1.5">
                                    {project.technologies.slice(0, 3).map((tech) => (
                                        <Badge
                                            key={tech.name}
                                            variant="secondary"
                                            className="rounded-md font-normal text-xs bg-secondary/50"
                                            style={tech.color ? { backgroundColor: `${tech.color}20`, color: tech.color } : {}}
                                        >
                                            {tech.name}
                                        </Badge>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <Badge variant="outline" className="rounded-md text-xs">
                                            +{project.technologies.length - 3}
                                        </Badge>
                                    )}
                                </div>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-0 h-8 px-2 text-primary group-hover:translate-x-1 transition-transform hover:bg-primary/5"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onProjectClick(project);
                                    }}
                                >
                                    View Project
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </div>
                        </CardFooter>
                    </div>
                </div>
            </Card>
        </div>
    );
};