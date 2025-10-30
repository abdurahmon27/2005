import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const achievements = [
    { role: "Software Engineer at", org: "@numeo", href: "https://numeo.ai" },
    { role: "ex mentor at", org: "@teamituz", href: "https://teamit.uz" },
    {
      role: "Gopher Uzbekistan Chairman at",
      org: "@flossuz",
      href: "https://floss.uz",
    },
  ];

  return (
    <section className="container mx-auto min-h-[100dvh] flex flex-col justify-center items-center py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-2xl w-full">
        <div
          className={`mb-8 transform transition-all duration-700 w-full ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <h2 className="text-lg md:text-xl mb-4 font-mono text-foreground leading-relaxed min-h-[1.5em] break-words">
            {`a self-taught, nerd developer who loves automation`}
            <Image
              src={"/hero.jpeg"}
              alt="Not me"
              width={26}
              height={26}
              className="inline-block ml-2 -translate-y-1 rounded-md"
            />
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

        <div className="square-dotted-border  pt-6"></div>
        <div className="square-dotted-border mt-1"></div>

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
                <Link
                  href={achievement.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-2 decoration-foreground/30 hover:decoration-foreground transition-all text-primary hover:text-accent"
                >
                  {achievement.org}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="square-dotted-border  pt-6"></div>
        <div className="square-dotted-border mt-1"></div>

        <div
          className={`flex flex-col gap-3 transform transition-all duration-700 mt-10 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <Link
            href="/blog"
            className="inline-block underline decoration-2 decoration-foreground/30 hover:decoration-foreground transition-all font-mono font-bold text-base hover:text-primary"
          >
            → read blog
          </Link>
          <Link
            href="/projects"
            className="inline-block underline decoration-2 decoration-foreground/30 hover:decoration-foreground transition-all font-mono font-bold text-base hover:text-primary"
          >
            → view projects
          </Link>
          <Link
            href="/about"
            className="inline-block underline decoration-2 decoration-foreground/30 hover:decoration-foreground transition-all font-mono font-bold text-base hover:text-primary"
          >
            → about me
          </Link>
        </div>

        {/* Tech Stack */}
        <div
          className={`mt-8 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
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
