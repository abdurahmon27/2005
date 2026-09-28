import Link from "next/link";

import music from "@/data/music.json";

/** ms -> m:ss, the way a player shows it. */
function duration(ms: number): string {
  const total = Math.floor(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

/**
 * The playlist is read from a JSON file that a scheduled workflow refreshes
 * with yamu — nothing is fetched while the page is open.
 */
export function Listening({ limit = 5 }: { limit?: number }) {
  const playlist = music.playlist;
  if (!playlist || playlist.tracks.length === 0) return null;

  return (
    <div>
      <p className="mb-3 font-mono text-xs text-muted-foreground">listening:</p>

      <ul className="space-y-1.5">
        {playlist.tracks.slice(0, limit).map((track) => (
          <li key={track.id} className="flex items-baseline gap-3 text-sm">
            <Link
              href={track.url ?? playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-foreground transition-colors hover:text-primary"
            >
              {track.title}
              <span className="text-muted-foreground"> — {track.artists}</span>
            </Link>
            <span className="ml-auto shrink-0 font-mono text-xs text-muted-foreground">
              {duration(track.durationMs)}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-3 font-mono text-xs text-muted-foreground">
        <Link
          href={playlist.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-foreground/30 transition-colors hover:text-primary"
        >
          {playlist.trackCount} tracks on yandex music
        </Link>
        {" · built with "}
        <Link
          href="https://github.com/abdurahmon27/yamu"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-foreground/30 transition-colors hover:text-primary"
        >
          yamu
        </Link>
      </p>
    </div>
  );
}
