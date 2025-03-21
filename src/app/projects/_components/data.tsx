export const PROJECTS: Project[] = [
    {
        id: "p1",
        title: "Nerdy Thoughts",
        slug: "nerdy-thoughts",
        category: "web",
        level: "featured",
        status: "completed",
        description: "O'qishni sevuvchilar uchun yangi telegram ustiga qurilgan web ilova.",
        longDescription: "O'qishni sevuvchilar uchun yangi telegram ustiga qurilgan.",
        preview: "Loyiha uchun Gram.js dan foydalanilgan qaysiki telegram MTProto protokoliga asoslangan package. Loyihani faqat ideasi yaxshi application u darajada kuchli emas.",
        technologies: [
            { name: "React", color: "#61DAFB" },
            { name: "Gram.js", color: "#049EF4" },
            { name: "MTProto", color: "#0088CC" },
            { name: "Node.js", color: "#FF6F00" },
            { name: "TypeScript", color: "#3178C6" }
        ],
        thumb: "/nerd.jpg",
        images: [
            "/nerd-1.jpg",
            "/nerd-topic.jpg",
            "/nerd-user.jpg",
            "/nerd-post.jpg",
        ],
        links: [
            { type: "live", url: "https://nerd.uz" },
        ],
        stats: {
            users: 50
        },
        startDate: "2025-02-14",
        endDate: "2025-02-16",
        featured: true
    },
    {
        id: "latteo",
        title: "Latteo | Learn how to prepare different coffee types",
        slug: "latteo",
        category: "landing",
        level: "featured",
        status: "completed",
        description: "A simple landing page for a coffee preparation guide",
        longDescription: "Latteo is a simple landing page that provides a guide on how to prepare different types of coffee. It features a clean design and easy navigation.",
        preview: "Learn how to prepare different coffee types with Latteo. A simple landing page that provides a guide on coffee preparation.",
        technologies: [
            { name: "Next.js", color: "#000000" },
            { name: "TypeScript", color: "#3178C6" },
            { name: "TailwindCSS", color: "#06B6D4" }
        ],
        thumb: "/latteo.jpg",
        links: [
            { type: "live", url: "https://latteo.2005.uz" }
        ],
        startDate: "2025-04-20",
        endDate: "2024-04-21",
        featured: true,
    },
    {
        id: "p2",
        title: "Linkify | URL Shortener",
        slug: "linkify-url-shortener",
        category: "web",
        level: "featured",
        status: "completed",
        description: "A simple and powerful URL shortener with custom link names and click tracking",
        longDescription: "linkify.uz | shorten and name your links as you wish. And get a report on when and how many times they were clicked. I completed this project in 10 hours and made up to 50 for free, enjoy.",
        preview: "Shorten and customize your URLs with Linkify. Track clicks, create custom links, and share them with your audience. A simple and powerful tool for content creators and marketers.",
        technologies: [
            { name: "Next.js", color: "#000000" },
            { name: "TypeScript", color: "#3178C6" },
            { name: "Firebase", color: "#FFCA28" },
            { name: "TailwindCSS", color: "#06B6D4" }
        ],
        thumb: "/linkify.jpg",
        links: [
            { type: "live", url: "https://linkify.uz" }
        ],
        startDate: "2024-12-30",
        endDate: "2024-12-31",
        featured: true,
        stats: {
            users: 140
        }
    },
    {
        id: "p4",
        title: "Cod3 Lab",
        slug: "cod3-lab",
        category: "landing",
        level: "highlighted",
        status: "in-progress",
        description: "A company that provides services in several categories including PWA, SPA, Telegram Bot, Landing Pages, and IT",
        preview: "Cod3 Lab is a software development company that provides services in several categories including Progressive Web Apps, Single Page Applications, Telegram Bots, Landing Pages, and IT Consultation.",
        technologies: [
            { name: "Next.js", color: "#000000" },
            { name: "TypeScript", color: "#3178C6" },
            { name: "TailwindCSS", color: "#06B6D4" },
            { name: "Shad CN", color: "#FF6F00" },
        ],
        thumb: "/cod3.jpeg",
        links: [
            { type: "live", url: "https://whiteboard.example.com" }
        ],
        stats: {
            users: 0
        },
        startDate: "2025-02-15",
    },
    {
        id: "p5",
        title: "Portfolio Website",
        slug: "portfolio-web",
        category: "landing",
        level: "featured",
        status: "archived",
        description: "My personal portfolio website built with Next.js, TailwindCSS, and TypeScript",
        longDescription: "My personal portfolio website built with Next.js, TailwindCSS, and TypeScript. It features responsive design, and a clean layout.",
        preview: "My personal portfolio website built with Next.js, TailwindCSS, and TypeScript. It features responsive design, and a clean layout.",
        technologies: [
            { name: "Next.js", color: "#000000" },
            { name: "TypeScript", color: "#3178C6" },
            { name: "Firebase", color: "#FFCA28" },
            { name: "Notion API", color: "#000000" },
            { name: "TailwindCSS", color: "#06B6D4" }
        ],
        thumb: "/old-portfolio.jpg",
        links: [
            { type: "live", url: "https://bekzotovich.uz" }
        ],
        startDate: "2024-12-30",
        endDate: "2024-12-31",
        featured: true,
        stats: {
            users: 140
        }
    },
    {
        id: "p6",
        title: "Haywan Frontend CLI",
        slug: "haywan-next-cli",
        category: "cli",
        level: "highlighted",
        status: "completed",
        description: "Powerful CLI for creating modern Next.js projects with internationalization, UI components, and best practices",
        longDescription: "Haywan Frontend CLI is a powerful and specialized CLI tool designed for quickly creating modern Next.js projects with internationalization, UI components, and best practices. Developed by Haywan.uz, this installer simplifies the initial setup of complex web applications.",
        preview: "Create fully customizable Next.js projects with TypeScript, Tailwind CSS, next-intl internationalization, and ShadCN UI components through an interactive CLI experience.",
        technologies: [
            { name: "Node.js", color: "#68A063" },
            { name: "TypeScript", color: "#3178C6" },
            { name: "Next.js", color: "#000000" },
            { name: "CLI", color: "#121212" },
            { name: "npm", color: "#CB3837" }
        ],
        thumb: "/haywan-next-cli.png",
        links: [
            { type: "live", url: "https://www.npmjs.com/package/haywan-next-cli" },
            { type: "github", url: "https://github.com/abdurahmon27/haywan-next-cli" }
        ],
        startDate: "2025-03-05",
        endDate: "2025-03-05",
        featured: true,
    },
    {
        id: "p7",
        title: "GSK PRO | Telegram Bot",
        slug: "gsk-pro",
        category: "telegram-bot",
        level: "highlighted",
        status: "completed",
        description: "Just a simple telegram bot for GSK PRO",
        preview: "Just a simple telegram bot for GSK PRO",
        technologies: [
            { name: "TypeScript", color: "#3178C6" },
            { name: "Node.js", color: "#FF6F00" },
            { name: "Telegram API", color: "#0088CC" },
        ],
        thumb: "/gsk-pro.jpg",
        links: [
            { type: "live", url: "https://t.me/gks_pro_bot" }
        ],
        stats: {
            users: 300
        },
        startDate: "2022-09-05",
        endDate: "2023-02-28"
    },
    {
        id: "p8",
        title: "S-yurist",
        slug: "s-yurist",
        category: "landing",
        level: "regular",
        status: "completed",
        description: "Simplest landing page for my friend's law firm",
        preview: "Simplest landing page for my friend's law firm",
        technologies: [
            { name: "TypeScript", color: "#3178C6" },
            { name: "Node.js", color: "#FF6F00" },
            { name: "Telegram API", color: "#0088CC" },
        ],
        thumb: "/s-yurist.jpg",
        links: [
            { type: "live", url: "https://s-yurist.uz" }
        ],
        stats: {
            users: 300
        },
        startDate: "2022-09-05",
        endDate: "2023-02-28"
    }
];