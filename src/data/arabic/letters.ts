/**
 * The 28 letters (plus hamza) the Arabic script course is built on.
 *
 * `example` is a word id from `words.ts`. Letter names, syllables and words
 * are spoken by the clips in `public/lab/arabic/audio`, made by
 * `scripts/arabic/make-audio.py`.
 */

export type MakhrajId =
  | "jawf"
  | "throat-deep"
  | "throat-middle"
  | "throat-near"
  | "tongue-back"
  | "tongue-middle"
  | "tongue-side"
  | "tongue-edge"
  | "tongue-gums"
  | "tongue-whistle"
  | "tongue-teeth"
  | "lips"
  | "nose";

export type Letter = {
  /** File-safe id, also the URL hash on the alphabet page. */
  id: string;
  char: string;
  /** The letter's name, written in Arabic with its vowels. */
  name: string;
  /** The name as an English speaker would say it. */
  latin: string;
  /** Transliteration used across the course. */
  translit: string;
  /** How to make the sound, in one or two sentences. */
  sound: string;
  /** The nearest sound an Uzbek speaker already has, when there is one. */
  uz?: string;
  /** False for the six letters that never join to the letter after them. */
  joins: boolean;
  /** Shape family — letters that share a skeleton and differ only by dots. */
  family: string;
  makhraj: MakhrajId;
  /** Heavy letters are said with the back of the tongue raised — a full, dark sound. */
  heavy: boolean;
  /** Id of an example word in `words.ts`. */
  example: string;
};

