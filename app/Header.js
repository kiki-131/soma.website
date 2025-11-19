"use client";

import Image from "next/image";
import Link from "next/link";
import { FaTwitter, FaInstagram, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Header({ scrollToSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-0 flex items-center justify-between">
        {/* 左側：ロゴ */}
        <div className="flex items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="トップへ戻る"
            className="focus:outline-none"
          >
            <Image
              src="/images/logo.jpg"
              alt="SOMA Logo"
              width={60}
              height={60}
              className="h-16 w-auto cursor-pointer"
              priority
              unoptimized
            />
          </button>
        </div>

        {/* デスクトップ：右側ナビ + SNS + ボタン */}
        <div className="hidden md:flex items-center space-x-6">
          {/* ナビゲーション */}
          <nav className="flex space-x-8">
            <button
              onClick={() => scrollToSection("Projects")}
              className="text-gray-700 hover:text-blue-400 transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("Services")}
              className="text-gray-700 hover:text-blue-400 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("about-us")}
              className="text-gray-700 hover:text-blue-400 transition-colors"
            >
              About us
            </button>
            <Link href="/blog" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-400 transition-colors">Blog</Link>
          </nav>

          {/* SNSアイコン */}
          <div className="flex items-center space-x-4">
            <a
              href="https://x.com/kaigai_support7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:opacity-80 transition"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://www.instagram.com/soma.japan77/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:opacity-80 transition"
            >
              <FaInstagram size={24} />
            </a>
          </div>

          {/* Contact button */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">無料相談はこちら</span>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2 rounded-full text-white font-semibold shadow-md bg-gradient-to-r from-blue-400 to-red-500 hover:from-blue-500 hover:to-red-600 transition-all"
            >
              Contact us
            </button>
          </div>
        </div>

        {/* モバイル：ハンバーガーメニュー */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col space-y-4 px-6 py-4">
            <button
              onClick={() => { scrollToSection("Projects"); toggleMenu(); }}
              className="text-left text-gray-700 hover:text-blue-400 transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => { scrollToSection("Services"); toggleMenu(); }}
              className="text-left text-gray-700 hover:text-blue-400 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => { scrollToSection("about-us"); toggleMenu(); }}
              className="text-left text-gray-700 hover:text-blue-400 transition-colors"
            >
              About us
            </button>
            <Link href="/blog" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-400 transition-colors">Blog</Link>
            
            <div className="flex items-center space-x-4 pt-4">
              <a
                href="https://x.com/kaigai_support7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:opacity-80 transition"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.instagram.com/soma.japan77/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:opacity-80 transition"
              >
                <FaInstagram size={24} />
              </a>
            </div>
            
            <button
              onClick={() => { scrollToSection("contact"); toggleMenu(); }}
              className="mt-4 px-6 py-2 rounded-full text-white font-semibold shadow-md bg-gradient-to-r from-blue-400 to-red-500 hover:from-blue-500 hover:to-red-600 transition-all"
            >
              Contact us
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}