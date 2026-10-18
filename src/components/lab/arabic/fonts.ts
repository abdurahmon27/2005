import { Amiri } from "next/font/google";

/** Amiri — a naskh face that keeps vowel marks readable at large sizes. */
const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

/** Put on the root of every course component so the font variable resolves. */
export const arabicFonts = amiri.variable;
