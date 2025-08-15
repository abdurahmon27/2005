"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { SquareArrowOutUpRight } from "lucide-react"

export function SiteHeader() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const path = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [scrolled])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const menu = document.getElementById("mobile-menu")
            const button = document.getElementById("menu-button")

            if (
                mobileMenuOpen &&
                menu &&
                button &&
                !menu.contains(event.target as Node) &&
                !button.contains(event.target as Node)
            ) {
                setMobileMenuOpen(false)
            }
        }

        if (mobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [mobileMenuOpen])

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-secondary backdrop-blur-sm shadow-md" : "bg-transparent"
                }`}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
                <Link
                    href="/"
                    className={`font-semibold text-lg transition-colors ${scrolled ? "text-foreground" : "text-foreground"}`}
                >
                    abdurahmon
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href="https://cod3.uz/"
                        target="_blank"
                        className={`text-sm font-medium transition-colors flex items-center gap-1 ${scrolled ? "text-foreground" : "text-muted-foreground hover:text-primary"}`}
                    >
                        Cod3 Lab
                        <SquareArrowOutUpRight className="inline-block h-3 w-3" aria-hidden="true" />
                    </Link>
                    <Link
                        href="/projects"
                        className={`text-sm font-medium transition-colors ${path.includes("/projects")
                            ? "text-primary"
                            : scrolled
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-primary"
                            }`}
                    >
                        Projects
                    </Link>
                    <Link
                        href="/blog"
                        className={`text-sm font-medium transition-colors ${path.includes("/blog")
                            ? "text-primary"
                            : scrolled
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-primary"
                            }`}
                    >
                        Blog
                    </Link>
                     <Link
                        href="/log"
                        className={`text-sm font-medium transition-colors ${path.includes("/log")
                            ? "text-primary"
                            : scrolled
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-primary"
                            }`}
                    >
                        Log
                    </Link>
                    <Link
                        href="https://t.me/abdurahmon_mamadiyorov"
                        className={`text-sm font-medium transition-colors flex items-center gap-1 ${scrolled ? "text-foreground" : "text-muted-foreground hover:text-primary"}`}
                    >
                        Channel
                        <SquareArrowOutUpRight className="inline-block h-3 w-3" aria-hidden="true" />
                    </Link>
                </nav>

                <button
                    id="menu-button"
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative focus:outline-none"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                    aria-expanded={mobileMenuOpen}
                >
                    <span
                        className={`block h-0.5 w-6 bg-current rounded-sm transition-all duration-300 ease-in-out ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                    ></span>
                    <span
                        className={`block h-0.5 w-6 bg-current rounded-sm transition-all duration-300 ease-in-out mt-1.5 ${mobileMenuOpen ? "opacity-0" : ""}`}
                    ></span>
                    <span
                        className={`block h-0.5 w-6 bg-current rounded-sm transition-all duration-300 ease-in-out mt-1.5 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                    ></span>
                </button>
            </div>

            <div
                id="mobile-menu"
                className={`md:hidden fixed right-0 w-3/4 h-screen bg-secondary z-40 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
                style={{ top: "64px" }}
            >
                <nav className="flex flex-col p-6 space-y-6">
                    <Link
                        href="https://cod3.uz/"
                        target="_blank"
                        className="text-base font-medium text-foreground transition-colors flex items-center gap-1"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Cod3 Lab
                        <SquareArrowOutUpRight className="inline-block h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link
                        href="/projects"
                        className="text-base font-medium text-foreground transition-colors flex items-center"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Projects
                    </Link>
                    <Link
                        href="/blog"
                        className="text-base font-medium text-foreground transition-colors flex items-center"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Blog
                    </Link>
                    <Link
                        href="https://t.me/abdurahmon_mamadiyorov"
                        className="text-base font-medium text-foreground transition-colors flex items-center gap-1"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Channel
                        <SquareArrowOutUpRight className="inline-block h-4 w-4" aria-hidden="true" />
                    </Link>
                </nav>
            </div>

            {mobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
                    style={{ top: "64px" }}
                    onClick={() => setMobileMenuOpen(false)}
                ></div>
            )}
        </header>
    )
}