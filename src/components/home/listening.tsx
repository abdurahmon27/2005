"use client";
import Link from "next/link";
import useSWR from "swr";
import { formatDistanceToNowStrict } from "date-fns";

interface Track {
  title: string;
  artist: string;
  album: string;
  url: string;
  nowPlaying: boolean;
  playedAt: number | null;
}

interface Recent {
  user: string;
  profileUrl: string;
  scrobbles: number;
  tracks: Track[];
}

const fetcher = async (url: string): Promise<Recent> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`last.fm route answered ${res.status}`);
  return res.json();
};

/**
 * What last.fm has scrobbled most recently, with the track that is playing
 * right now on top. Renders nothing until there is something to show, so a
 * missing key or a last.fm outage costs this block and not the page.
 */
export function Listening({ limit = 5 }: { limit?: number }) {
  const { data } = useSWR<Recent>(`/api/lastfm?limit=${limit}`, fetcher, {
    refreshInterval: 60_000,
    shouldRetryOnError: false,
  });

  if (!data || data.tracks.length === 0) return null;

  return (
    <div>
      <p className="mb-3 font-mono text-xs text-muted-foreground">listening:</p>

      <ul className="space-y-1.5">
        {data.tracks.map((track) => (
          <li
            key={`${track.url}-${track.playedAt ?? "now"}`}
            className="flex items-baseline gap-3 text-sm"
          >
            <Link
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-foreground transition-colors hover:text-primary"
            >
              {track.title}
              <span className="text-muted-foreground"> — {track.artist}</span>
            </Link>
            <span
              className={`ml-auto shrink-0 font-mono text-xs ${
                track.nowPlaying ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {track.nowPlaying
                ? "now"
                : track.playedAt
                  ? formatDistanceToNowStrict(track.playedAt, { addSuffix: true })
                  : ""}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-3 font-mono text-xs text-muted-foreground">
        <Link
          href={data.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-foreground/30 transition-colors hover:text-primary"
        >
          {data.scrobbles.toLocaleString("en-US")} scrobbles on last.fm
        </Link>
      </p>
    </div>
  );
}
