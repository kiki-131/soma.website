// 英語版 (/en) のメタデータ。
// このページは日本語トップ (/) の翻訳ではなく、商流が逆向きの別事業のLP。
//   /    : 日本企業 → 海外 (Kickstarter / Indiegogo / zeczec への出品支援)
//   /en  : 海外メーカー → 日本 (Makuake / CAMPFIRE / GREEN FUNDING への出品代行)
// そのため hreflang で / と結んではいけない（詳細は app/layout.js のコメント参照）。
//
// OGP画像 (/public/images/og-en.jpg) はヒーローと同じ新宿の街路写真を
// 1200x630 にクロップしたもの。将来、英語コピー入りのバナーを作る場合は
// 同じパスに差し替えれば metadata の変更は不要。
export const metadata = {
  title: "Launch on Makuake from Overseas | Japan Crowdfunding Agency",
  description:
    "Makuake requires a Japanese project page, Japanese backer support, and Japan-only shipping. SOMA runs all of it for you — Makuake, CAMPFIRE, GREEN FUNDING.",
  alternates: {
    canonical: "/en",
  },
  openGraph: {
    title: "Launch on Makuake from Overseas | Japan Crowdfunding Agency",
    description:
      "Makuake requires a Japanese project page, Japanese backer support, and Japan-only shipping. SOMA runs all of it for you.",
    url: "https://www.soma-jp.net/en",
    siteName: "SOMA Inc.",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.soma-jp.net/images/og-en.jpg",
        width: 1200,
        height: 630,
        alt: "A street in Tokyo lined with Japanese signage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Launch on Makuake from Overseas | SOMA Inc.",
    description:
      "Japanese page. Japanese backer support. Japan-only shipping. Japanese certifications. We handle the whole wall.",
    images: ["https://www.soma-jp.net/images/og-en.jpg"],
  },
};

export default function EnLayout({ children }) {
  return children;
}
