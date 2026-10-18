/** Course outlines — the roadmap, the stage pages and "next lesson" all read these. */

export type Lesson = { slug: string; title: string; arabic: string; blurb: string };

export type Stage = {
  id: string;
  title: string;
  arabic: string;
  /** A few glyphs that stand for the stage on the roadmap. */
  glyph: string;
  blurb: string;
  lessons: Lesson[];
};

export type Course = {
  /** Also the localStorage key progress is kept under. */
  id: string;
  /** Route the stages hang off, e.g. "/lab/arabic". */
  root: string;
  stages: Stage[];
};

export const ARABIC: Course = {
  id: "arabic",
  root: "/lab/arabic",
  stages: [
    {
      id: "letters",
      title: "Letters",
      arabic: "الحُرُوف",
      glyph: "ا ب ت",
      blurb: "Meet the 28 letters: their names, their sounds, the shapes they change into, and where in the mouth each one lives.",
      lessons: [
        { slug: "alphabet", title: "The 28 letters", arabic: "الأَبْجَدِيَّة", blurb: "Every letter with its name, its sound and a word you already know." },
        { slug: "families", title: "Shape families", arabic: "الأُسَر", blurb: "Nine skeletons, told apart by dots — learn 15 shapes instead of 28." },
        { slug: "forms", title: "Letters in a word", arabic: "الأَشْكَال", blurb: "How a letter changes at the start, middle and end, and the six that never join." },
        { slug: "sounds", title: "Where sounds come from", arabic: "المَخَارِج", blurb: "Throat, tongue, lips, nose — a map of the mouth for the hard letters." },
      ],
    },
    {
      id: "vowels",
      title: "Vowels",
      arabic: "الحَرَكَات",
      glyph: "بَ بِ بُ",
      blurb: "Arabic writes consonants; small marks above and below supply the vowels. Learn them and letters start to speak.",
      lessons: [
        { slug: "short-vowels", title: "Fatḥa, kasra, ḍamma", arabic: "الحَرَكَات", blurb: "Three marks, three short vowels: a, i, u." },
        { slug: "sukun-and-shadda", title: "Sukūn and shadda", arabic: "السُّكُون وَالشَّدَّة", blurb: "A letter with no vowel, and a letter said twice." },
        { slug: "long-vowels", title: "Long vowels", arabic: "المُدُود", blurb: "Alif, wāw and yāʾ stretch a vowel to two beats." },
        { slug: "tanween", title: "Tanwīn", arabic: "التَّنْوِين", blurb: "Doubled marks that end a word with an n." },
      ],
    },
    {
      id: "reading",
      title: "Reading",
      arabic: "القِرَاءَة",
      glyph: "كِتَاب",
      blurb: "From syllables to whole words: the article al-, the letters that change shape at the end, and a reading test made of words Uzbek already borrowed.",
      lessons: [
        { slug: "words", title: "Reading whole words", arabic: "الكَلِمَات", blurb: "Syllable by syllable, then all at once." },
        { slug: "the-article", title: "The article al-", arabic: "أَل", blurb: "“The” — and the sun letters that swallow its l." },
        { slug: "special-letters", title: "Special spellings", arabic: "ة ى ء", blurb: "Tāʾ marbūṭa, alif maqṣūra, hamza's seats and lām-alif." },
        { slug: "words-you-know", title: "Words you already know", arabic: "كَلِمَات أُوزْبَكِيَّة", blurb: "Kitob, qalam, maktab — read them in the script they came from." },
      ],
    },
  ],
};

export function lessonHref(course: Course, stage: Stage, lesson: Lesson): string {
  return `${course.root}/${stage.id}/${lesson.slug}`;
}

/** Every lesson in walking order, with its stage. */
export function lessonsOf(course: Course) {
  return course.stages.flatMap((stage) =>
    stage.lessons.map((lesson) => ({ stage, lesson, href: lessonHref(course, stage, lesson) }))
  );
}
