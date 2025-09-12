import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const { niche, region, audience } = await req.json();

  try {
    const response = await fetch("http://localhost:8000/analyze/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ niche, region, audience }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const output = await response.json();
    return NextResponse.json(output);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
