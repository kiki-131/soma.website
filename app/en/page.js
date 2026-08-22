"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Header from "./components/Header";
import ProductFitStrip from "./components/ProductFitStrip";
import WhyJapanSection from "./components/WhyJapanSection";
import RequirementsWall from "./components/RequirementsWall";
import WhatWeDoSection from "./components/WhatWeDoSection";
import PlatformComparison from "./components/PlatformComparison";
import ProductEligibility from "./components/ProductEligibility";
import TrademarkAlert from "./components/TrademarkAlert";
import ProcessSection from "./components/ProcessSection";
import WhoWeAreSection from "./components/WhoWeAreSection";
import FaqSection from "./components/FaqSection";
import EligibilityForm from "./components/EligibilityForm";
import Reveal from "./components/Reveal";
import "../globals.css";
import "./en.css";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// /en — 海外メーカー向け「日本のクラウドファンディング出品代行」LP
//
// このページは日本語トップ (/) の翻訳ではない。商流が逆向きの別事業のLPで、
// 読者は北米のメーカー／ブランド。訴求の軸は "The Requirements Wall" —
// Makuakeの公式規約と日本の法令が海外実行者に課す要件を英語で正確に見せること。
//
// ★このページは「日本のクラファンでの実績ゼロ」という前提で作られている。
//   信頼の根拠は実績数ではなく情報の正確さに置いているため、
//   実績数値の追加や、逆方向(日本→海外)の実績を日本CFの実績のように
//   読ませる表現は、このページの設計そのものを壊す。
//
// ★料金・手数料・パーセンテージは一切掲載しない。
//   ゴールは問い合わせ(eligibility check)1本。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const HERO = {
  eyebrow: "For brands that have already shipped a campaign",
  h1: [
    "Your product can go on sale in Japan.",
    "Makuake requires that someone in Japan",
    "be the one selling it.",
  ],
  body: [
    "Japanese crowdfunding is not fundraising, and the people who buy are not backers — they are shoppers placing a pre-order.",
    "That is what makes it the one way an overseas brand can test the Japanese market before shipping stock into it.",
  ],
  cta: "Free Japan Launch Eligibility Check",
  // 新宿の街路。日本語の看板が埋め尽くす光景そのものが、
  // 「ここでの運営はすべて日本語になる」という本ページの主旨を無言で伝える。
  // 観光ステレオタイプ(寺・桜・富士山・夜景)は意図的に避けている。
  // 出典: Unsplash photo-1713263367828-9eafd7fc3797 / Unsplash License (商用利用可・帰属不要)
  image: "/images/hero_japan_street.jpg",
};

// JP版レイアウトの html lang="ja" はルートレイアウトで固定のため、
// 英語版ページ滞在中のみクライアント側で lang を一時的に上書きする。
// ※これは初期HTMLには効かない（SSR時は lang="ja" のまま）。
//   サーバー側から lang="en" を出すには Route Group による
//   ルートレイアウト分離が必要で、日本語サイト全体に影響するため別件としている。
function useEnglishDocumentLang() {
  useEffect(() => {
    const original = document.documentElement.lang;
    document.documentElement.lang = "en";
    return () => {
      document.documentElement.lang = original;
    };
  }, []);
}

