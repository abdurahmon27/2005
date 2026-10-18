"use client";

import "./arabic.css";

import { useState } from "react";

import { type Word, getWord, wordClip } from "@/data/arabic/words";

import { arabicFonts } from "./fonts";
import { PlayIcon } from "./ornaments";
import { play } from "./player";

type Question = { answer: Word; options: Word[] };

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * `<ReadQuiz words="kitab qalam …" answer="latin" />` — the word on its own,
 * no Latin, no sound: read it, then pick. `answer` is what the options show:
 * the Latin reading, the English meaning, or the Uzbek word it became.
 */
export function ReadQuiz({
  title = "Read it, then choose",
  words,
  answer = "latin",
  rounds = 10,
}: {
  title?: string;
  words: string;
  answer?: "latin" | "en" | "uz";
  rounds?: number;
}) {
  const pool = words
    .split(/\s+/)
    .filter(Boolean)
    .map(getWord)
    .filter((word) => answer !== "uz" || word.uz);

  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [picked, setPicked] = useState<Word | null>(null);

  const show = (word: Word) => (answer === "latin" ? word.translit : answer === "en" ? word.en : word.uz);

  const start = () => {
    const order = shuffle(pool).slice(0, Math.min(rounds, pool.length));
    setQuestions(
      order.map((word) => ({
        answer: word,
        options: shuffle([word, ...shuffle(pool.filter((other) => other.id !== word.id)).slice(0, 3)]),
      }))
    );
    setIndex(0);
    setResults([]);
    setPicked(null);
  };

  const pick = (word: Word) => {
    if (!questions || picked) return;
    setPicked(word);
    setResults((previous) => [...previous, word.id === questions[index].answer.id]);
    play(wordClip(questions[index].answer));
  };

  const done = questions && index >= questions.length;
  const question = questions && !done ? questions[index] : null;
  const score = results.filter(Boolean).length;

  return (
    <div className={`q-root not-prose ${arabicFonts}`}>
      <div className="q-quiz">
        <div className="q-quiz-head">
          <span className="q-quiz-title">📖 {title}</span>
          {questions && (
            <span className="q-quiz-score">
              {score}/{results.length} right
            </span>
          )}
        </div>

        {!questions && (
          <div className="q-quiz-result">
            <p style={{ margin: 0, color: "#a89984", fontSize: "0.85rem" }}>
              {Math.min(rounds, pool.length)} words, no help. Sound each one out in your head first.
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
              <span className="q-ar" lang="ar" style={{ fontSize: "3.6rem", lineHeight: 1.6, color: "#fbf1c7" }}>
                {question.answer.ar}
              </span>
              {picked && <span className="q-latin">{question.answer.translit} · {question.answer.en}</span>}
            </div>
            <div className="q-quiz-options" style={{ direction: "ltr" }}>
              {question.options.map((option) => {
                const state = picked
                  ? option.id === question.answer.id
                    ? "right"
                    : option.id === picked.id
                      ? "wrong"
                      : ""
                  : "";
                return (
                  <button
                    key={option.id}
                    type="button"
                    className="q-option"
                    data-state={state}
                    disabled={Boolean(picked)}
                    onClick={() => pick(option)}
                    style={{ padding: "0.8rem 0.4rem", fontSize: "0.9rem" }}
                  >
                    {show(option)}
                  </button>
                );
              })}
            </div>
            <div className="q-quiz-foot" data-state={picked ? (picked.id === question.answer.id ? "right" : "wrong") : ""}>
              <span>{picked ? (picked.id === question.answer.id ? "Right — you read it." : "Not quite — listen and look again.") : ""}</span>
              {picked && (
                <button
                  type="button"
                  className="q-play"
                  onClick={() => {
                    setIndex((value) => value + 1);
                    setPicked(null);
                  }}
                >
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
              {score === questions.length ? "You can read Arabic script." : "Good practice — go again and the misses will stick."}
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
