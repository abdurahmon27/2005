import {  Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, GitFork, Github, PlayCircle, Star, X } from "lucide-react";
import Image from "next/image";


export const ProjectSheet: React.FC<{
    project: Project | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void
}> = ({ project, isOpen, onOpenChange }) => {
    if (!project) return null;

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent side="bottom" className="h-[85vh] overflow-y-auto p-0">
                <div className="max-w-5xl mx-auto w-full">
                    <SheetHeader className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-6 border-b">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs font-normal rounded-md bg-primary/5 border-primary/20">
                                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                                </Badge>
                                <Badge variant="outline" className="text-xs font-normal rounded-md">
                                    {project.status.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                </Badge>
                            </div>
                            <SheetClose className="rounded-full p-2 hover:bg-muted">
                                <X className="h-4 w-4" />
                            </SheetClose>
                        </div>
                        <SheetTitle className="text-3xl font-bold mt-2 text-left">{project.title}</SheetTitle>
                    </SheetHeader>

                    <div className="p-6">
                        {project.thumb && (
                            <div className="w-full h-full overflow-hidden relative rounded-lg mb-6">
                                <Image
                                    src={project.thumb}
                                    alt={project.title}
                                    width={1200}
                                    height={800}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <h3 className="text-xl font-semibold mb-4">Overview</h3>
                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="text-lg">{project.longDescription || project.preview || project.description}</p>
                                </div>

                                {project.images && project.images.length > 0 && (
                                    <div className="mt-8">
                                        <h3 className="text-xl font-semibold mb-4">Gallery</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {project.images.map((image, index) => (
                                                <div key={index} className="rounded-lg overflow-hidden h-48">
                                                    <Image
                                                        src={image}
                                                        alt={`${project.title} screenshot ${index + 1}`}
                                                        width={600}
                                                        height={400}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <h4 className="text-sm font-medium text-muted-foreground">Timeline</h4>
                                            <p className="mt-1">
                                                {new Date(project.startDate).toLocaleDateString("en-US", {
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                                {project.endDate ? ` - ${new Date(project.endDate).toLocaleDateString("en-US", {
                                                    month: "long",
                                                    year: "numeric",
                                                })}` : " - Present"}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-muted-foreground">Technologies</h4>
                                            <div className="flex flex-wrap gap-2 mt-2">
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
                                        </div>

                                        {project.stats && (
                                            <div>
                                                <h4 className="text-sm font-medium text-muted-foreground">Stats</h4>
                                                <div className="flex flex-wrap gap-4 mt-2">
                                                    {project.stats.stars && (
                                                        <div className="flex items-center gap-1">
                                                            <Star className="h-4 w-4 fill-amber-400 stroke-amber-400" />
                                                            <span className="text-sm font-medium">{project.stats.stars} Stars</span>
                                                        </div>
                                                    )}
                                                    {project.stats.forks && (
                                                        <div className="flex items-center gap-1">
                                                            <GitFork className="h-4 w-4" />
                                                            <span className="text-sm font-medium">{project.stats.forks} Forks</span>
                                                        </div>
                                                    )}
                                                    {project.stats.users && (
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-sm font-medium">{project.stats.users.toLocaleString()} Users</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Project Links</h3>
                                    <div className="flex flex-col gap-3">
                                        {project.links.map((link) => {
                                            let icon;
                                            let label;
                                            switch (link.type) {
                                                case "github":
                                                    icon = <Github className="h-4 w-4" />;
                                                    label = "View on GitHub";
                                                    break;
                                                case "live":
                                                    icon = <ExternalLink className="h-4 w-4" />;
                                                    label = "Visit Website";
                                                    break;
                                                case "docs":
                                                    icon = <BookOpen className="h-4 w-4" />;
                                                    label = "View Documentation";
                                                    break;
                                                case "demo":
                                                    icon = <PlayCircle className="h-4 w-4" />;
                                                    label = "Watch Demo";
                                                    break;
                                            }

                                            return (
                                                <Button
                                                    key={link.type}
                                                    size="default"
                                                    variant={link.type === "github" ? "default" : "outline"}
                                                    className={`w-full justify-start ${link.type === "github" ? "bg-primary" : ""}`}
                                                    onClick={() => window.open(link.url, '_blank')}
                                                >
                                                    {icon}
                                                    <span className="ml-2">{label}</span>
                                                </Button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <SheetFooter className="sticky bottom-0 border-t bg-background/95 backdrop-blur-sm p-6">
                        <div className="flex justify-between w-full">
                            <Button variant="outline" size="sm" asChild>
                                <SheetClose>Close</SheetClose>
                            </Button>
                            {project.links.find(link => link.type === "live") && (
                                <Button
                                    onClick={() => window.open(project.links.find(link => link.type === "live")?.url, '_blank')}
                                >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Visit Project
                                </Button>
                            )}
                        </div>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    );
};