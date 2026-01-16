/* eslint-disable no-console */
import { getLogPage } from "@/services/notion";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const logPage = await getLogPage();

    if (!logPage) {
      return NextResponse.json({ error: "Log page not found" }, { status: 404 });
    }

    return NextResponse.json(logPage);
  } catch (error) {
    console.error("Error fetching Log page:", error);
    return NextResponse.json({ error: "Failed to fetch Log page" }, { status: 500 });
  }
}
