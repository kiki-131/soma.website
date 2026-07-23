import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import crypto from "crypto";

// microCMSのwebhookから呼ばれ、記事の公開/編集/削除時だけキャッシュを更新する。
// これにより、クローラーの通常アクセスではISR書き込みが発生しなくなる。
export const dynamic = "force-dynamic";

export async function POST(request) {
  const secret = process.env.MICROCMS_WEBHOOK_SECRET;

  // 署名検証用に生のボディを取得
  const rawBody = await request.text();

  // シークレットが設定されている場合はmicroCMSの署名を検証する
  if (secret) {
    const signature = request.headers.get("x-microcms-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }
    const expected = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expected);
    if (
      sigBuf.length !== expBuf.length ||
      !crypto.timingSafeEqual(sigBuf, expBuf)
    ) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  // ボディから対象記事のIDを取得（取れなくてもタグ単位で更新する）
  let id = null;
  try {
    const payload = rawBody ? JSON.parse(rawBody) : {};
    id = payload?.id || payload?.contents?.new?.id || null;
  } catch {
    // JSON以外でも一覧・トップは更新するので握りつぶす
  }

  // blogsタグの付いたデータキャッシュ（一覧・詳細・サイトマップ）を一括で無効化
  revalidateTag("blogs");

  // 主要ルートも明示的に再検証
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  if (id) {
    revalidatePath(`/blog/${id}`);
  }

  return NextResponse.json({ revalidated: true, id, now: Date.now() });
}
