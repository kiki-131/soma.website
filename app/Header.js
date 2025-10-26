"use client";

import Image from "next/image";
import { FaTwitter, FaInstagram } from "react-icons/fa";

export default function Header({ scrollToSection }) {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-0 flex items-center justify-between">
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
              width={80}
              height={80}
              className="h-20 w-auto cursor-pointer"
              priority
              unoptimized
            />
          </button>
        </div>

          {/* 右側：ナビ + SNS + ボタン */}
        <div className="flex items-center space-x-6">
          {/* ナビゲーション */}
          <nav className="hidden md:flex space-x-8">
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
            <a href="/blog" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-400 transition-colors">Blog</a>
          </nav>

          {/* SNSアイコン（React Icons） */}
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

          {/* モバイル用：ブログリンク（ナビは非表示のためここで見せる） */}
          <a href="/blog" target="_blank" rel="noopener noreferrer" className="md:hidden text-gray-700 hover:text-blue-400 transition-colors">Blog</a>

          {/* 右端ボタン */}
          <button
            onClick={() => scrollToSection("contact")}
            className="px-6 py-2 rounded-full text-white font-semibold shadow-md bg-gradient-to-r from-blue-400 to-red-500 hover:from-blue-500 hover:to-red-600 transition-all"
          >
            Contact us
          </button>
        </div>
      </div>
    </header>
  );
}