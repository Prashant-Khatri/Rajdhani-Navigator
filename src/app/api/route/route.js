import { NextResponse } from "next/server";
import { findShortestRoute } from "@/lib/metroServer";

export async function POST(req) {
  try {
    const { start, end } = await req.json();
    if (!start || !end) {
      return NextResponse.json({ error: 'start and end required' }, { status: 400 });
    }
    const path = findShortestRoute(start, end);
    if (!path) {
      return NextResponse.json({ error: 'No route found' }, { status: 404 });
    }
    return NextResponse.json({ path });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
