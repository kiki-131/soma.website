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
  <div className="w-full max-w-[1100px] h-full relative px-4 md:px-0">
    {/* デスクトップでは絶対配置で固定の位置関係にする */}
    <div className="hidden md:block relative h-full">
      {/* Composite hero block pinned to top of hero area */}
  <div className="absolute top-0 left-0 right-0 h-full flex items-center justify-between px-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative w-[500px]"
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

        <div className="flex items-center gap-8 pr-8">
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

    {/* モバイル: 左下にテキスト、右下に画像を寄せる（縦並びしない） */}
    <div className="md:hidden relative h-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute left-4 bottom-6 w-2/3"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">SOMA</h1>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">海外進出支援</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          アメリカや台湾、マレーシアでの海外クラウドファンディングを通し、海外進出のテストマーケティングを支援しています。
        </p>
      </motion.div>

      <div className="absolute right-4 bottom-4 flex gap-3">
        <div className="relative w-28 h-20 rounded-2xl overflow-hidden shadow-2xl">
          <Image src="/images/top1.jpg" alt="トップ画像1" fill className="object-cover" />
        </div>
        <div className="relative w-28 h-20 rounded-2xl overflow-hidden shadow-2xl">
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