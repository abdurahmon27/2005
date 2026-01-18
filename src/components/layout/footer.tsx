"use client";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="container mx-auto flex items-center justify-center text-foreground pb-5 py-4">
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <a href="https://www.2005.uz">bekzotovich.uz</a>
      </p>
    </footer>
  );
}
