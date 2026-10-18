"use client";

import "./arabic.css";

import { useEffect, useState } from "react";

import { type MakhrajId, LETTER_BY_ID, clip, syllable, syllableLatin } from "@/data/arabic/letters";

import { arabicFonts } from "./fonts";
import { play, usePlaying } from "./player";
import { ZONES } from "./zones";

/** A side view of the head, face to the left — stylised, not a medical drawing. */
function Head() {
  return (
    <g>
      {/* silhouette */}
      <path
        d="M128 18 C 210 4, 320 20, 372 92 C 404 140, 392 206, 352 238 C 338 250, 332 262, 332 300 L 332 376 L 182 376 L 176 300 C 172 284, 150 270, 118 262 C 96 258, 80 252, 79 240 C 78 228, 84 220, 82 212 C 74 206, 66 202, 67 196 C 68 190, 74 188, 78 185 C 70 180, 64 175, 66 168 C 68 160, 76 154, 78 150 C 62 146, 50 140, 52 132 C 54 124, 72 112, 86 92 C 96 76, 96 62, 100 48 C 106 32, 116 22, 128 18 Z"
        fill="#282828"
        stroke="#504945"
        strokeWidth="1.5"
      />
      {/* nasal cavity */}
      <path
        d="M76 142 Q 140 104, 240 110 Q 290 116, 304 146 L 286 152 Q 240 138, 180 141 Q 120 145, 82 154 Z"
        fill="#1d2021"
        stroke="#665c54"
        strokeWidth="1"
      />
      {/* mouth and throat airway */}
      <path
        d="M70 186 L 90 180 L 98 168 Q 150 138, 230 149 Q 264 154, 286 151 L 304 146 Q 312 210, 306 270 Q 302 320, 302 376 L 272 376 L 270 296 Q 266 280, 262 274 C 200 262, 130 232, 100 208 L 72 196 Z"
        fill="#1d2021"
        stroke="#665c54"
        strokeWidth="1"
      />
      {/* soft palate and uvula */}
      <path d="M230 149 Q 266 156, 276 186 Q 278 196, 270 194 Q 262 176, 236 162 Z" fill="#7c6f64" opacity="0.8" />
      {/* tongue */}
      <path
        d="M102 190 C 140 168, 214 156, 252 184 C 272 206, 270 248, 262 274 C 200 262, 130 232, 100 207 C 96 200, 96 194, 102 190 Z"
        fill="#b16286"
        fillOpacity="0.55"
        stroke="#d3869b"
        strokeWidth="1.2"
      />
      {/* epiglottis */}
      <path d="M262 274 Q 276 252, 286 248 Q 280 262, 270 290 Z" fill="#7c6f64" opacity="0.8" />
      {/* teeth */}
      <path d="M88 166 L 100 166 L 98 181 L 91 181 Z" fill="#ebdbb2" opacity="0.85" />
      <path d="M90 196 L 99 196 L 101 210 L 91 210 Z" fill="#ebdbb2" opacity="0.85" />
      {/* voice box */}
      <path d="M272 312 Q 288 306, 302 312 L 302 322 Q 288 316, 272 322 Z" fill="#fabd2f" opacity="0.3" />
      <text x="372" y="368" textAnchor="end" className="q-latin" fill="#665c54" fontSize="10">
        throat ↓
      </text>
      <text x="18" y="370" className="q-latin" fill="#665c54" fontSize="10">
        ← lips
      </text>
    </g>
  );
}

export function Makharij() {
  const [active, setActive] = useState<MakhrajId>("throat-middle");
  const playing = usePlaying();

  useEffect(() => {
    const fromHash = ZONES.find((zone) => `#${zone.id}` === window.location.hash);
    if (fromHash) setActive(fromHash.id);
  }, []);

  const choose = (id: MakhrajId) => {
    setActive(id);
    const zone = ZONES.find((item) => item.id === id);
    const first = zone && LETTER_BY_ID.get(zone.letters[0]);
    if (first) play(clip(first, first.id === "alif" ? "aa" : "a"));
  };

  return (
    <div className={`q-root not-prose ${arabicFonts}`}>
      <div className="q-makharij">
        <div className="q-mouth">
          <svg viewBox="0 0 400 380" role="img" aria-label="Where Arabic sounds are made">
            <Head />
            {ZONES.map((zone, index) => {
              const [x, y] = zone.at;
              const [bx, by] = zone.badge;
              const isActive = active === zone.id;
              const separate = bx !== x || by !== y;
              return (
                <g
                  key={zone.id}
                  className="q-spot"
                  data-active={isActive}
                  onClick={() => choose(zone.id)}
                  role="button"
                  aria-label={zone.title}
                >
                  {separate && (
                    <>
                      <line
                        x1={x}
                        y1={y}
                        x2={bx}
                        y2={by}
                        stroke={isActive ? "#fabd2f" : "#7c6f64"}
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      <circle cx={x} cy={y} r="3.2" fill={isActive ? "#fabd2f" : "#ebdbb2"} />
                    </>
                  )}
                  <circle className="q-spot-ring" cx={bx} cy={by} r="14" fill="none" stroke="#fabd2f" strokeOpacity="0.5" opacity="0" />
                  <circle className="q-spot-dot" cx={bx} cy={by} r="9.5" fill={isActive ? "#fabd2f" : "#504945"} stroke="#1d2021" strokeWidth="1.5" />
                  <text
                    x={bx}
                    y={by + 3.5}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="var(--font-fira-code), monospace"
                    fill={isActive ? "#1d2021" : "#fbf1c7"}
                    style={{ pointerEvents: "none" }}
                  >
                    {index + 1}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="q-zones">
          {ZONES.map((zone, index) => {
            const isActive = active === zone.id;
            return (
              <div
                key={zone.id}
                id={zone.id}
                className="q-zone"
                data-active={isActive}
                onClick={() => setActive(zone.id)}
              >
                <span className="q-zone-num">{index + 1}</span>
                <div>
                  <div className="q-zone-title">{zone.title}</div>
                  {isActive && (
                    <>
                      <p className="q-zone-text">{zone.text}</p>
                      <div className="q-detail-row">
                        {zone.letters.map((id) => {
                          const letter = LETTER_BY_ID.get(id)!;
                          // the jawf letters are only themselves when long; the nose is heard on a doubled letter
                          const kind =
                            zone.id === "jawf"
                              ? id === "alif" ? "aa" : id === "waw" ? "uu" : "ii"
                              : zone.id === "nose" ? "s" : "a";
                          const src = clip(letter, kind);
                          return (
                            <button
                              key={id}
                              type="button"
                              className="q-syl"
                              data-playing={playing === src}
                              onClick={(event) => {
                                event.stopPropagation();
                                play(src);
                              }}
                            >
                              <span className="q-ar" lang="ar">
                                {zone.id === "jawf" || zone.id === "nose" ? syllable(letter, kind) : letter.char}
                              </span>
                              <span className="q-latin">{syllableLatin(letter, kind)}</span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
