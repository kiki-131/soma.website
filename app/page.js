"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import AboutUsSection from "./components/AboutUsSection";
import ContactForm from "./components/ContactForm";
import ServicesSection from "./components/ServicesSection";
import "./globals.css";

export default function HomePage() {
  useEffect(() => {}, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ✅ ヘッダー（変更なし） */}
      <Header scrollToSection={scrollToSection} />
{/* トップセクション */}
<div className="relative w-full h-[calc(100vh-80px)] bg-white flex items-center justify-center overflow-hidden">
  {/* 固定幅コンテナ: 内部は固定幅でレイアウト（ウィンドウ幅を変更しても変わらない） */}
  <div className="w-full max-w-[1100px] h-full relative px-4 md:px-0">
    {/* デスクトップでは絶対配置で固定の位置関係にする */}
    <div className="hidden md:block relative h-full">
      {/* Desktop: text fixed to left-bottom, images fixed to right-bottom. Use absolute positioning so resize won't change relative layout. */}
      <div className="absolute inset-0 h-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute left-0 bottom-12 w-[420px] z-30"
        >
          {/* Brand as H2 to avoid duplicate H1 */}
          <h2 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">SOMA</h2>

          {/* Single H1 for the page - split into two explicit lines */}
          <h1 className="font-extrabold text-gray-900 mb-4 leading-tight text-[clamp(32px,6vw,56px)]">
            海外クラファン×海外進出支援
          </h1>

          {/* Subcopy */}
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            Kickstarter・Indiegogo・zeczecでの戦略設計〜LP〜広告〜物流〜法規まで、一気通貫で伴走。まずは無料相談30分。
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 rounded-full text-white font-semibold shadow-md bg-gradient-to-r from-blue-400 to-red-500 hover:from-blue-500 hover:to-red-600 transition-all"
            >
              無料相談を予約する
            </button>
          </div>
        </motion.div>

        <div className="absolute right-0 bottom-12 flex items-end gap-8 pr-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="relative overflow-hidden w-[260px] h-[520px] rounded-3xl shadow-2xl"
          >
            <Image src="/images/top1.jpg" alt="トップ画像1" fill className="object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative overflow-hidden w-[260px] h-[520px] rounded-3xl shadow-2xl"
          >
            <Image src="/images/top2.jpg" alt="トップ画像2" fill className="object-cover" />
          </motion.div>
        </div>
      </div>
    </div>

    {/* モバイル: 縦並び表示 */}
      <div className="md:hidden relative h-full flex flex-col justify-center items-center px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="w-full text-center mb-6"
      >
        {/* SOMA 海外クラファン×海外進出支援 */}
        <h2 className="text-xl font-bold text-gray-900 mb-1">SOMA</h2>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-4 leading-tight">海外クラファン×<br/>海外進出支援</h1>
      </motion.div>

      {/* 画像を中央配置 */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="flex gap-4 mb-6"
      >
        <div className="relative w-36 h-32 rounded-2xl overflow-hidden shadow-2xl">
          <Image src="/images/top1.jpg" alt="トップ画像1" fill className="object-cover" />
        </div>
        <div className="relative w-36 h-32 rounded-2xl overflow-hidden shadow-2xl">
          <Image src="/images/top2.jpg" alt="トップ画像2" fill className="object-cover" />
        </div>
      </motion.div>

      {/* kickstarter～のテキスト */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="text-xs text-gray-600 leading-relaxed mb-6 text-center px-2"
      >
        Kickstarter・Indiegogo・zeczecでの戦略設計〜LP〜広告〜物流〜法規まで、一気通貫で伴走。まずは無料相談30分。
      </motion.p>

      {/* 無料相談ボタン */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <button
          onClick={() => scrollToSection("contact")}
          className="px-6 py-3 rounded-full text-white font-semibold shadow-md bg-gradient-to-r from-blue-400 to-red-500 hover:from-blue-500 hover:to-red-600 transition-all"
        >
          無料相談を予約する
        </button>
      </motion.div>
    </div>
  </div>
</div>
      {/* Services Section (課題→ソリューション + Projects→サポート) */}
      <section id="Services">
        <ServicesSection />
      </section>
      
      <section id="about-us"><AboutUsSection /></section>
      <ContactForm />
      {/* Footer sitemap */}
      <footer className="bg-gray-50 mt-12 py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Replace text heading with logo (approx. 2x header logo height) */}
          <div className="mb-4">
            {/* header logo in header used h-20 (~80px) so use h-28 (~112px) here (smaller than previous) */}
            <Image src="/images/logo.jpg" alt="SOMA Logo" width={112} height={112} className="h-28 w-auto" />
          </div>
          <div className="space-y-2 text-gray-700">
            <ul className="flex flex-wrap gap-4">
              <li><Link href="/blog" className="hover:underline">Blog</Link></li>
              <li><a href="#Projects" className="hover:underline">Projects</a></li>
              <li><a href="#Services" className="hover:underline">Services</a></li>
            </ul>
            <ul className="flex flex-wrap gap-4">
              <li><a href="#about-us" className="hover:underline">About us</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
              <li><Link href="/privacy" className="hover:underline">プライバシーポリシー</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}