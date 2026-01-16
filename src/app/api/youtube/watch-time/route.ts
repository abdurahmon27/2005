import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!;
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID!;

export async function GET() {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
    );
    const data = await res.json();

    const viewCount = data.items[0].statistics.viewCount;

    // YouTube API doesn't directly provide watch time, but we can estimate it
    // Average watch time per view is typically 40-60% of video duration
    // For estimation, we'll use viewCount as a base metric
    const estimatedWatchTimeMinutes = Math.floor(
      parseInt(viewCount, 10) * 0.5 * 8
    ); // Assuming 8 min average video length, 50% retention

    return NextResponse.json({
      watchTimeMinutes: estimatedWatchTimeMinutes,
      watchTimeHours: Math.floor(estimatedWatchTimeMinutes / 60),
      viewCount: parseInt(viewCount, 10),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch watch time data" },
      { status: 500 }
    );
  }
}
