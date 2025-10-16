/* eslint-disable no-console */
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "a self-taught, nerd developer who loves to build things";

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
      role: "loves cats at",
      org: "@home",
      href: "https://t.me/abdurahmon_mamadiyorov",
    },
  ];

  return (
    <section className="container mx-auto min-h-[100dvh] flex flex-col justify-center items-start py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden max-md:mt-[200px]">
      <div className="max-w-2xl">
        {/* Main Content */}
        <div
          className={`mb-8 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <h2 className="text-lg md:text-xl mb-4 fira-code text-foreground leading-relaxed">
            {typedText}
            <span className="animate-pulse">|</span>
          </h2>
        </div>

        {/* Description */}
        <div
          className={`mb-8 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Curious by nature, driven by purpose — I do it all because
            excellence has no single path.
          </p>
        </div>

        {/* using border-image square dotted double border */}
        <div className="square-dotted-border  pt-6"></div>
        <div className="square-dotted-border mt-1"></div>

        {/* Roles/Achievements */}
        <div
          className={`mb-8 space-y-3 transform transition-all duration-700 mt-10 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="flex gap-2 text-sm font-mono">
                <span className="text-muted-foreground">{`>`}</span>
                <span className="text-foreground">{achievement.role}</span>
                <a
                  href={achievement.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-2 decoration-foreground/30 hover:decoration-foreground transition-all text-primary hover:text-accent"
                >
                  {achievement.org}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* using border-image square dotted double border */}
        <div className="square-dotted-border  pt-6"></div>
        <div className="square-dotted-border mt-1"></div>

        {/* Links/CTA */}
        <div
          className={`flex flex-col gap-3 transform transition-all duration-700 mt-10 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <a
            href="/blog"
            className="inline-block underline decoration-2 decoration-foreground/30 hover:decoration-foreground transition-all font-mono font-bold text-base hover:text-primary"
          >
            → read blog
          </a>
          <a
            href="/projects"
            className="inline-block underline decoration-2 decoration-foreground/30 hover:decoration-foreground transition-all font-mono font-bold text-base hover:text-primary"
          >
            → view projects
          </a>
          <a
            href="/about"
            className="inline-block underline decoration-2 decoration-foreground/30 hover:decoration-foreground transition-all font-mono font-bold text-base hover:text-primary"
          >
            → about me
          </a>
        </div>

        {/* Tech Stack */}
        <div
          className={`mt-8 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <p className="text-xs font-mono text-muted-foreground mb-3">
            tech stack:
          </p>
          <div className="flex flex-wrap gap-2">
            {["Go", "TypeScript", "React"].map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-default"
              >
                #{tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
