"use client";

import { useSyncExternalStore } from "react";

/**
 * One audio element for the whole course: pressing a new sound always stops
 * the last one, and any button can ask "is my sound the one playing?".
 */

let element: HTMLAudioElement | null = null;
let playing: string | null = null;
let finish: ((completed: boolean) => void) | null = null;
const listeners = new Set<() => void>();

function setPlaying(id: string | null) {
  playing = id;
  for (const listener of listeners) listener();
}

function settle(completed: boolean) {
  const done = finish;
  finish = null;
  setPlaying(null);
  done?.(completed);
}

/** Plays `src`; resolves `true` when it ends, `false` if something cut it off. */
export function play(src: string, id: string = src): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (!element) {
    element = new Audio();
    element.preload = "auto";
    element.addEventListener("ended", () => settle(true));
    element.addEventListener("error", () => settle(false));
  }

  settle(false);
  element.pause();
  element.src = src;
  element.currentTime = 0;
  setPlaying(id);

  return new Promise<boolean>((resolve) => {
    finish = resolve;
    element?.play().catch(() => settle(false));
  });
}

export function stop() {
  element?.pause();
  settle(false);
}

/** Plays a list back to back; stops as soon as anything else takes over. */
export async function playAll(
  items: { src: string; id: string }[],
  onItem?: (index: number) => void
): Promise<boolean> {
  for (const [index, item] of items.entries()) {
    onItem?.(index);
    const completed = await play(item.src, item.id);
    if (!completed) return false;
  }
  return true;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** The id of whatever is playing right now, or null. */
export function usePlaying(): string | null {
  return useSyncExternalStore(
    subscribe,
    () => playing,
    () => null
  );
}
