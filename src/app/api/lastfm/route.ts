import { NextResponse } from "next/server";

const API_KEY = process.env.LASTFM_API_KEY;
const USERNAME = process.env.LASTFM_USERNAME;

/** How long a response is reused before last.fm is asked again. */
const REVALIDATE_SECONDS = 30;

interface LastfmTrack {
  name: string;
  url: string;
  artist?: { "#text"?: string };
  album?: { "#text"?: string };
  date?: { uts?: string };
  "@attr"?: { nowplaying?: string };
}

export async function GET(request: Request) {
  if (!API_KEY || !USERNAME) {
    return NextResponse.json(
      { error: "last.fm is not configured" },
      { status: 503 }
    );
  }

  const requested = Number(new URL(request.url).searchParams.get("limit"));
  const limit = Math.min(Math.max(Math.trunc(requested) || 5, 1), 20);

  const params = new URLSearchParams({
    method: "user.getrecenttracks",
    user: USERNAME,
    api_key: API_KEY,
    format: "json",
    limit: String(limit),
  });

  try {
    const res = await fetch(`https://ws.audioscrobbler.com/2.0/?${params}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    const data = await res.json();
    if (!res.ok || data.error) {
      throw new Error(data.message ?? `last.fm answered ${res.status}`);
    }

    // a single track comes back as an object rather than a one-item array
    const raw: LastfmTrack[] = [data.recenttracks?.track ?? []].flat();

    // the track playing right now is sent on top of `limit`, not as part of it
    const tracks = raw.slice(0, limit).map((track) => ({
      title: track.name,
      artist: track.artist?.["#text"] ?? "",
      album: track.album?.["#text"] ?? "",
      url: track.url,
      nowPlaying: track["@attr"]?.nowplaying === "true",
      playedAt: track.date?.uts ? Number(track.date.uts) * 1000 : null,
    }));

    return NextResponse.json({
      user: USERNAME,
      profileUrl: `https://www.last.fm/user/${encodeURIComponent(USERNAME)}`,
      scrobbles: Number(data.recenttracks?.["@attr"]?.total) || 0,
      tracks,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch recent tracks" },
      { status: 502 }
    );
  }
}
