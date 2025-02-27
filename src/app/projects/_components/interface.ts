interface Project {
    id: string
    title: string
    slug: string
    category: "web" | "landing" | "telegram-bot" | "other"
    level: "featured" | "highlighted" | "regular"
    status: "completed" | "in-progress" | "maintained" | "archived"
    description: string
    preview?: string
    longDescription?: string
    technologies: Technology[]
    thumb?: string
    images?: string[]
    links: ProjectLink[]
    stats?: ProjectStats
    startDate: string
    endDate?: string
    featured?: boolean
}

interface Technology {
    name: string
    icon?: string
    color?: string
}

interface ProjectLink {
    type: "github" | "live" | "docs" | "demo"
    url: string
}

interface ProjectStats {
    stars?: number
    forks?: number
    downloads?: number
    users?: number
}
