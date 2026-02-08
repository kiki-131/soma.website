import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "海外クラウドファンディング代行｜Kickstarter/Indiegogo/zeczec支援｜SOMA株式会社",
  description:
    "海外クラウドファンディングで海外進出を実現。実績多数。戦略・クリエイティブ・広告・物流・法規まで一気通貫。無料相談受付中。",
  openGraph: {
    title: "海外クラウドファンディング代行｜SOMA株式会社",
    description: "海外クラウドファンディングで海外進出を実現。実績多数。戦略・クリエイティブ・広告・物流・法規まで一気通貫。無料相談受付中。",
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
    "name": "SOMA株式会社",
    "url": "https://www.soma-jp.net",
    "logo": "https://www.soma-jp.net/images/logo.PNG",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "areaServed": "JP",
      "availableLanguage": "Japanese"
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
  {/* Canonical URL for SEO */}
  <link rel="canonical" href="https://www.soma-jp.net/" />
  {/* hreflang alternates: ja is canonical; en and zh-Hant placeholders for future translations */}
  <link rel="alternate" href="https://www.soma-jp.net/" hrefLang="ja" />
  <link rel="alternate" href="https://www.soma-jp.net/en/" hrefLang="en" />
  <link rel="alternate" href="https://www.soma-jp.net/zh-hant/" hrefLang="zh-Hant" />
  <link rel="alternate" href="https://www.soma-jp.net/" hrefLang="x-default" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-S1KMYY7C0B" />
    </html>
  );
}
