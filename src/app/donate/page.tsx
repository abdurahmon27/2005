"use client";

import Link from "next/link";
import { useState } from "react";

const TIRIKCHILIK = "https://tirikchilik.uz/haywan";
const TELEGRAM = "https://t.me/abdurahmon_mamadiyorov";

const CARD = {
  number: "4278 3200 2518 8383",
  holder: "Raxmon Mamadiyorov",
};

const TON_ADDRESS = "UQDPo_oije20mUuEBx4r4rH1KNAzFAROL9c60yQRQ6rGfC8m";

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard is blocked (insecure context, denied permission) — the value
      // is selectable next to the button, so there is nothing else to do
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label}`}
      className="shrink-0 font-mono text-[0.7rem] text-[#665c54] transition-colors hover:text-[#fe8019]"
    >
      {copied ? "copied" : "copy"}
    </button>
  );
}

function Row({
  label,
  children,
  note,
}: {
  label: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="border-t border-[#32302f] py-5">
      <p className="mb-2 font-mono text-[0.7rem] text-[#7c6f64]">{label}</p>
      {children}
      {note && <p className="mt-2 text-[0.78rem] text-[#665c54]">{note}</p>}
    </div>
  );
}

export default function DonatePage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-12 sm:px-8">
      <header className="mb-8">
        <h1 className="mb-3 text-[clamp(1.6rem,3vw,2.1rem)] leading-tight text-[#fe8019]">
          Donate
        </h1>
        <p className="text-[0.92rem] leading-relaxed text-[#928374]">
          Everything I build is free and open. If something here saved you time —
          or you just want to keep the lab running — any of these work.
        </p>
      </header>

      <Row label="tirikchilik" note="Cards and mobile wallets, through their checkout.">
        <Link
          href={TIRIKCHILIK}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.9rem] text-[#83a598] underline decoration-dotted underline-offset-[3px] transition-colors hover:text-[#8ec07c]"
        >
          tirikchilik.uz/haywan →
        </Link>
      </Row>

      <Row label="card" note={CARD.holder}>
        <div className="flex items-center gap-4">
          <code className="select-all font-mono text-[0.9rem] text-[#d5c4a1]">
            {CARD.number}
          </code>
          <CopyButton value={CARD.number.replace(/\s/g, "")} label="card number" />
        </div>
      </Row>

      <Row label="ton" note="TON network only.">
        <div className="flex items-start gap-4">
          <code className="min-w-0 select-all break-all font-mono text-[0.8rem] leading-relaxed text-[#d5c4a1]">
            {TON_ADDRESS}
          </code>
          <CopyButton value={TON_ADDRESS} label="TON address" />
        </div>
      </Row>

      <p className="mt-8 border-t border-[#32302f] pt-6 text-[0.8rem] text-[#665c54]">
        Questions, or another way to send it?{" "}
        <Link
          href={TELEGRAM}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#7c6f64] underline decoration-dotted underline-offset-[3px] hover:text-[#83a598]"
        >
          telegram
        </Link>
        {" · "}
        <Link
          href="/blog/about"
          className="text-[#7c6f64] underline decoration-dotted underline-offset-[3px] hover:text-[#83a598]"
        >
          about
        </Link>
      </p>
    </main>
  );
}
