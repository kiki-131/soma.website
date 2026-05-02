"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "./Header";
import ProjectsSection from "./components/ProjectsSection";
import ServicesSection from "./components/ServicesSection";
import AboutUsSection from "./components/AboutUsSection";
import BlogSection from "./components/BlogSection";
import ContactForm from "./components/ContactForm";
import MediaSection from "./components/MediaSection";
import "./globals.css";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ヒーロー コンテンツ — ここを編集してください
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const HERO = {
  eyebrow: "海外クラファン × 海外進出支援",
  headline: "あなたのプロダクトを、\n世界へ。",
  body: "Kickstarter・Indiegogo・zeczecを活用したクラウドファンディングから現地進出まで、プロが戦略から実行まで丸ごと伴走します。",
  cta: "無料相談を予約する",
  images: ["/images/top1.jpg", "/images/top2.jpg"],
};

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const img1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const textY  = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 64,
      behavior: "smooth",
    });
  };

  // プリローダー(1.6s) + フェードアウト(0.8s) 後
  const d = (extra = 0) => 2.4 + extra;

  return (
    <>
      <Header scrollToSection={scrollToSection} />

      {/* ━━━━━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━━━━━ */}
      <div
        ref={heroRef}
        data-bg="#0A0F1E"
        className="relative min-h-screen bg-[#060810] overflow-hidden"
      >
        {/* 背景: 右半分に画像 */}
        <div className="absolute inset-0 select-none">
          {/* 右側画像 — デスクトップ */}
          <motion.div
            style={{ y: img1Y }}
            className="absolute right-0 top-0 bottom-0 w-[55%] hidden md:block"
          >
            <Image
              src={HERO.images[0]}
              alt=""
              fill
              className="object-cover object-center"
              priority
            />
            {/* 左から右へのグラデーションマスク */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#060810] via-[#060810]/70 to-transparent" />
            {/* 上下のフェード */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#060810]/60 via-transparent to-[#060810]/80" />
          </motion.div>

          {/* モバイル: 全面背景 */}
          <div className="absolute inset-0 md:hidden">
            <Image
              src={HERO.images[0]}
              alt=""
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-[#060810]/80" />
          </div>

          {/* 全体に薄いノイズ感を出す青みグロー */}
          <motion.div
            className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-700 blur-[180px] opacity-[0.08] -translate-y-1/2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* コンテンツ: 左寄せ */}
        <motion.div
          style={{ y: textY }}
          className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-20 max-w-[720px] pt-16"
        >
          {/* 細い水平ライン + ラベル */}
          <motion.div
            className="flex items-center gap-4 mb-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: d(0) }}
          >
            <div className="w-10 h-px bg-[#0066FF]" />
            <span className="text-[#0066FF] text-[11px] font-bold tracking-[0.4em] uppercase">
              {HERO.eyebrow}
            </span>
          </motion.div>

          {/* メインキャッチ — 1行ずつゆっくりフェードイン */}
          <div className="mb-12">
            <motion.h1
              className="text-white font-black leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(52px, 7.5vw, 96px)" }}
            >
              <motion.span
                className="block whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.8, delay: d(0.0), ease: "easeOut" }}
              >
                あなたの
              </motion.span>
              <motion.span
                className="block whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.8, delay: d(0.0), ease: "easeOut" }}
              >
                プロダクトを、
              </motion.span>
              <motion.span
                className="block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.8, delay: d(0.0), ease: "easeOut" }}
              >
                世界へ。
              </motion.span>
            </motion.h1>
          </div>

          {/* サブコピー */}
          <motion.p
            className="text-white/45 text-sm md:text-base leading-[1.9] mb-12 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: d(1.2) }}
          >
            {HERO.body}
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: d(1.6) }}
          >
            <motion.button
              onClick={() => scrollToSection("contact")}
              className="group relative px-8 py-4 bg-[#0066FF] text-white font-bold text-sm rounded-full overflow-hidden"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">{HERO.cta}</span>
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("Projects")}
              className="text-white/40 text-sm font-medium hover:text-white/80 transition-colors flex items-center gap-2"
              whileHover={{ x: 4 }}
            >
              実績を見る <span>→</span>
            </motion.button>
          </motion.div>

          {/* 下部スクロールインジケーター */}
          <motion.div
            className="absolute bottom-10 left-8 md:left-20 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: d(0.9) }}
          >
            <motion.div
              className="w-px h-10 bg-gradient-to-b from-transparent via-white/30 to-transparent"
              animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-white/20 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          </motion.div>
        </motion.div>

      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━ MEDIA ━━━━━━━━━━━━━━━━━━━━ */}
      <div data-bg="#060810">
        <MediaSection />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━ PROJECTS ━━━━━━━━━━━━━━━━━━━━ */}
      <div data-bg="#111827">
        <ProjectsSection />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━ SERVICES ━━━━━━━━━━━━━━━━━━━━ */}
      {/* ServicesSection は内部で2セクション(light + dark)に分割 */}
      <div id="Services" data-bg="#FFFFFF">
        <ServicesSection />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━ ABOUT US ━━━━━━━━━━━━━━━━━━━━ */}
      <div data-bg="#FFFFFF">
        <AboutUsSection />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━ BLOG ━━━━━━━━━━━━━━━━━━━━ */}
      <div data-bg="#F8F9FA">
        <BlogSection />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━ CONTACT ━━━━━━━━━━━━━━━━━━━━ */}
      <div data-bg="#FFFFFF">
        <ContactForm />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━ FOOTER ━━━━━━━━━━━━━━━━━━━━ */}
      <footer data-bg="#0A0F1E" className="bg-[#0A0F1E] py-14">
        <div className="max-w-5xl mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
            {/* ロゴ */}
            <div>
              <Image
                src="/images/logo.jpg"
                alt="SOMA Logo"
                width={100}
                height={100}
                className="h-16 w-auto mb-4 opacity-90"
              />
              <p className="text-white/30 text-xs leading-relaxed max-w-xs">
                Solutions for Outbound Market Ambitions.
                <br />
                日本のプロダクトを世界へ。
              </p>
            </div>

            {/* ナビ */}
            <nav className="grid grid-cols-2 gap-x-16 gap-y-3 text-white/50 text-sm">
              {[
                { label: "Projects", href: "#Projects" },
                { label: "Services", href: "#Services" },
                { label: "About us", href: "#about-us" },
                { label: "Blog", href: "/blog", external: false },
                { label: "Contact", href: "#contact" },
                { label: "プライバシーポリシー", href: "/privacy" },
                { label: "DX推進方針", href: "/dx" },
              ].map(({ label, href, external }) =>
                href.startsWith("/") && !href.startsWith("/#") ? (
                  <Link
                    key={label}
                    href={href}
                    className="hover:text-white transition-colors"
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    key={label}
                    href={href}
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                )
              )}
            </nav>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8">
            <p className="text-white/20 text-xs text-center">
              © {new Date().getFullYear()} SOMA株式会社. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
