import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || "3";

  const service = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
  const key = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

  if (!service || !key) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const res = await fetch(
      `https://${service}.microcms.io/api/v1/blogs?limit=${limit}&orders=-publishedAt`,
      {
        headers: { "X-MICROCMS-API-KEY": key },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json([], { status: 200 });
    }

    const data = await res.json();
    const posts = (data.contents || []).map((post) => ({
      id: post.id,
      title: post.title,
      date: post.publishedAt || null,
      thumbnail: post.eyecatch?.url || null,
      excerpt: post.description || post.excerpt || null,
    }));

    return NextResponse.json(posts);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
