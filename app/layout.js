import { Geist, Geist_Mono, Archivo, Instrument_Sans, Newsreader, Cormorant_Garamond, Manrope } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import SectionBackground from "./components/SectionBackground";
import Preloader from "./components/Preloader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// ── 英語版 (/en) 専用の書体 ──
// 日本語サイトは globals.css の body 指定に従うため、ここで変数を定義しても影響しない。
// 実際の適用は app/en/en.css の .en-scope 内に閉じている。
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"], // 可変幅軸。太さではなく字幅で見出しの強さを作る
  display: "swap",
  variable: "--font-archivo",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

// ── Japan Matcha Select (/japan-matcha-select) 専用の書体 ──
// 見出しに Cormorant Garamond、本文に Manrope。
// 適用は app/japan-matcha-select/jms.css の .jms-scope 内に閉じているため、
// ここで変数を定義しても他ページの見た目は変わらない。
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

// 法令原文の引用にのみ使う。書体の切り替えだけで「他人が書いた文章」だと示す
const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-newsreader",
});

export const metadata = {
  title:
    "海外クラファン代行・サポート｜Kickstarter/Indiegogo/zeczec支援のSOMA株式会社",
  description:
    "海外クラファン（海外クラウドファンディング）の代行・サポートならSOMA。Kickstarter、Indiegogo、zeczecなど、世界各国のプラットフォームに対応。戦略立案からページ作成、集客、物流までフルサポートで海外進出を成功へ導きます。",
  metadataBase: new URL('https://www.soma-jp.net'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "海外クラファン代行・サポート｜SOMA株式会社",
    description: "海外クラファン（海外クラウドファンディング）の代行・サポートならSOMA。Kickstarter、Indiegogo、zeczecなど、世界各国のプラットフォームに対応。戦略立案からページ作成、集客、物流までフルサポートで海外進出を成功へ導きます。",
    url: 'https://www.soma-jp.net',
    siteName: 'SOMA株式会社',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    // @id を持たせることで、/en 側のスキーマから組織を再定義せずに参照できる
    "@id": "https://www.soma-jp.net/#organization",
    "name": "SOMA株式会社",
    // 英語圏の指名検索で正しく認識させるため
    "alternateName": "SOMA Inc.",
    "url": "https://www.soma-jp.net",
    "logo": "https://www.soma-jp.net/images/logo.PNG",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "areaServed": ["JP", "US", "CA"],
      "availableLanguage": ["Japanese", "English"]
    }
  };

  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
  {/* Google Search Console verification */}
  <meta name="google-site-verification" content="dUDQ3flZLVkugl6GHITZ9JnXfFbxcbNCcggPtVkpppQ" />
  <meta name="google-site-verification" content="c5f6ZdW9gJjqC36izVL3aay5HrmPK_CC1JLAWPiNgi4" />
  {/*
    hreflangは意図的に設定していない。
    hreflangは「同一・同等コンテンツの言語違い」を示すものだが、
    / (日本企業→海外への進出支援) と /en (海外メーカー→日本のクラファン出品代行) は
    翻訳関係ではなく対象読者も商流も逆の別事業のLPであるため、
    結ぶと検索結果で無関係なページに差し替えられ、確実に誤配が起きる。
    将来、日本語版と同等内容の英語ページ (例: /en/outbound) を作った際に、
    そのURLと / を結ぶこと。
  */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} ${instrumentSans.variable} ${newsreader.variable} ${cormorant.variable} ${manrope.variable} antialiased`}>
        <Preloader />
        <SectionBackground />
        {children}
      </body>
      <GoogleAnalytics gaId="G-S1KMYY7C0B" />
    </html>
  );
}