export default function EnHomePage() {
  useEnglishDocumentLang();
  const reduce = useReducedMotion();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 64,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  // 提供サービスの構造化データ。Organization は RootLayout 側で
  // @id 付きで定義済みなので、ここでは再定義せず参照するだけにする。
  // ※価格は書かない（料金非掲載の方針）。評価・レビューも実績が無いので入れない。
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.soma-jp.net/en#service",
    name: "Japanese Crowdfunding Launch Support for Overseas Brands",
    serviceType: "Crowdfunding campaign management",
    provider: { "@id": "https://www.soma-jp.net/#organization" },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
    audience: {
      "@type": "BusinessAudience",
      name: "Consumer product manufacturers and brands based outside Japan",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://www.soma-jp.net/en#contact",
      availableLanguage: ["English", "Japanese"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Launch services",
      itemListElement: [
        "Platform eligibility and fit review",
        "Japanese project page production",
        "Japanese-language backer support",
        "Certification and import routing",
        "Domestic fulfillment in Japan",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };

  return (
    <div className="en-scope">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <Header scrollToSection={scrollToSection} />

      {/* ━━━━━━━━━━━━━━━━━━━━ S1 HERO ━━━━━━━━━━━━━━━━━━━━ */}
      <div
        ref={heroRef}
        data-bg="#0D1A24"
        className="relative overflow-hidden bg-deep-900"
        style={{ minHeight: "100svh" }}
      >
        <div className="absolute inset-0 select-none">
          {/* 右側画像 — デスクトップ */}
          <motion.div
            style={{ y: imgY }}
            className="absolute right-0 top-0 bottom-0 w-[52%] hidden md:block"
          >
            <Image
              src={HERO.image}
              alt=""
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D1A24] via-[#0D1A24]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D1A24]/60 via-transparent to-[#0D1A24]/80" />
          </motion.div>

          {/* モバイル: 全面背景 */}
          <div className="absolute inset-0 md:hidden">
            <Image
              src={HERO.image}
              alt=""
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-deep-900/85" />
          </div>
        </div>

        {/* コンテンツ */}
        <motion.div
          style={{ y: textY }}
          className="relative z-10 flex flex-col justify-center px-6 md:px-20 max-w-[860px] pt-24 pb-20 md:pt-16"
          // プリローダー明けを待たせない。
          // 以前は 2.4秒後に表示していたが、営業メール経由のモバイル流入にとって
          // 空白画面はそのまま離脱要因になるため撤廃した。
        >
          <motion.div
            className="flex items-center gap-4 mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="w-10 h-px bg-accent-600 flex-shrink-0" />
            <span className="text-accent-400 text-[10px] md:text-[11px] font-semibold tracking-[0.08em] uppercase">
              {HERO.eyebrow}
            </span>
          </motion.div>

          <h1
            className="font-display-x text-white font-medium leading-[0.98] tracking-[-0.032em] mb-9"
            style={{ fontSize: "clamp(38px, 5.6vw, 78px)" }}
          >
            {HERO.h1.map((line, i) => (
              <motion.span
                key={i}
                className={`block ${i === 0 ? "" : "text-white/80"}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: "easeOut" }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.div
            className="max-w-xl mb-10 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            {HERO.body.map((line, i) => (
              <p key={i} className="text-white/80 text-sm md:text-base leading-[1.8]">
                {line}
              </p>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="px-7 py-4 bg-accent-600 text-white font-semibold text-sm rounded-[2px] hover:bg-accent-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1A24] focus-visible:ring-accent-500"
            >
              {HERO.cta}
            </button>

            <button
              onClick={() => scrollToSection("eligibility")}
              className="text-ink-300 text-sm font-medium hover:text-white transition-colors text-left"
            >
              Can my product even go?
              <span className="rule-grow" aria-hidden="true" />
            </button>
          </motion.div>

          {/* 最大の反論を先回りで潰すマイクロコピー */}
          <motion.ul
            className="mt-10 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            {[
              "No Japanese entity needed to start",
              "Reply within 1 business day (JST)",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-ink-300 text-xs md:text-sm">
                <span className="h-px w-4 shrink-0 bg-white/45" aria-hidden="true" />
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* ━━━━━━━━ S1.5 商材適合の帯 ━━━━━━━━ */}
      <ProductFitStrip />

      {/* ━━━━━━━━ S2 なぜ日本／デッドロック ━━━━━━━━ */}
      <WhyJapanSection />

      {/* ━━━━━━━━ S3 要件の壁 ＋ S4 転換（背景連続） ━━━━━━━━ */}
      <RequirementsWall />

      {/* ━━━━━━━━ S5 対応表 ＋ スコープ ━━━━━━━━ */}
      <WhatWeDoSection />

      {/* ━━━━━━━━ S6 プラットフォーム比較 ━━━━━━━━ */}
      <PlatformComparison />

      {/* ━━━━━━━━ S7 商材別の規制 ━━━━━━━━ */}
      <ProductEligibility />

      {/* ━━━━━━━━ S8 商標アラート（無償の助言） ━━━━━━━━ */}
      <TrademarkAlert />

      {/* ━━━━━━━━ S9 プロセス ━━━━━━━━ */}
      <ProcessSection />

      {/* ━━━━━━━━ S10 チーム・法人実体 ━━━━━━━━ */}
      <WhoWeAreSection />

      {/* ━━━━━━━━ S11 FAQ ━━━━━━━━ */}
      <FaqSection />

      {/* ━━━━━━━━ S12 問い合わせ ━━━━━━━━ */}
      <EligibilityForm />

      {/* ━━━━━━━━ S13 FOOTER ━━━━━━━━ */}
      <footer data-bg="#0D1A24" className="bg-deep-900 px-6 md:px-10 lg:px-16 py-[72px] md:py-[96px]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
            <div>
              <Image
                src="/images/logo.jpg"
                alt="SOMA Inc."
                width={100}
                height={100}
                className="h-14 w-auto mb-5 opacity-90"
              />
              {/* 旧タグライン "Japanese products, to the world." は
                  本ページと方向が正反対のため差し替えている */}
              <p className="text-ink-300 text-sm leading-relaxed max-w-xs">
                The Japanese side of your launch.
                <br />
                Handled in Japan, in Japanese.
              </p>
            </div>

            <nav className="grid grid-cols-2 gap-x-14 gap-y-3 text-ink-300 text-sm">
              <a href="#why-japan" className="hover:text-white transition-colors">Why Japan</a>
              <a href="#requirements" className="hover:text-white transition-colors">Requirements</a>
              <a href="#what-we-do" className="hover:text-white transition-colors">What we do</a>
              <a href="#platforms" className="hover:text-white transition-colors">Platforms</a>
              <a href="#eligibility" className="hover:text-white transition-colors">Product fit</a>
              <a href="#process" className="hover:text-white transition-colors">Process</a>
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              <Link href="/" className="hover:text-white transition-colors">
                日本語サイト
              </Link>
            </nav>
          </div>

          <div className="border-t border-deep-700 mt-14 pt-8">
            <p className="text-ink-300 text-xs leading-relaxed mb-2">
              SOMA Inc. · 127-9 Naka-Kibogaoka, Asahi-ku, Yokohama, Kanagawa
              241-0825, Japan · +81 45-567-6969
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link href="/privacy" className="text-ink-300 hover:text-white text-xs transition-colors">
                Privacy Policy{" "}
                <span className="text-ink-300 text-[10px]">(JP)</span>
              </Link>
              <span className="text-ink-300 text-xs">
                © {new Date().getFullYear()} SOMA Inc. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
