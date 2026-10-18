"use client";

import "./arabic.css";

import { arabicFonts } from "./fonts";
import { Bars, PlayIcon, SpeakerIcon } from "./ornaments";
import { play, stop, usePlaying } from "./player";

/** Round play button for any clip. */
export function PlayButton({
  src,
  id = src,
  label,
  solid = false,
}: {
  src: string;
  id?: string;
  label?: string;
  solid?: boolean;
}) {
  const playing = usePlaying() === id;
  return (
    <button
      type="button"
      className={`q-play${solid ? " q-play-solid" : ""}`}
      data-playing={playing}
      aria-label={label ?? "Play"}
      onClick={() => (playing ? stop() : play(src, id))}
    >
      {playing ? <Bars /> : <SpeakerIcon />}
      {label && <span>{label}</span>}
    </button>
  );
}

/** Arabic you can press to hear — sits inline in a sentence. */
export function Say({
  text,
  src,
  latin,
  mushaf = false,
}: {
  text: string;
  src: string;
  latin?: string;
  mushaf?: boolean;
}) {
  const playing = usePlaying() === src;
  return (
    <button
      type="button"
      className={`q-say ${arabicFonts}`}
      data-playing={playing}
      onClick={() => play(src)}
      title="Play"
    >
      <span className={mushaf ? "q-say-ar q-mushaf" : "q-say-ar q-ar"} lang="ar">
        {text}
      </span>
      {latin && <span className="q-say-latin">{latin}</span>}
    </button>
  );
}

/** A big example card: the word, how it reads, what it means, where it is. */
export function Show({
  text,
  src,
  latin,
  note,
  where,
}: {
  text: string;
  src: string;
  latin?: string;
  note?: string;
  where?: string;
}) {
  const playing = usePlaying() === src;
  return (
    <button type="button" className="q-show" data-playing={playing} onClick={() => play(src)}>
      <span className="q-mushaf" lang="ar">
        {text}
      </span>
      {latin && <span className="q-word-latin">{latin}</span>}
      {note && <small>{note}</small>}
      {where && <em>{where}</em>}
    </button>
  );
}

export { PlayIcon };
