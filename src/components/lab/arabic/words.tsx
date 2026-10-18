import { type SyllableKind, LETTER_BY_ID, clip, syllable, syllableLatin } from "@/data/arabic/letters";
import { getWord, wordClip } from "@/data/arabic/words";

import { arabicFonts } from "./fonts";
import { Say, Show } from "./say";

/** A word inline in prose, press to hear it: `<W id="kitab" />`. */
export function W({ id, latin = true }: { id: string; latin?: boolean }) {
  const word = getWord(id);
  return <Say text={word.ar} src={wordClip(word)} latin={latin ? word.translit : undefined} mushaf />;
}

/** A row of big word cards: `<Words list="kitab qalam maktab" />`. */
export function Words({ list, uzbek = true }: { list: string; uzbek?: boolean }) {
  const words = list.split(/\s+/).filter(Boolean).map(getWord);
  return (
    <div className={`q-root not-prose ${arabicFonts}`}>
      <div className="q-showcase">
        {words.map((word) => (
          <Show
            key={word.id}
            text={word.ar}
            src={wordClip(word)}
            latin={word.translit}
            note={word.en}
            where={uzbek && word.uz ? `uz: ${word.uz}` : undefined}
          />
        ))}
      </div>
    </div>
  );
}

/** Arabic inside a sentence, without audio: `<Ar>بَ</Ar>`. */
export function Ar({ children }: { children: React.ReactNode }) {
  return (
    <span className={`q-inline ${arabicFonts}`} lang="ar">
      {children}
    </span>
  );
}

/** A syllable inline in prose, with its clip: `<Syl l="ba" k="a" />`. */
export function Syl({ l, k = "a", latin = true }: { l: string; k?: SyllableKind | "name"; latin?: boolean }) {
  const letter = LETTER_BY_ID.get(l);
  if (!letter) throw new Error(`no letter "${l}"`);
  const text = k === "name" ? letter.char : syllable(letter, k);
  const reading = k === "name" ? letter.latin : syllableLatin(letter, k);
  return <Say text={text} src={clip(letter, k)} latin={latin ? reading : undefined} />;
}
