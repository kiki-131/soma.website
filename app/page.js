"use client";
import Image from "next/image";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import AboutUsSection from "./components/AboutUsSection";
import ProjectsSection from "./components/ProjectsSection";
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
  <div className="w-[1100px] max-w-[1100px] h-full relative px-0">
    {/* デスクトップでは絶対配置で固定の位置関係にする */}
    <div className="hidden md:block relative h-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute left-0 top-1/4 w-[500px] -translate-y-4"
      >
        <h1 className="text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
          SOMA
        </h1>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
          海外進出支援
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          アメリカや台湾、マレーシアでの海外クラウドファンディングを通し、
          <br />
          海外進出のテストマーケティングを支援しています。
        </p>
      </motion.div>

      <div className="absolute right-0 bottom-12 w-[560px] flex gap-8 justify-end">
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

    {/* モバイル: stacked layout（幅狭いときは縦積み） */}
    <div className="md:hidden flex flex-col items-center justify-end h-full gap-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="flex flex-col items-center w-full px-6"
      >
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight text-center">SOMA</h1>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-4 leading-tight text-center">海外進出支援</h2>
        <p className="text-sm text-gray-600 leading-relaxed text-center">
          アメリカや台湾、マレーシアでの海外クラウドファンディングを通し、海外進出のテストマーケティングを支援しています。
        </p>
      </motion.div>

      <div className="flex gap-4 mb-8 px-4">
        <div className="relative w-44 h-32 rounded-2xl overflow-hidden shadow-2xl">
          <Image src="/images/top1.jpg" alt="トップ画像1" fill className="object-cover" />
        </div>
        <div className="relative w-44 h-32 rounded-2xl overflow-hidden shadow-2xl">
          <Image src="/images/top2.jpg" alt="トップ画像2" fill className="object-cover" />
        </div>
      </div>
    </div>
  </div>
</div>
      {/* ✅ 以下は既存のコンテンツ（絶対に変更なし） */}
      <section id="Projects"><ProjectsSection /></section>
      <section id="Services">
        <ServicesSection />
      </section>
      <section id="about-us"><AboutUsSection /></section>
      <ContactForm />
    </>
  );
}