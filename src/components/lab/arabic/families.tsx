"use client";

import "./arabic.css";

import { FAMILIES, LETTERS, LETTER_BY_ID, LONERS, clip } from "@/data/arabic/letters";

import { arabicFonts } from "./fonts";
import { play, usePlaying } from "./player";

function LetterKey({ id }: { id: string }) {
  const letter = LETTER_BY_ID.get(id)!;
  const src = clip(letter, "name");
  const playing = usePlaying() === src;
  return (
    <button type="button" className="q-syl" data-playing={playing} onClick={() => play(src)}>
      <span className="q-ar" lang="ar">
        {letter.char}
      </span>
      <span className="q-latin">{letter.latin}</span>
    </button>
  );
}

/** `<Families />` — the nine skeletons and the letters that share each one. */
export function Families() {
  return (
    <div className={`q-root not-prose ${arabicFonts}`}>
      <div className="q-families">
        {FAMILIES.map((family) => (
          <div key={family.id} className="q-family">
            <div className="q-family-row">
              <span className="q-family-skeleton" lang="ar">
                {family.skeleton}
              </span>
              <span className="q-family-arrow">←</span>
              <div className="q-family-members">
                {LETTERS.filter((letter) => letter.family === family.id).map((letter) => (
                  <LetterKey key={letter.id} id={letter.id} />
                ))}
              </div>
            </div>
            <p>{family.note}</p>
          </div>
        ))}
        <div className="q-family">
          <span className="q-kicker">one of a kind</span>
          <div className="q-family-row" style={{ flexWrap: "wrap", marginTop: "0.4rem" }}>
            {LONERS.map((id) => (
              <LetterKey key={id} id={id} />
            ))}
          </div>
          <p>Seven letters with no twin. Learn these by heart and you have all 28.</p>
        </div>
      </div>
    </div>
  );
}