export const LETTERS: Letter[] = [
  {
    id: "alif",
    char: "ا",
    name: "أَلِف",
    latin: "alif",
    translit: "ā / a",
    sound:
      "Alif has no sound of its own. At the start of a word it carries a hamza (a short catch in the throat); in the middle it stretches the vowel before it into a long ā.",
    uz: "the long a in “ota”",
    joins: false,
    family: "alif",
    makhraj: "jawf",
    heavy: false,
    example: "adab",
  },
  {
    id: "ba",
    char: "ب",
    name: "بَاء",
    latin: "bā",
    translit: "b",
    sound: "Both lips close and open. A clean b, never a p — Arabic has no p.",
    uz: "b in “bola”",
    joins: true,
    family: "ba",
    makhraj: "lips",
    heavy: false,
    example: "bab",
  },
  {
    id: "ta",
    char: "ت",
    name: "تَاء",
    latin: "tā",
    translit: "t",
    sound: "Tip of the tongue on the gum behind the upper front teeth. Light and crisp.",
    uz: "t in “tosh”",
    joins: true,
    family: "ba",
    makhraj: "tongue-gums",
    heavy: false,
    example: "tarikh",
  },
  {
    id: "tha",
    char: "ث",
    name: "ثَاء",
    latin: "thā",
    translit: "th",
    sound:
      "Tip of the tongue between the teeth, air hissing past it — the th in “think”, not a t or an s.",
    joins: true,
    family: "ba",
    makhraj: "tongue-teeth",
    heavy: false,
    example: "thamar",
  },
  {
    id: "jim",
    char: "ج",
    name: "جِيم",
    latin: "jīm",
    translit: "j",
    sound: "Middle of the tongue against the roof of the mouth: j as in “jam”, firm and short.",
    uz: "j in “jo‘ja”",
    joins: true,
    family: "jim",
    makhraj: "tongue-middle",
    heavy: false,
    example: "jawab",
  },
  {
    id: "ha",
    char: "ح",
    name: "حَاء",
    latin: "ḥā",
    translit: "ḥ",
    sound:
      "A breathy h squeezed from the middle of the throat — like fogging a mirror, but tighter. Not the soft h of ه.",
    joins: true,
    family: "jim",
    makhraj: "throat-middle",
    heavy: false,
    example: "hayat",
  },
  {
    id: "kha",
    char: "خ",
    name: "خَاء",
    latin: "khā",
    translit: "kh",
    sound: "A rough scrape at the top of the throat, like the ch in Scottish “loch”.",
    uz: "x in “xat” — you already have it",
    joins: true,
    family: "jim",
    makhraj: "throat-near",
    heavy: true,
    example: "khabar",
  },
  {
    id: "dal",
    char: "د",
    name: "دَال",
    latin: "dāl",
    translit: "d",
    sound: "Tip of the tongue on the gum behind the upper teeth: a light d.",
    uz: "d in “dars”",
    joins: false,
    family: "dal",
    makhraj: "tongue-gums",
    heavy: false,
    example: "daftar",
  },
  {
    id: "dhal",
    char: "ذ",
    name: "ذَال",
    latin: "dhāl",
    translit: "dh",
    sound: "Tongue tip between the teeth, voiced — the th in “this”. Not a z.",
    joins: false,
    family: "dal",
    makhraj: "tongue-teeth",
    heavy: false,
    example: "dhihn",
  },
  {
    id: "ra",
    char: "ر",
    name: "رَاء",
    latin: "rā",
    translit: "r",
    sound: "One quick tap of the tongue tip — don't roll it. Heavy with a or u, light with i.",
    uz: "r in “rang”, with a single tap",
    joins: false,
    family: "ra",
    makhraj: "tongue-edge",
    heavy: false,
    example: "rasm",
  },
  {
    id: "zay",
    char: "ز",
    name: "زَاي",
    latin: "zāy",
    translit: "z",
    sound: "A buzzing z, tongue tip just behind the lower teeth.",
    uz: "z in “zamin”",
    joins: false,
    family: "ra",
    makhraj: "tongue-whistle",
    heavy: false,
    example: "zaman",
  },
  {
    id: "sin",
    char: "س",
    name: "سِين",
    latin: "sīn",
    translit: "s",
    sound: "A thin, whistling s — the light partner of ص.",
    uz: "s in “suv”",
    joins: true,
    family: "sin",
    makhraj: "tongue-whistle",
    heavy: false,
    example: "sabab",
  },
  {
    id: "shin",
    char: "ش",
    name: "شِين",
    latin: "shīn",
    translit: "sh",
    sound: "sh as in “ship”, with the air spreading over the whole tongue.",
    uz: "sh in “shahar”",
    joins: true,
    family: "sin",
    makhraj: "tongue-middle",
    heavy: false,
    example: "shart",
  },
  {
    id: "sad",
    char: "ص",
    name: "صَاد",
    latin: "ṣād",
    translit: "ṣ",
    sound:
      "A heavy s: same place as س, but the back of the tongue rises and the sound turns full and dark, as if said with a mouthful.",
    joins: true,
    family: "sad",
    makhraj: "tongue-whistle",
    heavy: true,
    example: "sabr",
  },
  {
    id: "dad",
    char: "ض",
    name: "ضَاد",
    latin: "ḍād",
    translit: "ḍ",
    sound:
      "The side of the tongue presses on the upper back teeth while the sound is heavy. Arabic is called “the language of ḍād” because of it.",
    joins: true,
    family: "sad",
    makhraj: "tongue-side",
    heavy: true,
    example: "darar",
  },
  {
    id: "tta",
    char: "ط",
    name: "طَاء",
    latin: "ṭā",
    translit: "ṭ",
    sound: "A heavy t: tongue tip in the t position, back of the tongue raised, a deep thump.",
    joins: true,
    family: "tta",
    makhraj: "tongue-gums",
    heavy: true,
    example: "tabia",
  },
  {
    id: "dha",
    char: "ظ",
    name: "ظَاء",
    latin: "ẓā",
    translit: "ẓ",
    sound: "The heavy version of ذ: tongue between the teeth, back of the tongue raised.",
    joins: true,
    family: "tta",
    makhraj: "tongue-teeth",
    heavy: true,
    example: "zarif",
  },
  {
    id: "ayn",
    char: "ع",
    name: "عَيْن",
    latin: "ʿayn",
    translit: "ʿ",
    sound:
      "Squeeze the middle of the throat as if about to gag, and let the voice through. Hard at first; it comes with listening.",
    joins: true,
    family: "ayn",
    makhraj: "throat-middle",
    heavy: false,
    example: "ilm",
  },
  {
    id: "ghayn",
    char: "غ",
    name: "غَيْن",
    latin: "ghayn",
    translit: "gh",
    sound: "A voiced gargle at the top of the throat — the French r.",
    uz: "g‘ in “g‘oz” — you already have it",
    joins: true,
    family: "ayn",
    makhraj: "throat-near",
    heavy: true,
    example: "gharib",
  },
  {
    id: "fa",
    char: "ف",
    name: "فَاء",
    latin: "fā",
    translit: "f",
    sound: "Upper teeth on the inside of the lower lip: f.",
    uz: "f in “fikr”",
    joins: true,
    family: "fa",
    makhraj: "lips",
    heavy: false,
    example: "fikr",
  },
  {
    id: "qaf",
    char: "ق",
    name: "قَاف",
    latin: "qāf",
    translit: "q",
    sound: "A k made far back, where the tongue meets the soft palate. Deep and heavy.",
    uz: "q in “qalam” — you already have it",
    joins: true,
    family: "fa",
    makhraj: "tongue-back",
    heavy: true,
    example: "qalam",
  },
  {
    id: "kaf",
    char: "ك",
    name: "كَاف",
    latin: "kāf",
    translit: "k",
    sound: "An ordinary, light k — a little further forward than ق.",
    uz: "k in “kitob”",
    joins: true,
    family: "kaf",
    makhraj: "tongue-back",
    heavy: false,
    example: "kitab",
  },
  {
    id: "lam",
    char: "ل",
    name: "لَام",
    latin: "lām",
    translit: "l",
    sound: "Tongue tip on the gum ridge: a light l. Keep it light, almost always.",
    uz: "l in “lola”",
    joins: true,
    family: "lam",
    makhraj: "tongue-edge",
    heavy: false,
    example: "lugha",
  },
  {
    id: "mim",
    char: "م",
    name: "مِيم",
    latin: "mīm",
    translit: "m",
    sound: "Lips together, sound through the nose: m.",
    uz: "m in “maktab”",
    joins: true,
    family: "mim",
    makhraj: "lips",
    heavy: false,
    example: "maktab",
  },
  {
    id: "nun",
    char: "ن",
    name: "نُون",
    latin: "nūn",
    translit: "n",
    sound: "Tongue tip on the gum ridge, sound through the nose: n.",
    uz: "n in “non”",
    joins: true,
    family: "nun",
    makhraj: "tongue-edge",
    heavy: false,
    example: "natija",
  },
  {
    id: "hha",
    char: "ه",
    name: "هَاء",
    latin: "hā",
    translit: "h",
    sound: "A soft, airy h from the bottom of the throat — the h in “hello”.",
    uz: "h in “hamma”",
    joins: true,
    family: "ha",
    makhraj: "throat-deep",
    heavy: false,
    example: "hawa",
  },
  {
    id: "waw",
    char: "و",
    name: "وَاو",
    latin: "wāw",
    translit: "w / ū",
    sound: "Rounded lips: a w as a consonant, a long ū when it stretches a damma.",
    uz: "the w in “wow”; the long u in “uzum”",
    joins: false,
    family: "waw",
    makhraj: "lips",
    heavy: false,
    example: "waqt",
  },
  {
    id: "ya",
    char: "ي",
    name: "يَاء",
    latin: "yā",
    translit: "y / ī",
    sound: "Middle of the tongue up: a y as a consonant, a long ī when it stretches a kasra.",
    uz: "y in “yil”",
    joins: true,
    family: "ba",
    makhraj: "tongue-middle",
    heavy: false,
    example: "yatim",
  },
];

