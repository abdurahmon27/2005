"use client";

import "./arabic.css";

import { useState } from "react";

import {
  type Letter,
  type SyllableKind,
  HAMZA,
  LETTERS,
  LETTER_BY_ID,
  clip,
  syllable,
  syllableLatin,
} from "@/data/arabic/letters";

import { arabicFonts } from "./fonts";
import { PlayIcon } from "./ornaments";
import { play, usePlaying } from "./player";

type Choice = { letter: Letter; kind: SyllableKind | "name" };
type Question = { answer: Choice; options: Choice[] };

const same = (a: Choice, b: Choice) => a.letter.id === b.letter.id && a.kind === b.kind;

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function makeQuestions(pool: Letter[], kinds: (SyllableKind | "name")[], rounds: number): Question[] {
  const questions: Question[] = [];
  let last: Choice | null = null;
  while (questions.length < rounds) {
    const answer: Choice = {
      letter: pool[Math.floor(Math.random() * pool.length)],
      kind: kinds[Math.floor(Math.random() * kinds.length)],
    };
    if (last && same(last, answer)) continue;
    last = answer;

    // With several vowels in play, the hard part is the vowel — keep the letter, vary the mark.
    const sameLetter = kinds.length > 1 ? kinds.filter((kind) => kind !== answer.kind).map((kind) => ({ letter: answer.letter, kind })) : [];
    const otherLetters = shuffle(pool.filter((letter) => letter.id !== answer.letter.id)).map((letter) => ({ letter, kind: answer.kind }));
    const distractors = [...shuffle(sameLetter), ...otherLetters].slice(0, 3);
    questions.push({ answer, options: shuffle([answer, ...distractors]) });
  }
  return questions;
}

function label(choice: Choice) {
  return choice.kind === "name" ? choice.letter.char : syllable(choice.letter, choice.kind);
}

function latin(choice: Choice) {
  return choice.kind === "name" ? choice.letter.latin : syllableLatin(choice.letter, choice.kind);
}

/**
 * `<ListenQuiz kinds="a i u" letters="ha hha ayn" rounds={10} />` — hear a
 * sound, pick what you heard. `kinds` takes syllable kinds or "name".
 */
export function ListenQuiz({
  title = "Listen and choose",
  kinds = "a",
  letters,
  rounds = 10,
}: {
  title?: string;
  kinds?: string;
  letters?: string;
  rounds?: number;
}) {
  const kindList = kinds.split(/\s+/) as (SyllableKind | "name")[];
  const pool = letters
    ? letters.split(/\s+/).map((id) => LETTER_BY_ID.get(id)!)
    : [...LETTERS, HAMZA].filter((letter) => !(letter.id === "alif" && kindList.includes("s")));

  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [picked, setPicked] = useState<Choice | null>(null);
  const playing = usePlaying();

  const srcOf = (choice: Choice) => clip(choice.letter, choice.kind);

  const start = () => {
    const next = makeQuestions(pool, kindList, rounds);
    setQuestions(next);
    setIndex(0);
    setResults([]);
    setPicked(null);
    play(srcOf(next[0].answer), "quiz");
  };

  const pick = (choice: Choice) => {
    if (!questions || picked) return;
    const right = same(choice, questions[index].answer);
    setPicked(choice);
    setResults((previous) => [...previous, right]);
    if (!right) setTimeout(() => play(srcOf(questions[index].answer), "quiz"), 350);
  };

  const next = () => {
    if (!questions) return;
    const following = index + 1;
    setIndex(following);
    setPicked(null);
    if (following < questions.length) play(srcOf(questions[following].answer), "quiz");
  };

  const done = questions && index >= questions.length;
  const score = results.filter(Boolean).length;
  const question = questions && !done ? questions[index] : null;

  return (
    <div className={`q-root not-prose ${arabicFonts}`}>
      <div className="q-quiz">
        <div className="q-quiz-head">
          <span className="q-quiz-title">🎧 {title}</span>
          {questions && (
            <span className="q-quiz-score">
              {score}/{results.length} right
            </span>
          )}
        </div>

        {!questions && (
          <div className="q-quiz-result">
            <p style={{ margin: 0, color: "#a89984", fontSize: "0.85rem" }}>
              {rounds} sounds. Listen, then pick what you heard — no reading the answer first.
            </p>
            <button type="button" className="q-play q-play-solid" onClick={start}>
              <PlayIcon /> start
            </button>
          </div>
        )}

        {questions && (
          <div className="q-quiz-dots">
            {questions.map((_, i) => (
              <i key={i} data-state={i < results.length ? (results[i] ? "right" : "wrong") : i === index ? "now" : ""} />
            ))}
          </div>
        )}

        {questions && question && (
          <>
            <div className="q-quiz-listen">
              <button
                type="button"
                className="q-quiz-big"
                data-playing={playing === "quiz"}
                onClick={() => play(srcOf(question.answer), "quiz")}
                aria-label="Play the sound again"
              >
                <PlayIcon />
              </button>
              <span className="q-kicker">press to hear it again</span>
            </div>
            <div className="q-quiz-options">
              {question.options.map((option) => {
                const isAnswer = same(option, question.answer);
                const state = picked ? (isAnswer ? "right" : same(option, picked) ? "wrong" : "") : "";
                return (
                  <button
                    key={`${option.letter.id}-${option.kind}`}
                    type="button"
                    className="q-option"
                    data-state={state}
                    disabled={Boolean(picked)}
                    onClick={() => pick(option)}
                  >
                    <span className="q-ar" lang="ar">
                      {label(option)}
                    </span>
                    {picked && <span className="q-latin">{latin(option)}</span>}
                  </button>
                );
              })}
            </div>
            <div className="q-quiz-foot" data-state={picked ? (same(picked, question.answer) ? "right" : "wrong") : ""}>
              <span>
                {picked
                  ? same(picked, question.answer)
                    ? "Right."
                    : `That was ${latin(question.answer)} — listen once more.`
                  : ""}
              </span>
              {picked && (
                <button type="button" className="q-play" onClick={next}>
                  {index + 1 === questions.length ? "see score" : "next →"}
                </button>
              )}
            </div>
          </>
        )}

        {questions && done && (
          <div className="q-quiz-result">
            <strong>
              {score}/{questions.length}
            </strong>
            <span style={{ color: "#a89984", fontSize: "0.85rem" }}>
              {score === questions.length
                ? "Perfect — your ear is ready for the next lesson."
                : score >= questions.length * 0.7
                  ? "Good. One more round and it sticks."
                  : "The ear takes time. Go back to the grid, listen, then try again."}
            </span>
            <button type="button" className="q-play q-play-solid" onClick={start}>
              <PlayIcon /> again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
