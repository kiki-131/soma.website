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
<div className="relative w-full h-[calc(100vh-80px)] bg-white flex flex-col md:flex-row items-end justify-between px-8 md:px-16 overflow-hidden">
  {/* 左側：テキスト */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2 }}
    className="flex flex-col max-w-xl -translate-y-4"
  >   <h1 className="text-7xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
      SOMA
    </h1>
    <h1 className="text-4xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
      海外進出支援
    </h1>
    <p className="text-sm md:text-sm text-gray-600 leading-relaxed">
      アメリカや台湾、マレーシアでの海外クラウドファンディングを通し、
      <br className="hidden md:block" />
      海外進出のテストマーケティングを支援しています。
    </p>
  </motion.div>

  {/* 右側：角丸画像2枚 */}
  <div className="flex flex-col md:flex-row gap-8 justify-center items-end mb-12 md:mb-0">
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className="relative overflow-hidden w-50 h-80 md:w-56 md:h-[32rem] rounded-3xl shadow-2xl"
    >
      <Image src="/images/top1.jpg" alt="トップ画像1" fill className="object-cover" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.3 }}
      className="relative overflow-hidden w-50 h-80 md:w-56 md:h-[32rem] rounded-3xl shadow-2xl"
    >
      <Image src="/images/top2.jpg" alt="トップ画像2" fill className="object-cover" />
    </motion.div>
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