/**
 * Hamza is not one of the 28, but it's everywhere in written Arabic: a glottal
 * stop that sits on an alif, a waw, a ya, or on the line by itself.
 */
export const HAMZA: Letter = {
  id: "hamza",
  char: "ء",
  name: "هَمْزَة",
  latin: "hamza",
  translit: "ʾ",
  sound: "A tiny catch in the throat — the break in the middle of “uh-oh”.",
  joins: false,
  family: "hamza",
  makhraj: "throat-deep",
  heavy: false,
  example: "sual",
};

export const LETTER_BY_ID = new Map([...LETTERS, HAMZA].map((letter) => [letter.id, letter]));

/** Shape families — one skeleton, told apart only by dots. */
export const FAMILIES: { id: string; skeleton: string; note: string }[] = [
  { id: "ba", skeleton: "ٮ", note: "One tooth. One dot below is b, two above t, three above th — and at the start of a word, n and y wear this same shape." },
  { id: "jim", skeleton: "ح", note: "A cup. Dot inside is j, no dot is ḥ, dot on top is kh." },
  { id: "dal", skeleton: "د", note: "A small hook sitting on the line. Dot above turns d into dh." },
  { id: "ra", skeleton: "ر", note: "A hook that dips below the line. Dot above turns r into z." },
  { id: "sin", skeleton: "س", note: "Three teeth. Three dots on top turns s into sh." },
  { id: "sad", skeleton: "ص", note: "A loop with a tooth. A dot on top turns ṣ into ḍ." },
  { id: "tta", skeleton: "ط", note: "A loop with a tall stem. A dot turns ṭ into ẓ." },
  { id: "ayn", skeleton: "ع", note: "An open mouth. A dot on top turns ʿ into gh." },
  { id: "fa", skeleton: "ڡ", note: "A small loop. One dot is f, two dots is q — and q's tail dips deeper." },
];

