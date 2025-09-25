/* eslint-disable no-console */
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "a self-taught, nerd developer who loves to build things*";

  useEffect(() => {
    setIsVisible(true);

    // Typewriter effect
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, []);

  const achievements = [
    { role: "mentor at", org: "@teamituz", href: "https://teamit.uz" },
    {
      role: "Gopher Uzbekistan Chairman at",
      org: "@flossuz",
      href: "https://floss.uz",
    },
    {
      role: "single, socially awkward, loves cats at",
      org: "@home",
      href: "https://t.me/abdurahmon_mamadiyorov",
    },
  ];

  return (
    <section className="container mx-auto min-h-[100dvh] flex flex-col justify-center items-center py-12 relative overflow-hidden md:flex-row md:items-center md:justify-center max-md:overflow-auto max-md:mt-[350px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16 relative z-10">
        <div
          className={`relative transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative group">
            {/* Main image container */}
            <div className="relative h-56 w-56 md:h-72 md:w-72 rounded-full border-4 border-secondary bg-secondary overflow-hidden group-hover:border-accent transition-all duration-300">
              <div className="absolute inset-2 rounded-full overflow-hidden">
                <Image
                  src="/pur-pur.jpeg"
                  alt="Gatto - Developer"
                  width={288}
                  height={288}
                  className="h-full w-full object-cover transition-transform duration-500 "
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div
          className={`flex flex-col items-center text-center md:items-start md:text-left max-w-2xl transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Terminal-style header */}
          <div className="bg-secondary rounded-lg p-4 mb-6 w-full max-w-lg font-mono text-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-muted">~/portfolio</span>
            </div>
            <div className="text-accent">
              <span className="text-primary">$</span> whoami
            </div>
            <div className="text-foreground mt-1">Abdurahmon</div>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl font-bold tracking-tight mb-4 group cursor-pointer">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-300%">
              Abdurahmon
            </span>
            <span className="fira-code text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2">
              #haywan
            </span>
          </h1>

          {/* Typewriter subtitle */}
          <div className="mb-6 h-8 flex items-center">
            <p className="text-muted font-thin fira-code text-lg">
              {typedText}
              <span className="animate-pulse ml-1">|</span>
            </p>
          </div>

          {/* Description */}
          <div className="mb-8 space-y-4">
            <p className="text-lg text-foreground leading-relaxed">
              Curious by nature, driven by purpose — I do it all because
              <span className="text-accent font-semibold">
                {" "}
                excellence has no single path
              </span>
              .
            </p>

            {/* Achievement cards */}
            <div className="grid mt-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={` rounded-lg p-3 hover:border-accent transition-all duration-300 group ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${500 + index * 150}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl group-hover:scale-125 transition-transform duration-300">
                      &
                    </span>
                    <div className="flex-1">
                      <span className="text-foreground">
                        {achievement.role}
                      </span>
                      <span className="text-accent fira-code font-semibold ml-1">
                        {achievement.org == "@flossuz" ? (
                          <div className="w-full inline">
                            <Link
                              href={achievement.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {achievement.org}
                            </Link>{" "}
                            <span className="text-muted">&</span>{" "}
                            <Link
                              href={`https://gopher.uz`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              @gopheruz
                            </Link>
                          </div>
                        ) : (
                          <Link
                            href={achievement.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {achievement.org}
                          </Link>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto transition-all duration-1000 delay-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <Button
              asChild
              className="relative group overflow-hidden bg-accent hover:bg-accent/90 text-accent-foreground font-mono"
            >
              <Link href="/blog" className="flex items-center gap-2">
                <span className="relative z-10">read blog</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
            </Button>

            <Button
              variant="outline"
              asChild
              className="group font-mono border-muted hover:border-accent hover:bg-accent/10 hover:text-current"
            >
              <Link href="/about" className="flex items-center gap-2">
                <span>about me</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </Button>
          </div>

          {/* Tech stack indicators */}
          <div
            className={`mt-8 flex flex-wrap gap-2 justify-center md:justify-start transition-all duration-1000 delay-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {["Go", "TypeScript", "React"].map((tech, index) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs bg-secondary  rounded-full text-muted hover:text-accent hover:border-accent transition-all duration-300 cursor-default font-mono"
                style={{ animationDelay: `${1200 + index * 100}ms` }}
              >
                {tech}*
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
