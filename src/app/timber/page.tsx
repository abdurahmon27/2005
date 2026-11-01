import type { Metadata } from "next";
import Link from "next/link";

// The game is a static build in public/timber/play (from the timber-playable repo: `npm run build:web`),
// served at /timber/play by the rewrite in next.config.ts.
const PLAY = "/timber/play";
const RONDO = "https://t.me/rondogg_bot";

export const metadata: Metadata = {
  title: "Timber | a rising-wall puzzle game",
  description:
    "A wooden wall rises from below and never stops. Plug the crack, break the rows, keep it off the top. Free to play in the browser.",
  openGraph: {
    title: "Timber",
    description: "A wooden wall rises from below and never stops. Plug the crack, break the rows, keep it off the top.",
    images: ["/timber/screenshot.png"],
  },
};

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[#32302f] py-6">
      <p className="mb-3 font-mono text-[0.7rem] text-[#7c6f64]">{label}</p>
      {children}
    </section>
  );
}

const li = "text-[0.92rem] leading-relaxed text-[#bdae93]";

export default function TimberPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8">
      <header className="mb-8">
        <h1 className="mb-3 text-[clamp(1.8rem,4vw,2.6rem)] leading-tight text-[#fe8019]">Timber</h1>
        <p className="max-w-2xl text-[1rem] leading-relaxed text-[#d5c4a1]">
          A wooden wall rises from below and never stops. Slide each piece over the lane you want, let go, and it drops
          straight down keeping its shape. Fill a row and it breaks; your own blocks then slide down into the gaps, which
          can break more rows in a chain. If the wall reaches the top, the run is over.
        </p>
        <p className="mt-3 font-mono text-[0.75rem] text-[#7c6f64]">puzzle · single player · free · no ads · touch, mouse, keyboard</p>
      </header>

      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
        <div className="w-full max-w-[380px] shrink-0">
          <div className="overflow-hidden rounded-2xl border border-[#504945] bg-[#1b0e07] shadow-[0_18px_40px_rgba(0,0,0,.5)]" style={{ aspectRatio: "9 / 16" }}>
            <iframe src={PLAY} title="Timber" className="block h-full w-full" allow="autoplay" loading="lazy" />
          </div>
          <Link
            href={PLAY}
            className="mt-3 block rounded-xl bg-[#a8442a] py-3 text-center font-semibold text-[#fbf1c7] transition-colors hover:bg-[#bd5534]"
          >
            Play full screen →
          </Link>
        </div>

        <div className="w-full min-w-0">
          <Section label="how to play">
            <ul className="list-disc space-y-1.5 pl-5">
              <li className={li}>Drag left or right to aim, lift your finger to drop. Rotate with the button or a second finger.</li>
              <li className={li}>Keyboard: ← → move, ↑ rotate, Enter or Space drop.</li>
              <li className={li}>The wall has a crack running up it. Pieces dropped down the crack break rows; a tall piece in a straight run of it breaks several at once.</li>
              <li className={li}>Rows score 100 × n² for n rows at once, cascades included. The wall rises faster every level and brings extra holes.</li>
              <li className={li}>There is no timer. The rising wall is the clock.</li>
            </ul>
          </Section>

          <Section label="where it runs">
            <p className={li}>
              Timber is already live in{" "}
              <Link href={RONDO} target="_blank" rel="noopener noreferrer" className="text-[#83a598] underline decoration-dotted underline-offset-[3px] hover:text-[#8ec07c]">
                Rondo
              </Link>
              , a Telegram mini-games app, where every run is replayed and verified on the server. This build is the same game
              (same engine, same art), packaged as a standalone web game.
            </p>
          </Section>

          <Section label="built for youtube playables">
            <ul className="list-disc space-y-1.5 pl-5">
              <li className={li}>Playables SDK loaded first; firstFrameReady, then gameReady once the menu is interactive (≈0.3 s).</li>
              <li className={li}>Cloud save (best score, best time, runs) through loadData / saveData; the best score is sent with sendScore.</li>
              <li className={li}>Pause and resume stop and restart the run clock, the game loop, input and sound. Follows YouTube&apos;s mute.</li>
              <li className={li}>Responsive in every aspect ratio (portrait and a landscape layout); a run survives resizing.</li>
              <li className={li}>English, Russian and Uzbek from the YouTube language setting.</li>
              <li className={li}>Canvas 2D, about 90 KB gzipped, 3 files, no external requests, no ads, no in-app purchases.</li>
            </ul>
          </Section>

          <Section label="made by">
            <p className={li}>Built by me. The engine, the wooden art and the sounds are all written from scratch in code; no third-party assets.</p>
          </Section>
        </div>
      </div>
    </main>
  );
}
