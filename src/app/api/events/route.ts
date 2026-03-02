import { NextRequest, NextResponse } from "next/server";

const BASE_URL =
  "https://staging-backend.thebobproject.co/api/public/v2/event/list";

export async function GET(req: NextRequest) {
  // Forward all query params from the client request
  const params = req.nextUrl.searchParams.toString();
  const url = params ? `${BASE_URL}?${params}` : BASE_URL;

  const token = req.headers.get("Authorization");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = token;
  }

  try {
    const res = await fetch(url, { headers });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
