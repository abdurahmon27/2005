import { NextResponse } from 'next/server'

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID!

export async function GET() {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
    )
    const data = await res.json()

    const subscribers = data.items[0].statistics.subscriberCount

    return NextResponse.json({ subscribers: parseInt(subscribers, 10) })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscriber count' }, { status: 500 })
  }
}


