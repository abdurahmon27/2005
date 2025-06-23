"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  Youtube,
  Users,
  Eye,
  TrendingUp,
  Calendar,
  Globe,
  Zap,
  Play,
  BarChart3,
  Clock,
  Activity
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.2,
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

const heroVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.1
        }
    }
};

const pulseVariants = {
    pulse: {
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const ProjectsComponent: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setIsSheetOpen(true);
    };

    // Fetch subscriber count
    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response = await fetch('/api/subs');
                const data = await response.json();
                setSubscriberCount(data.subscribers);
            } catch (error) {
                console.error('Failed to fetch subscribers:', error);
                setSubscriberCount(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSubscribers();
        
        // Refresh every 30 seconds
        const interval = setInterval(fetchSubscribers, 30000);
        return () => clearInterval(interval);
    }, []);

    const mainProject = PROJECTS.find(p => p.id === "bekzotovich-youtube");
    
    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <motion.div
                    className="text-center mb-16"
                    variants={heroVariants}
                >
                    <div className="relative inline-block">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-2xl opacity-20"
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <Youtube className="h-24 w-24 text-red-500 relative z-10 mx-auto mb-6" />
                    </div>
                    
                    <motion.h1 
                        className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-red-600 bg-clip-text text-transparent mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        @bekzotovich
                    </motion.h1>
                    
                    <motion.p 
                        className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Welcome to my YouTube journey! Join me as I share programming tutorials, 
                        tech insights, and development experiences with the community.
                    </motion.p>

                    {/* Real-time Subscriber Count */}
                    <motion.div
                        className="inline-flex items-center gap-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 
                                   border border-red-500/20 rounded-full px-8 py-4 backdrop-blur-sm"
                        variants={pulseVariants}
                        animate="pulse"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Users className="h-6 w-6 text-red-500" />
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground">Subscribers</div>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={subscriberCount}
                                    className="text-2xl font-bold text-red-500"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {isLoading ? (
                                        <div className="animate-pulse">Loading...</div>
                                    ) : (
                                        subscriberCount?.toLocaleString() || "0"
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <motion.div
                            className="h-2 w-2 bg-green-500 rounded-full"
                            animate={{ 
                                opacity: [1, 0.5, 1],
                                scale: [1, 1.2, 1] 
                            }}
                            transition={{ 
                                duration: 2, 
                                repeat: Infinity 
                            }}
                        />
                        <span className="text-sm text-green-500 font-medium">Live</span>
                    </motion.div>
                </motion.div>

                {/* Main Project Card */}
                {mainProject && (
                    <motion.div
                        className="mb-16"
                        variants={itemVariants}
                    >
                        <Card className="relative overflow-hidden border-2 border-red-500/20 bg-gradient-to-br from-red-500/5 to-pink-500/5 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-50" />
                            
                            <CardHeader className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <Badge variant="secondary" className="bg-red-500/20 text-red-500 border-red-500/30">
                                        Featured Project
                                    </Badge>
                                    <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/30">
                                        {mainProject.status.charAt(0).toUpperCase() + mainProject.status.slice(1)}
                                    </Badge>
                                </div>
                                
                                <CardTitle className="text-3xl mb-2 flex items-center gap-3">
                                    <Youtube className="h-8 w-8 text-red-500" />
                                    {mainProject.title}
                                </CardTitle>
                                
                                <CardDescription className="text-lg">
                                    {mainProject.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="relative z-10">
                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                                            <Zap className="h-4 w-4 text-yellow-500" />
                                            Technologies Used
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {mainProject.technologies.map((tech, index) => (
                                                <motion.div
                                                    key={tech.name}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <Badge 
                                                        variant="outline" 
                                                        className="hover:scale-105 transition-transform"
                                                        style={{ 
                                                            borderColor: tech.color + '40',
                                                            backgroundColor: tech.color + '10',
                                                            color: tech.color 
                                                        }}
                                                    >
                                                        {tech.name}
                                                    </Badge>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-blue-500" />
                                            Project Timeline
                                        </h4>
                                        <div className="space-y-2 text-sm text-muted-foreground">
                                            <div>Started: {new Date(mainProject.startDate).toLocaleDateString()}</div>
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="h-4 w-4 text-green-500" />
                                                Actively maintained and growing
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    {mainProject.links.map((link, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Button
                                                className="bg-red-500 hover:bg-red-600 text-white"
                                                onClick={() => window.open(link.url, '_blank')}
                                            >
                                                {link.type === 'live' ? (
                                                    <>
                                                        <Youtube className="h-4 w-4 mr-2" />
                                                        Visit Channel
                                                    </>
                                                ) : (
                                                    <>
                                                        <Globe className="h-4 w-4 mr-2" />
                                                        {link.type === 'demo' ? 'API Demo' : 'Visit'}
                                                    </>
                                                )}
                                                <ExternalLink className="h-4 w-4 ml-2" />
                                            </Button>
                                        </motion.div>
                                    ))}
                                    
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            variant="outline"
                                            onClick={() => handleProjectClick(mainProject)}
                                            className="border-red-500/30 hover:bg-red-500/5"
                                        >
                                            <Eye className="h-4 w-4 mr-2" />
                                            View Details
                                        </Button>
                                    </motion.div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* Additional Info Section */}
                <motion.div
                    className="grid md:grid-cols-3 gap-6 mb-16"
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                            <PlayCircle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Educational Content</h3>
                            <p className="text-sm text-muted-foreground">
                                Programming tutorials and coding walkthroughs
                            </p>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                            <Code className="h-12 w-12 text-green-500 mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Live Coding</h3>
                            <p className="text-sm text-muted-foreground">
                                Watch me build projects from scratch
                            </p>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                            <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Community</h3>
                            <p className="text-sm text-muted-foreground">
                                Join a growing community of developers
                            </p>
                        </Card>
                    </motion.div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    className="text-center bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-2xl p-8 border border-red-500/20"
                    variants={itemVariants}
                >
                    <h2 className="text-3xl font-bold mb-4">Join the Journey!</h2>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Subscribe to my YouTube channel and be part of an amazing community where we learn, 
                        code, and grow together. New content every week!
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button 
                            size="lg"
                            className="bg-red-500 hover:bg-red-600 text-white text-lg px-8 py-4"
                            onClick={() => window.open('https://youtube.com/@bekzotovich', '_blank')}
                        >
                            <Youtube className="h-5 w-5 mr-2" />
                            Subscribe Now
                            <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                    </motion.div>
                </motion.div>

                <div className="mt-16">
                    <GiscusComponent />
                </div>
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
                            {allTechnologies.slice(0, 15).map((tech, i) => (
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
                            {featuredProjects.slice(0, 4).map((project) => (
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