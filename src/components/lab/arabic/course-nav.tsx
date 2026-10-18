"use client";

import "./arabic.css";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { type Course, ARABIC, lessonHref, lessonsOf } from "@/data/arabic/course";

import { arabicFonts } from "./fonts";
import { Rosette, StarPattern } from "./ornaments";
import { play, usePlaying } from "./player";
import { setDone, useDone } from "./progress";

/** The opening image: one big word in a rosette over a star tiling. Press the word to hear it. */
export function Hero({
  word,
  src,
  children,
  className = arabicFonts,
}: {
  word: string;
  src: string;
  children: React.ReactNode;
  className?: string;
}) {
  const playing = usePlaying() === src;
  return (
    <div className={`q-root not-prose ${className}`}>
      <div className="q-hero">
        <StarPattern id="hero-stars" className="q-hero-pattern" size={72} opacity={0.4} />
        <div className="q-hero-inner">
          <button type="button" className="q-hero-word" data-playing={playing} onClick={() => play(src)} aria-label="Hear it">
            <Rosette id="hero-rosette" />
            <span lang="ar">{word}</span>
          </button>
          <div className="q-hero-caption">{children}</div>
        </div>
      </div>
    </div>
  );
}

/** `<CourseRoadmap />` — the four stages, every lesson, and how far you are. */
export function CourseRoadmap({ course = ARABIC }: { course?: Course }) {
  const done = useDone(course.id);
  const lessons = lessonsOf(course);
  const finished = lessons.filter((item) => done.includes(item.href)).length;
  const next = lessons.find((item) => !done.includes(item.href));

  return (
    <div className={`q-root not-prose ${arabicFonts}`}>
      <div className="q-progress">
        <span className="q-kicker">
          {finished}/{lessons.length} lessons
        </span>
        <div className="q-progress-bar">
          <span style={{ width: `${(finished / lessons.length) * 100}%` }} />
        </div>
        {next && (
          <Link href={next.href} className="q-lesson-chip" data-done="false">
            {finished === 0 ? "start" : "continue"}: {next.lesson.title} →
          </Link>
        )}
      </div>

      <ol className="q-steps">
        {course.stages.map((stage, index) => (
          <li key={stage.id} className="q-step">
            <Link href={`${course.root}/${stage.id}`} className="q-step-art" aria-label={stage.title}>
              <StarPattern id={`stage-${stage.id}`} size={36} opacity={0.5} />
              <span lang="ar">{stage.glyph}</span>
            </Link>
            <div>
              <div className="q-step-head">
                <h3>
                  <span className="q-kicker" style={{ marginRight: "0.5rem" }}>
                    stage {index + 1}
                  </span>
                  {stage.title}
                </h3>
                <span className="q-ar" lang="ar">
                  {stage.arabic}
                </span>
              </div>
              <p className="q-step-blurb">{stage.blurb}</p>
              <ul className="q-lessons">
                {stage.lessons.map((lesson) => {
                  const href = lessonHref(course, stage, lesson);
                  const isDone = done.includes(href);
                  return (
                    <li key={lesson.slug}>
                      <Link href={href} className="q-lesson-chip" data-done={isDone}>
                        {isDone && <span className="q-check">✓</span>}
                        {lesson.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** `<StageLessons stage="letters" />` — the lesson cards on a stage page. */
export function StageLessons({ stage: id, course = ARABIC }: { stage: string; course?: Course }) {
  const done = useDone(course.id);
  const stage = course.stages.find((item) => item.id === id);
  if (!stage) return null;

  return (
    <div className={`q-root not-prose ${arabicFonts}`}>
      <ol className="q-lesson-cards">
        {stage.lessons.map((lesson, index) => {
          const href = lessonHref(course, stage, lesson);
          const isDone = done.includes(href);
          return (
            <li key={lesson.slug}>
              <Link href={href} className="q-lesson-card" data-done={isDone}>
                <span className="q-lesson-card-top">
                  <span className="q-kicker">{isDone ? "✓ done" : `lesson ${index + 1}`}</span>
                  <span className="q-ar" lang="ar">
                    {lesson.arabic}
                  </span>
                </span>
                <strong>{lesson.title}</strong>
                <p>{lesson.blurb}</p>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** `<LessonNav />` at the end of a lesson: mark it learned, go to the next one. */
export function LessonNav({ course = ARABIC }: { course?: Course }) {
  const pathname = usePathname();
  const done = useDone(course.id);
  const lessons = lessonsOf(course);
  const index = lessons.findIndex((item) => item.href === pathname);
  if (index === -1) return null;

  const current = lessons[index];
  const next = lessons[index + 1];
  const isDone = done.includes(current.href);

  return (
    <div className={`q-root not-prose ${arabicFonts}`}>
      <div className="q-lesson-nav">
        <button type="button" className="q-done-toggle" data-done={isDone} onClick={() => setDone(course.id, current.href, !isDone)}>
          <span className="q-check">{isDone ? "✓" : ""}</span>
          {isDone ? "learned" : "mark as learned"}
        </button>
        {next ? (
          <Link href={next.href} className="q-next" onClick={() => setDone(course.id, current.href, true)}>
            <small>
              next · {next.stage.id === current.stage.id ? `lesson ${index + 2}` : `stage: ${next.stage.title}`}
            </small>
            {next.lesson.title} →
          </Link>
        ) : (
          <Link href={course.root} className="q-next">
            <small>you finished the course</small>
            back to the roadmap →
          </Link>
        )}
      </div>
    </div>
  );
}
