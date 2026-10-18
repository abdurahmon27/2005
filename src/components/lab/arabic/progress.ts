"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Finished lessons live in localStorage, one list per course — no accounts. */

const listeners = new Set<() => void>();
const cache = new Map<string, string[]>();
const EMPTY: string[] = [];

const storageKey = (course: string) => `lab:${course}:done`;

function read(course: string): string[] {
  const cached = cache.get(course);
  if (cached) return cached;
  let value: string[] = [];
  try {
    value = JSON.parse(window.localStorage.getItem(storageKey(course)) ?? "[]") as string[];
  } catch {
    // unreadable storage just means a fresh start
  }
  cache.set(course, value);
  return value;
}

export function setDone(course: string, href: string, done: boolean) {
  const next = read(course).filter((item) => item !== href);
  if (done) next.push(href);
  cache.set(course, next);
  try {
    window.localStorage.setItem(storageKey(course), JSON.stringify(next));
  } catch {
    // private mode: progress lasts for the tab, which is fine
  }
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (!event.key?.startsWith("lab:")) return;
    cache.clear();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useDone(course: string): string[] {
  const snapshot = useCallback(() => read(course), [course]);
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY);
}