/** Letters that stand alone in their shape. */
export const LONERS = ["alif", "kaf", "lam", "mim", "nun", "hha", "waw"];

/** The vowel marks a learner meets first, with the sound they add. */
export const HARAKAT = {
  a: { mark: "َ", name: "fatḥa", arabic: "فَتْحَة", sound: "a", hint: "a small stroke above — a short a" },
  i: { mark: "ِ", name: "kasra", arabic: "كَسْرَة", sound: "i", hint: "a small stroke below — a short i" },
  u: { mark: "ُ", name: "ḍamma", arabic: "ضَمَّة", sound: "u", hint: "a little waw above — a short u" },
} as const;

export type Vowel = keyof typeof HARAKAT;

const ZWJ = "‍";

/** The four positions a letter can take in a word. */
export function letterForms(letter: Letter) {
  return {
    isolated: letter.char,
    initial: letter.joins ? `${letter.char}${ZWJ}` : letter.char,
    medial: letter.joins ? `${ZWJ}${letter.char}${ZWJ}` : `${ZWJ}${letter.char}`,
    final: `${ZWJ}${letter.char}`,
  };
}

/** The character that carries a vowel for this letter — alif borrows hamza. */
function carrier(letter: Letter, vowel?: Vowel): string {
  if (letter.id !== "alif") return letter.char;
  return vowel === "i" ? "إ" : "أ";
}

/** What a syllable looks like on the page, e.g. بَ, بَا, بٌ, أَبْ. */
export function syllable(letter: Letter, kind: SyllableKind): string {
  const base = (vowel?: Vowel) => carrier(letter, vowel);
  switch (kind) {
    case "a":
    case "i":
    case "u":
      return base(kind) + HARAKAT[kind].mark;
    case "aa":
      return letter.id === "alif" ? "آ" : `${letter.char}َا`;
    case "ii":
      return `${base("i")}ِي`;
    case "uu":
      return `${base("u")}ُو`;
    case "an":
      return `${base("a")}ً${letter.id === "alif" ? "" : "ا"}`;
    case "in":
      return `${base("i")}ٍ`;
    case "un":
      return `${base("u")}ٌ`;
    case "s":
      return letter.id === "alif" ? "اْ" : `أَ${letter.char}ْ`;
  }
}

/** How a syllable reads in Latin letters. */
export function syllableLatin(letter: Letter, kind: SyllableKind): string {
  const c = letter.id === "alif" || letter.id === "hamza" ? "ʾ" : letter.translit.split(" ")[0];
  switch (kind) {
    case "a":
    case "i":
    case "u":
      return c + kind;
    case "aa":
      return `${c}ā`;
    case "ii":
      return `${c}ī`;
    case "uu":
      return `${c}ū`;
    case "an":
    case "in":
    case "un":
      return c + kind;
    case "s":
      return `a${c}`;
  }
}

export type SyllableKind = "a" | "i" | "u" | "aa" | "ii" | "uu" | "an" | "in" | "un" | "s";

export const SYLLABLE_KINDS: SyllableKind[] = ["a", "i", "u", "aa", "ii", "uu", "an", "in", "un", "s"];

/** Generated clip for a letter name or a syllable. */
export function clip(letter: Letter, kind: SyllableKind | "name"): string {
  return `/lab/arabic/audio/${letter.id}-${kind}.mp3`;
}
