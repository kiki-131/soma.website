import { Geist, Geist_Mono } from "next/font/google";
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
    "Kickstarter・Indiegogo・zeczecでの海外進出を一気通貫で支援。戦略設計/ストーリー制作/広告/物流/法規まで。無料相談受付中。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
  {/* Canonical URL for SEO */}
  <link rel="canonical" href="https://www.soma-jp.net/" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
