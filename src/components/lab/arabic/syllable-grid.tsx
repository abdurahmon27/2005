"use client";

import "./arabic.css";

import { useState } from "react";

import {
  type Letter,
  type SyllableKind,
  HAMZA,
  LETTERS,
  LETTER_BY_ID,
  clip,
  syllable,
  syllableLatin,
} from "@/data/arabic/letters";

import { arabicFonts } from "./fonts";
import { play, playAll, usePlaying } from "./player";

const MODES: Record<string, { kinds: SyllableKind[]; marks: { text: string; name: string; latin: string }[] }> = {
  short: {
    kinds: ["a", "i", "u"],
    marks: [
      { text: "بَ", name: "fatḥa", latin: "a — stroke above" },
      { text: "بِ", name: "kasra", latin: "i — stroke below" },
      { text: "بُ", name: "ḍamma", latin: "u — little waw" },
    ],
  },
  long: {
    kinds: ["aa", "ii", "uu"],
    marks: [
      { text: "بَا", name: "fatḥa + alif", latin: "ā — two beats" },
      { text: "بِي", name: "kasra + yā", latin: "ī — two beats" },
      { text: "بُو", name: "ḍamma + wāw", latin: "ū — two beats" },
    ],
  },
  compare: {
    kinds: ["a", "aa", "i", "ii", "u", "uu"],
    marks: [],
  },
  tanween: {
    kinds: ["an", "in", "un"],
    marks: [
      { text: "بًا", name: "fatḥatān", latin: "-an" },
      { text: "بٍ", name: "kasratān", latin: "-in" },
      { text: "بٌ", name: "ḍammatān", latin: "-un" },
    ],
  },
  sukun: {
    kinds: ["a", "s"],
    marks: [{ text: "أَبْ", name: "sukūn", latin: "no vowel — stop on it" }],
  },
};

function Cell({ letter, kind, showLatin }: { letter: Letter; kind: SyllableKind; showLatin: boolean }) {
  const src = clip(letter, kind);
  const playing = usePlaying() === src;
  return (
    <button type="button" className="q-syl" data-playing={playing} onClick={() => play(src)}>
      <span className="q-ar" lang="ar">
        {syllable(letter, kind)}
      </span>
      {showLatin && <span className="q-latin">{syllableLatin(letter, kind)}</span>}
    </button>
  );
}

/**
 * `<SyllableGrid mode="short" />` — every letter with the marks of a lesson.
 * `letters="ba ta tha"` narrows it; press a row's first cell to hear the row.
 */
export function SyllableGrid({ mode = "short", letters }: { mode?: keyof typeof MODES; letters?: string }) {
  const [showLatin, setShowLatin] = useState(true);
  const config = MODES[mode];
  const rows = (letters ? letters.split(/\s+/).map((id) => LETTER_BY_ID.get(id)!) : [...LETTERS, HAMZA]).filter(
    (letter) => !(letter.id === "alif" && config.kinds.includes("s"))
  );

  return (
    <div className={`q-root not-prose ${arabicFonts}`}>
      <div className="q-grid-head">
        {config.marks.length > 0 && (
          <div className="q-marks">
            {config.marks.map((mark) => (
              <div key={mark.name} className="q-mark-card">
                <span className="q-ar" lang="ar">
                  {mark.text}
                </span>
                <strong>{mark.name}</strong>
                <span className="q-latin">{mark.latin}</span>
              </div>
            ))}
          </div>
        )}
        <div className="q-toolbar">
          <button type="button" className="q-chip" data-on={!showLatin} onClick={() => setShowLatin((value) => !value)}>
            {showLatin ? "hide latin — read it yourself" : "show latin"}
          </button>
        </div>
      </div>

      <div className="q-syl-grid" style={{ "--cols": config.kinds.length } as React.CSSProperties}>
        {rows.map((letter) => (
          <div key={letter.id} className="q-syl-row">
            <button
              type="button"
              className="q-syl-letter"
              title="Hear the whole row"
              onClick={() =>
                playAll(config.kinds.map((kind) => ({ src: clip(letter, kind), id: clip(letter, kind) })))
              }
            >
              {letter.char}
            </button>
            {config.kinds.map((kind) => (
              <Cell key={kind} letter={letter} kind={kind} showLatin={showLatin} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
