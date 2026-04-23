"use client";

import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

const NAV = [
  { label: "Projects", id: "Projects" },
  { label: "Services", id: "Services" },
  { label: "About us", id: "about-us" },
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
      const projectsEl = document.getElementById("Projects");
      if (projectsEl) {
        setShowCTA(window.scrollY + 80 >= projectsEl.offsetTop);
      }
    };
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
          className="flex-shrink-0 focus:outline-none mr-8"
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

        {/* ナビ */}
        <nav className="flex items-center gap-7 mr-auto">
          {NAV.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              style={resetMin}
              className="text-white/75 hover:text-white text-sm font-medium tracking-wide transition-colors"
            >
              {label}
            </button>
          ))}
          <Link
            href="/blog"
            style={resetMin}
            className="text-white/75 hover:text-white text-sm font-medium tracking-wide transition-colors"
          >
            Blog
          </Link>
        </nav>

        {/* SNS + CTA */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/soma.japan77/"
            target="_blank"
            rel="noopener noreferrer"
            style={resetMin}
            className="flex items-center text-white/50 hover:text-white transition-colors"
          >
            <FaInstagram size={17} />
          </a>

          <button
            onClick={() => scrollToSection("contact")}
            style={{ ...resetMin, opacity: showCTA ? 1 : 0, pointerEvents: showCTA ? "auto" : "none", transition: "opacity 0.6s ease" }}
            className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-[#0066FF] rounded-full hover:bg-[#0052cc] transition-colors duration-300"
          >
            無料相談を予約する
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            style={resetMin}
            className="flex items-center px-5 py-2 text-sm font-semibold text-white border border-white/25 rounded-full hover:bg-white hover:text-[#0A0F1E] transition-all duration-300"
          >
            Contact us
          </button>
        </div>
      </div>

      {/* ━━ モバイル ━━ */}
      <div className="md:hidden flex items-center justify-between h-14 px-5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={resetMin}
          className="focus:outline-none"
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
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection("contact")}
            style={{ ...resetMin, opacity: showCTA ? 1 : 0, pointerEvents: showCTA ? "auto" : "none", transition: "opacity 0.6s ease" }}
            className="flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-[#0066FF] rounded-full"
          >
            無料相談を予約する
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            style={resetMin}
            className="flex items-center text-white focus:outline-none"
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0F1E] border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {NAV.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => { setMenuOpen(false); setTimeout(() => scrollToSection(id), 50); }}
              style={resetMin}
              className="text-left text-white/80 hover:text-white text-base transition-colors"
            >
              {label}
            </button>
          ))}
          <Link
            href="/blog"
            style={resetMin}
            className="text-white/80 hover:text-white text-base transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          <div className="flex items-center gap-5 pt-1">
            <a href="https://www.instagram.com/soma.japan77/" target="_blank" rel="noopener noreferrer" style={resetMin} className="flex items-center text-white/50 hover:text-white transition-colors">
              <FaInstagram size={20} />
            </a>
          </div>
          <button
            onClick={() => { setMenuOpen(false); setTimeout(() => scrollToSection("contact"), 50); }}
            style={resetMin}
            className="px-6 py-3 text-white font-semibold bg-[#0066FF] rounded-full text-sm"
          >
            Contact us
          </button>
        </div>
      )}
    </header>
  );
}
