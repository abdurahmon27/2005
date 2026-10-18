/**
 * Everyday Arabic words for the script course — most of them came into Uzbek
 * centuries ago, so a learner reads a word and recognises it. Each one has a
 * clip in `public/lab/arabic/audio/w-<id>.mp3` (scripts/arabic/make-audio.py).
 */

export type Word = {
  id: string;
  ar: string;
  translit: string;
  en: string;
  /** The Uzbek word that came from it, when there is one. */
  uz?: string;
};

export const WORDS: Word[] = [
  // one per letter, for the alphabet cards
  { id: "adab", ar: "أَدَب", translit: "adab", en: "manners, literature", uz: "adab" },
  { id: "bab", ar: "بَاب", translit: "bāb", en: "door, chapter", uz: "bob" },
  { id: "tarikh", ar: "تَارِيخ", translit: "tārīkh", en: "history", uz: "tarix" },
  { id: "thamar", ar: "ثَمَر", translit: "thamar", en: "fruit, result", uz: "samara" },
  { id: "jawab", ar: "جَوَاب", translit: "jawāb", en: "answer", uz: "javob" },
  { id: "hayat", ar: "حَيَاة", translit: "ḥayāh", en: "life", uz: "hayot" },
  { id: "khabar", ar: "خَبَر", translit: "khabar", en: "news", uz: "xabar" },
  { id: "daftar", ar: "دَفْتَر", translit: "daftar", en: "notebook", uz: "daftar" },
  { id: "dhihn", ar: "ذِهْن", translit: "dhihn", en: "mind", uz: "zehn" },
  { id: "rasm", ar: "رَسْم", translit: "rasm", en: "drawing", uz: "rasm" },
  { id: "zaman", ar: "زَمَان", translit: "zamān", en: "time, era", uz: "zamon" },
  { id: "sabab", ar: "سَبَب", translit: "sabab", en: "reason", uz: "sabab" },
  { id: "shart", ar: "شَرْط", translit: "sharṭ", en: "condition", uz: "shart" },
  { id: "sabr", ar: "صَبْر", translit: "ṣabr", en: "patience", uz: "sabr" },
  { id: "darar", ar: "ضَرَر", translit: "ḍarar", en: "harm", uz: "zarar" },
  { id: "tabia", ar: "طَبِيعَة", translit: "ṭabīʿa", en: "nature", uz: "tabiat" },
  { id: "zarif", ar: "ظَرِيف", translit: "ẓarīf", en: "graceful", uz: "zarif" },
  { id: "ilm", ar: "عِلْم", translit: "ʿilm", en: "knowledge", uz: "ilm" },
  { id: "gharib", ar: "غَرِيب", translit: "gharīb", en: "stranger, strange", uz: "g‘arib" },
  { id: "fikr", ar: "فِكْر", translit: "fikr", en: "thought", uz: "fikr" },
  { id: "qalam", ar: "قَلَم", translit: "qalam", en: "pen", uz: "qalam" },
  { id: "kitab", ar: "كِتَاب", translit: "kitāb", en: "book", uz: "kitob" },
  { id: "lugha", ar: "لُغَة", translit: "lugha", en: "language", uz: "lug‘at" },
  { id: "maktab", ar: "مَكْتَب", translit: "maktab", en: "office, desk", uz: "maktab" },
  { id: "natija", ar: "نَتِيجَة", translit: "natīja", en: "result", uz: "natija" },
  { id: "hawa", ar: "هَوَاء", translit: "hawāʾ", en: "air", uz: "havo" },
  { id: "waqt", ar: "وَقْت", translit: "waqt", en: "time", uz: "vaqt" },
  { id: "yatim", ar: "يَتِيم", translit: "yatīm", en: "orphan", uz: "yetim" },

  // short vowels only
  { id: "kataba", ar: "كَتَبَ", translit: "kataba", en: "he wrote" },
  { id: "dhahaba", ar: "ذَهَبَ", translit: "dhahaba", en: "he went" },
  { id: "jalasa", ar: "جَلَسَ", translit: "jalasa", en: "he sat" },
  { id: "fataha", ar: "فَتَحَ", translit: "fataḥa", en: "he opened" },
  { id: "darasa", ar: "دَرَسَ", translit: "darasa", en: "he studied", uz: "dars" },
  { id: "shariba", ar: "شَرِبَ", translit: "shariba", en: "he drank", uz: "sharbat" },
  { id: "samia", ar: "سَمِعَ", translit: "samiʿa", en: "he heard" },
  { id: "kabura", ar: "كَبُرَ", translit: "kabura", en: "he grew up" },
  { id: "kutub", ar: "كُتُب", translit: "kutub", en: "books" },
  { id: "rusul", ar: "رُسُل", translit: "rusul", en: "messengers" },

  // sukun
  { id: "bahr", ar: "بَحْر", translit: "baḥr", en: "sea", uz: "bahr" },
  { id: "shams", ar: "شَمْس", translit: "shams", en: "sun" },
  { id: "qalb", ar: "قَلْب", translit: "qalb", en: "heart", uz: "qalb" },
  { id: "bint", ar: "بِنْت", translit: "bint", en: "girl" },
  { id: "shukr", ar: "شُكْر", translit: "shukr", en: "gratitude", uz: "shukr" },
  { id: "qamar", ar: "قَمَر", translit: "qamar", en: "moon", uz: "qamar" },

  // shadda
  { id: "umm", ar: "أُمّ", translit: "umm", en: "mother" },
  { id: "hammam", ar: "حَمَّام", translit: "ḥammām", en: "bath", uz: "hammom" },
  { id: "muallim", ar: "مُعَلِّم", translit: "muʿallim", en: "teacher", uz: "muallim" },
  { id: "dukkan", ar: "دُكَّان", translit: "dukkān", en: "shop", uz: "do‘kon" },
  { id: "sukkar", ar: "سُكَّر", translit: "sukkar", en: "sugar" },

  // long vowels
  { id: "nur", ar: "نُور", translit: "nūr", en: "light", uz: "nur" },
  { id: "kabir", ar: "كَبِير", translit: "kabīr", en: "big", uz: "kabir" },
  { id: "fil", ar: "فِيل", translit: "fīl", en: "elephant", uz: "fil" },
  { id: "tawil", ar: "طَوِيل", translit: "ṭawīl", en: "long" },
  { id: "salam", ar: "سَلَام", translit: "salām", en: "peace, hello", uz: "salom" },
  { id: "insan", ar: "إِنْسَان", translit: "insān", en: "human being", uz: "inson" },
  { id: "dunya", ar: "دُنْيَا", translit: "dunyā", en: "the world", uz: "dunyo" },

  // tanwin
  { id: "shukran", ar: "شُكْرًا", translit: "shukran", en: "thank you" },
  { id: "ahlan", ar: "أَهْلًا", translit: "ahlan", en: "welcome" },
  { id: "afwan", ar: "عَفْوًا", translit: "ʿafwan", en: "you're welcome", uz: "afv" },
  { id: "jiddan", ar: "جِدًّا", translit: "jiddan", en: "very" },
  { id: "mathalan", ar: "مَثَلًا", translit: "mathalan", en: "for example", uz: "masalan" },
  { id: "daiman", ar: "دَائِمًا", translit: "dāʾiman", en: "always", uz: "doimo" },
  { id: "kitabun", ar: "كِتَابٌ", translit: "kitābun", en: "a book" },
  { id: "qalamin", ar: "قَلَمٍ", translit: "qalamin", en: "(of) a pen" },

  // the article
  { id: "al-kitab", ar: "ٱلْكِتَاب", translit: "al-kitāb", en: "the book" },
  { id: "al-qamar", ar: "ٱلْقَمَر", translit: "al-qamar", en: "the moon" },
  { id: "al-bab", ar: "ٱلْبَاب", translit: "al-bāb", en: "the door" },
  { id: "al-maktab", ar: "ٱلْمَكْتَب", translit: "al-maktab", en: "the office" },
  { id: "ash-shams", ar: "ٱلشَّمْس", translit: "ash-shams", en: "the sun" },
  { id: "an-nur", ar: "ٱلنُّور", translit: "an-nūr", en: "the light" },
  { id: "ad-dars", ar: "ٱلدَّرْس", translit: "ad-dars", en: "the lesson" },
  { id: "as-salam", ar: "ٱلسَّلَام", translit: "as-salām", en: "the peace" },
  { id: "bil-qalam", ar: "بِٱلْقَلَمِ", translit: "bil-qalami", en: "with the pen" },
  { id: "fil-bayt", ar: "فِي ٱلْبَيْتِ", translit: "fil-bayti", en: "in the house" },

  // special letters
  { id: "madrasa", ar: "مَدْرَسَة", translit: "madrasa", en: "school", uz: "madrasa" },
  { id: "jamia", ar: "جَامِعَة", translit: "jāmiʿa", en: "university" },
  { id: "rahma", ar: "رَحْمَة", translit: "raḥma", en: "mercy", uz: "rahmat" },
  { id: "mana", ar: "مَعْنًى", translit: "maʿnan", en: "meaning", uz: "ma’no" },
  { id: "ala", ar: "عَلَى", translit: "ʿalā", en: "on" },
  { id: "ila", ar: "إِلَى", translit: "ilā", en: "to" },
  { id: "la", ar: "لَا", translit: "lā", en: "no" },
  { id: "sual", ar: "سُؤَال", translit: "suʾāl", en: "question", uz: "savol" },
  { id: "ras", ar: "رَأْس", translit: "raʾs", en: "head" },
  { id: "bir", ar: "بِئْر", translit: "biʾr", en: "a well" },
  { id: "ma", ar: "مَاء", translit: "māʾ", en: "water" },
];

export const WORD_BY_ID = new Map(WORDS.map((word) => [word.id, word]));

export function getWord(id: string): Word {
  const word = WORD_BY_ID.get(id);
  if (!word) throw new Error(`no word "${id}" in src/data/arabic/words.ts`);
  return word;
}

export function wordClip(word: Word): string {
  return `/lab/arabic/audio/w-${word.id}.mp3`;
}
