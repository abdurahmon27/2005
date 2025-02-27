import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import '@/app/globals.css'
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
        className={`${spaceGrotesk.variable} ${spaceGrotesk.className} antialiased tv-container bg-secondary`}
      >
        <div className="z-20">
          <SiteHeader />
          <div className="mt-20">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bekzotovich.uz",
  description: "I am a self-taught, nerd developer who loves to build things.",
};