import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://binaa-server.vercel.app/api";

function parseUserAgent(userAgent) {
  const browserMap = {
    Chrome: "Chrome",
    Firefox: "Firefox",
    Safari: "Safari",
    Edge: "Edge",
    Opera: "Opera",
    MSIE: "Internet Explorer",
    Trident: "Internet Explorer",
  };

  const osMap = {
    "Windows NT 10.0": "Windows 10",
    "Windows NT 6.3": "Windows 8.1",
    "Windows NT 6.2": "Windows 8",
    "Windows NT 6.1": "Windows 7",
    "Mac OS X": "macOS",
    iPhone: "iOS",
    iPad: "iOS",
    Android: "Android",
    Linux: "Linux",
  };

  let browser = "Unknown";
  let os = "Unknown";
  let device = "Desktop";

  for (const [key, value] of Object.entries(browserMap)) {
    if (userAgent.includes(key)) {
      browser = value;
      break;
    }
  }

  for (const [key, value] of Object.entries(osMap)) {
    if (userAgent.includes(key)) {
      os = value;
      break;
    }
  }

  if (userAgent.includes("Mobile")) {
    device = "Mobile";
  } else if (userAgent.includes("Tablet")) {
    device = "Tablet";
  }

  return { browser, os, device };
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { visitorId, page, email } = data;

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const userAgent = request.headers.get("user-agent") || "";
    const browserInfo = parseUserAgent(userAgent);
    const referrer = request.headers.get("referer") || "";

    const upstream = await fetch(`${API_URL}/visitors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId,
        page,
        email,
        ip,
        ...browserInfo,
        userAgent,
        referrer,
      }),
    });

    const result = await upstream.json();

    if (!upstream.ok) {
      return NextResponse.json(result, { status: upstream.status });
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("خطأ في تسجيل الزائر:", error);
    return NextResponse.json(
      { error: "حدث خطأ في تسجيل الزائر" },
      { status: 500 },
    );
  }
}
