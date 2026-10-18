"use client";

import "./arabic.css";

import { useState } from "react";

import { LETTERS, LETTER_BY_ID, clip, letterForms } from "@/data/arabic/letters";

import { arabicFonts } from "./fonts";
import { play, usePlaying } from "./player";

/** `<FormsTable />` — every letter in its four positions. Non-joiners in pink. */
export function FormsTable() {
  const playing = usePlaying();
  return (
    <div className={`q-root not-prose ${arabicFonts}`}>
      <div className="q-table-wrap">
        <table className="q-table">
          <thead>
            <tr>
              <th>alone</th>
              <th>start</th>
              <th>middle</th>
              <th>end</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            {LETTERS.map((letter) => {
              const forms = letterForms(letter);
              const src = clip(letter, "name");
              return (
                <tr
                  key={letter.id}
                  data-stop={!letter.joins}
                  onClick={() => play(src)}
                  style={{ cursor: "pointer", outline: playing === src ? "1px solid #8ec07c" : undefined }}
                >
                  {(["isolated", "initial", "medial", "final"] as const).map((form) => (
                    <td key={form}>
                      <span className="q-ar" lang="ar">
                        {forms[form]}
                      </span>
                    </td>
                  ))}
                  <td className="q-table-name">{letter.latin}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const PRESETS: { label: string; letters: string[] }[] = [
  { label: "كتب · k-t-b", letters: ["kaf", "ta", "ba"] },
  { label: "قلم · q-l-m", letters: ["qaf", "lam", "mim"] },
  { label: "درس · d-r-s", letters: ["dal", "ra", "sin"] },
  { label: "نور · n-w-r", letters: ["nun", "waw", "ra"] },
  { label: "رحمن · r-ḥ-m-n", letters: ["ra", "ha", "mim", "nun"] },
  { label: "محمد · m-ḥ-m-d", letters: ["mim", "ha", "mim", "dal"] },
];

/** `<Joiner />` — press letters, watch them join (and see where they refuse to). */
export function Joiner() {
  const [ids, setIds] = useState<string[]>(["kaf", "ta", "ba"]);
  const letters = ids.map((id) => LETTER_BY_ID.get(id)!);

  return (
    <div className={`q-root not-prose ${arabicFonts}`}>
      <div className="q-joiner">
        <div className="q-joiner-out">
          <span className="q-joiner-word" lang="ar">
            {letters.map((letter) => letter.char).join("") || "…"}
          </span>
          <span className="q-joiner-parts" lang="ar">
            {letters.map((letter, index) => (
              <span key={index} data-stop={!letter.joins}>
                {letter.char}
              </span>
            ))}
          </span>
        </div>
        <p className="q-joiner-hint">
          {letters.some((letter, index) => !letter.joins && index < letters.length - 1)
            ? "See the gap? A pink letter never reaches to the letter after it."
            : "Every letter here holds hands with the next one."}
        </p>

        <div className="q-keyboard">
          {LETTERS.map((letter) => (
            <button
              key={letter.id}
              type="button"
              className="q-key"
              data-stop={!letter.joins}
              onClick={() => {
                setIds((previous) => [...previous, letter.id].slice(-8));
                play(clip(letter, "name"));
              }}
              lang="ar"
            >
              {letter.char}
            </button>
          ))}
          <button type="button" className="q-key q-key-wide" onClick={() => setIds((previous) => previous.slice(0, -1))}>
            ⌫ back
          </button>
          <button type="button" className="q-key q-key-wide" onClick={() => setIds([])}>
            clear
          </button>
        </div>

        <div className="q-presets">
          <span className="q-kicker">try:</span>
          {PRESETS.map((preset) => (
            <button key={preset.label} type="button" className="q-chip" onClick={() => setIds(preset.letters)}>
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
