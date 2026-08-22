"use client";

import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

// ナビ項目は「読者の疑問」の順に並べる。
// 2番目に Services ではなく Requirements を置いているのは意図的で、
// 競合のナビには存在しない項目名のため、ナビだけで差別化が伝わる。
const NAV = [
  { label: "Why Japan", id: "why-japan" },
  { label: "Requirements", id: "requirements" },
  { label: "Platforms", id: "platforms" },
  { label: "Process", id: "process" },
  { label: "About", id: "about" },
];

// globals.css の min-height:48px を打ち消す共通スタイル
const resetMin = { minHeight: 0, minWidth: 0 };

export default function Header({ scrollToSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // 商材適合の帯(S1.5)を通過してからCTAを出す。
      // ヒーロー直下でいきなり追いかけると押しの強い営業に見えるため。
      const anchor = document.getElementById("why-japan");
      if (anchor) {
        setShowCTA(window.scrollY + 80 >= anchor.offsetTop);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-[#0A0F1E]/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      {/* ━━ デスクトップ ━━ */}
      <div className="hidden md:flex items-center h-16 px-8 max-w-7xl mx-auto">
        {/* ロゴ */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={resetMin}
          className="flex-shrink-0 mr-8 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d94ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1E]"
          aria-label="Back to top"
        >
          <Image
            src="/images/logo.jpg"
            alt="SOMA"
            width={52}
            height={52}
            className="h-10 w-auto"
            priority
            unoptimized
          />
        </button>

        {/* ナビ（再訪ユーザーにとっての目次として機能させる） */}
        <nav className="flex items-center gap-7 mr-auto">
          {NAV.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              style={resetMin}
              className="text-white/75 hover:text-white text-sm font-medium tracking-wide transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d94ff]"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* 言語切替 + CTA（CTAは1つだけ。2種類同時表示は選択負荷になるため統合） */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            style={resetMin}
            className="text-white/60 hover:text-white text-xs font-normal tracking-wide transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d94ff]"
          >
            日本語
          </Link>
          <span className="w-px h-3 bg-white/15" />
          <button
            onClick={() => scrollToSection("contact")}
            style={{
              ...resetMin,
              opacity: showCTA ? 1 : 0,
              pointerEvents: showCTA ? "auto" : "none",
              transition: "opacity 0.6s ease",
            }}
            className="flex items-center px-5 py-2 text-sm font-semibold text-white bg-[#0066FF] rounded-full hover:bg-[#0052cc] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d94ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1E]"
          >
            Free Eligibility Check
          </button>
        </div>
      </div>

      {/* ━━ モバイル ━━ */}
      <div className="md:hidden flex items-center justify-between h-14 px-5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={resetMin}
          className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d94ff]"
          aria-label="Back to top"
        >
          <Image
            src="/images/logo.jpg"
            alt="SOMA"
            width={44}
            height={44}
            className="h-8 w-auto"
            priority
            unoptimized
          />
        </button>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          style={{ ...resetMin, minHeight: 44, minWidth: 44 }}
          className="flex items-center justify-center text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d94ff]"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0F1E] border-t border-white/10 px-6 py-4 flex flex-col">
          {NAV.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => {
                setMenuOpen(false);
                setTimeout(() => scrollToSection(id), 50);
              }}
              className="text-left text-white/80 hover:text-white text-base transition-colors py-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d94ff]"
            >
              {label}
            </button>
          ))}
          <Link
            href="/"
            className="text-white/60 hover:text-white text-sm font-normal transition-colors py-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d94ff]"
            onClick={() => setMenuOpen(false)}
          >
            日本語
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              setTimeout(() => scrollToSection("contact"), 50);
            }}
            style={resetMin}
            className="mt-3 px-6 py-3.5 text-white font-semibold bg-[#0066FF] rounded-full text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d94ff]"
          >
            Free Eligibility Check
          </button>
        </div>
      )}
    </header>
  );
}
