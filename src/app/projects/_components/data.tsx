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
        title: "GSK PRO | Telegram Bot",
        slug: "cod3-lab",
        category: "telegram-bot",
        level: "highlighted",
        status: "completed",
        description: "A company that provides services in several categories including PWA, SPA, Telegram Bot, Landing Pages, and IT",
        preview: "Cod3 Lab is a software development company that provides services in several categories including Progressive Web Apps, Single Page Applications, Telegram Bots, Landing Pages, and IT Consultation.",
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
        id: "p7",
        title: "S-yurist",
        slug: "s-yurist",
        category: "landing",
        level: "regular",
        status: "completed",
        description: "A company that provides services in several categories including PWA, SPA, Telegram Bot, Landing Pages, and IT",
        preview: "Cod3 Lab is a software development company that provides services in several categories including Progressive Web Apps, Single Page Applications, Telegram Bots, Landing Pages, and IT Consultation.",
        technologies: [
            { name: "TypeScript", color: "#3178C6" },
            { name: "Node.js", color: "#FF6F00" },
            { name: "Telegram API", color: "#0088CC" },
        ],
        thumb: "/s-yurist.jpg",
        links: [
            { type: "live", url: "https://t.me/gks_pro_bot" }
        ],
        stats: {
            users: 300
        },
        startDate: "2022-09-05",
        endDate: "2023-02-28"
    }
];