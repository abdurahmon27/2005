"use client";

import "./arabic.css";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  type Letter,
  type SyllableKind,
  LETTERS,
  clip,
  letterForms,
  syllable,
  syllableLatin,
} from "@/data/arabic/letters";

import { arabicFonts } from "./fonts";
import { Bars, PlayIcon, Rosette } from "./ornaments";
import { play, playAll, stop, usePlaying } from "./player";
import { PlayButton, Show } from "./say";
import { getWord, wordClip } from "@/data/arabic/words";
import { MAKHRAJ_TITLES } from "./zones";

const FORM_LABELS = [
  ["isolated", "alone"],
  ["initial", "start"],
  ["medial", "middle"],
  ["final", "end"],
] as const;

function Syllable({ letter, kind }: { letter: Letter; kind: SyllableKind }) {
  const src = clip(letter, kind);
  const playing = usePlaying() === src;
  return (
    <button type="button" className="q-syl" data-playing={playing} onClick={() => play(src)}>
      <span className="q-ar" lang="ar">
        {syllable(letter, kind)}
      </span>
      <span className="q-latin">{syllableLatin(letter, kind)}</span>
    </button>
  );
}

/** `<Alphabet />` — the 28-letter explorer, one everyday word per letter. */
export function Alphabet() {
  const [selected, setSelected] = useState<Letter>(LETTERS[0]);
  const detail = useRef<HTMLDivElement>(null);
  const playing = usePlaying();
  const playingAll = playing?.startsWith("alphabet:") ?? false;

  // deep links: /lab/arabic/letters/alphabet#qaf
  useEffect(() => {
    const fromHash = LETTERS.find((letter) => `#${letter.id}` === window.location.hash);
    if (fromHash) setSelected(fromHash);
  }, []);

  const choose = (letter: Letter) => {
    setSelected(letter);
    play(clip(letter, "name"));
    window.history.replaceState(null, "", `#${letter.id}`);
    const box = detail.current?.getBoundingClientRect();
    if (box && (box.top < 0 || box.top > window.innerHeight * 0.75)) {
      detail.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const onKey = (event: React.KeyboardEvent) => {
    const index = LETTERS.indexOf(selected);
    // the grid runs right to left, so the arrows do too
    const step = event.key === "ArrowLeft" ? 1 : event.key === "ArrowRight" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = LETTERS[(index + step + LETTERS.length) % LETTERS.length];
    choose(next);
    document.getElementById(`q-tile-${next.id}`)?.focus();
  };

  const forms = letterForms(selected);
  const example = getWord(selected.example);
  const nameSrc = clip(selected, "name");

  return (
    <div className={`q-root not-prose ${arabicFonts}`}>
      <div className="q-grid-head">
        <span className="q-kicker">tap a letter · ← → to walk · orange dot = heavy letter</span>
        <button
          type="button"
          className="q-play"
          data-playing={playingAll}
          onClick={() =>
            playingAll
              ? stop()
              : playAll(LETTERS.map((letter) => ({ src: clip(letter, "name"), id: `alphabet:${letter.id}` })))
          }
        >
          {playingAll ? <Bars /> : <PlayIcon />}
          <span>{playingAll ? "stop" : "hear all 28"}</span>
        </button>
      </div>

      <div className="q-alphabet" role="listbox" aria-label="Arabic letters" onKeyDown={onKey}>
        {LETTERS.map((letter) => (
          <button
            key={letter.id}
            id={`q-tile-${letter.id}`}
            type="button"
            role="option"
            aria-selected={selected.id === letter.id}
            className="q-tile"
            data-selected={selected.id === letter.id || playing === `alphabet:${letter.id}`}
            data-heavy={letter.heavy}
            onClick={() => choose(letter)}
          >
            <span className="q-tile-glyph" lang="ar">
              {letter.char}
            </span>
            <span className="q-tile-name">{letter.latin}</span>
          </button>
        ))}
      </div>

      <div className="q-detail" ref={detail}>
        <button
          type="button"
          className="q-detail-glyph"
          data-playing={playing === nameSrc}
          onClick={() => play(nameSrc)}
          aria-label={`Hear the name ${selected.latin}`}
        >
          <Rosette id="detail-rosette" />
          <span lang="ar">{selected.char}</span>
        </button>

        <div>
          <h3>
            {selected.latin}
            <span className="q-ar" lang="ar">
              {selected.name}
            </span>
            <PlayButton src={nameSrc} label="name" />
          </h3>
          <div className="q-badges">
            <span className="q-badge">sounds like: {selected.translit}</span>
            <span className="q-badge" data-tone={selected.heavy ? "heavy" : "light"}>
              {selected.heavy ? "heavy" : "light"}
            </span>
            {!selected.joins && (
              <span className="q-badge" data-tone="stop">
                never joins the next letter
              </span>
            )}
            <span className="q-badge">from: {MAKHRAJ_TITLES[selected.makhraj]}</span>
          </div>
          <p>{selected.sound}</p>
          {selected.uz && <div className="q-uz">🇺🇿 Uzbek ear: {selected.uz}</div>}

          <div className="q-detail-section">
            <span className="q-kicker">with a vowel</span>
            <div className="q-detail-row">
              {(["a", "i", "u", "aa", "ii", "uu"] as const).map((kind) => (
                <Syllable key={kind} letter={selected} kind={kind} />
              ))}
            </div>
          </div>

          <div className="q-detail-section">
            <span className="q-kicker">its four shapes — right to left: alone, start, middle, end</span>
            <div className="q-forms">
              {FORM_LABELS.map(([form, label]) => (
                <div key={form} className="q-form">
                  <span className="q-ar" lang="ar">
                    {forms[form]}
                  </span>
                  <span className="q-latin">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="q-detail-section">
            <span className="q-kicker">in a word — tap to hear it</span>
            <div className="q-showcase" style={{ marginTop: "0.4rem", maxWidth: "12rem" }}>
              <Show
                text={example.ar}
                src={wordClip(example)}
                latin={example.translit}
                note={example.en}
                where={example.uz ? `uz: ${example.uz}` : undefined}
              />
            </div>
          </div>

          <p style={{ fontSize: "0.75rem" }}>
            <Link href={`/lab/arabic/letters/sounds#${selected.makhraj}`} className="q-latin">
              where this sound is made →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
