// Prints { "<file>": "<arabic text>" } for every clip the Arabic course plays.
// Read by make-audio.py; run with `node --experimental-strip-types`.

import { HAMZA, LETTERS, SYLLABLE_KINDS, syllable } from "../../src/data/arabic/letters.ts";
import { WORDS } from "../../src/data/arabic/words.ts";

const manifest: Record<string, string> = {};
for (const letter of [...LETTERS, HAMZA]) {
  manifest[`${letter.id}-name`] = letter.name;
  for (const kind of SYLLABLE_KINDS) {
    if (letter.id === "alif" && kind === "s") continue; // alif never carries a sukun
    manifest[`${letter.id}-${kind}`] = syllable(letter, kind);
  }
}
for (const word of WORDS) {
  manifest[`w-${word.id}`] = word.ar;
}
console.log(JSON.stringify(manifest));
