import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${spaceGrotesk.className} antialiased bg-secondary`}
      >
        <div className="tv-effects-overlay"></div>
        
        <SiteHeader />
        <main className="mt-20 tv-container">
          <div className="content-above-tv">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bekzotovich | Software Engineer | CS Student",
  description: "a self-taught, nerd developer who loves to build things.",
};