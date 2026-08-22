import "./jms.css";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Japan Matcha Select (/japan-matcha-select) のメタデータ。
//
// SOMAの新規事業「日本の抹茶を海外の卸バイヤーへ紹介する」ためのLP。
// 読者は海外のバイヤーなので言語は英語、locale は en_US。
// 日本語トップ (/) とも英語版 (/en) とも内容が対応しないため、
// hreflang で結んではいけない（理由は app/layout.js のコメントを参照）。
//
// OGP画像は現状 public/images/japan-matcha-select/hero-matcha.svg が
// プレースホルダーのため指定していない。本番写真が入り次第、
// 1200x630 にクロップした og-matcha.jpg を用意して openGraph.images に足すこと。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const metadata = {
  title: "Japan Matcha Select | Premium Japanese Matcha Wholesale",
  description:
    "Premium Japanese matcha for retailers, cafés, restaurants, and distributors. Japan Matcha Select connects international buyers with carefully selected Japanese matcha producers.",
  alternates: {
    canonical: "/japan-matcha-select",
  },
  openGraph: {
    title: "Japan Matcha Select | Premium Japanese Matcha Wholesale",
    description:
      "Premium Japanese matcha selected for international wholesale buyers.",
    url: "https://www.soma-jp.net/japan-matcha-select",
    siteName: "SOMA Inc.",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Matcha Select | Premium Japanese Matcha Wholesale",
    description:
      "Premium Japanese matcha selected for international wholesale buyers.",
  },
};

// ページ側のFAQ文言を変えたら、こちらの FAQPage も必ず同時に直すこと。
// 実際の表示と構造化データがずれると、リッチリザルトの対象から外れる。
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Japan Matcha Select",
    "url": "https://www.soma-jp.net/japan-matcha-select",
    // 運営元は app/layout.js で定義済みのSOMAの組織スキーマを @id で参照する
    "parentOrganization": { "@id": "https://www.soma-jp.net/#organization" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you ship internationally?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes. International shipping availability depends on the product and destination.",
        },
      },
      {
        "@type": "Question",
        "name": "Can I purchase small wholesale quantities?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Minimum order quantities vary by product. Please check Faire listings or contact us.",
        },
      },
      {
        "@type": "Question",
        "name": "Do you offer café-grade matcha?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes. We offer matcha suitable for cafés, matcha lattes, desserts, and food service.",
        },
      },
      {
        "@type": "Question",
        "name": "Can distributors contact you?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We welcome inquiries from distributors and importers.",
        },
      },
      {
        "@type": "Question",
        "name": "Can you source specific Japanese matcha products?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Depending on your requirements, we may be able to introduce suitable Japanese producers and products.",
        },
      },
    ],
  },
];

export default function JapanMatchaSelectLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
