import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { postId, action } = await request.json();

    if (!postId || !action) {
      return NextResponse.json(
        { error: "postId and action are required" },
        { status: 400 }
      );
    }

    const service = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
    // サーバーサイドでは書き込み権限のあるAPIキーを使用
    const apiKey = process.env.MICROCMS_API_KEY || process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

    if (!service || !apiKey) {
      console.error("microCMS configuration missing:", { service, hasApiKey: !!apiKey });
      return NextResponse.json(
        { error: "microCMS configuration missing" },
        { status: 500 }
      );
    }

    // 現在の記事データを取得
    const getRes = await fetch(
      `https://${service}.microcms.io/api/v1/blogs/${postId}`,
      {
        headers: {
          "X-MICROCMS-API-KEY": apiKey,
        },
      }
    );

    if (!getRes.ok) {
      const errorText = await getRes.text();
      console.error("Failed to fetch post:", getRes.status, errorText);
      return NextResponse.json(
        { error: "Failed to fetch post", details: errorText },
        { status: getRes.status }
      );
    }

    const post = await getRes.json();
    const currentLikes = post.likes || 0;

    // いいね数を更新
    const newLikes = action === "like" ? currentLikes + 1 : Math.max(0, currentLikes - 1);

    // microCMSを更新
    const updateRes = await fetch(
      `https://${service}.microcms.io/api/v1/blogs/${postId}`,
      {
        method: "PATCH",
        headers: {
          "X-MICROCMS-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes: newLikes }),
      }
    );

    if (!updateRes.ok) {
      const errorText = await updateRes.text();
      console.error("Failed to update likes:", updateRes.status, errorText);
      return NextResponse.json(
        { error: "Failed to update likes", details: errorText },
        { status: updateRes.status }
      );
    }

    return NextResponse.json({ likes: newLikes });
  } catch (error) {
    console.error("Likes API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
