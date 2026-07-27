"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// パートナー企業 — 左右に並べて掲載
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const PARTNERS = [
  {
    name: "Horizon Leap Partners",
    tagline: "U.S. Market Entry Support / On-the-Ground Assistance",
    url: "https://hlpartner.wixsite.com/expansion-usa",
    logo: "/images/partner_horizon.png",
    region: "U.S.A.",
    // 横長ロゴ（社名込み）なのでロゴのみ表示
    showName: false,
  },
  {
    name: "Pacific Hope Consulting LLC",
    tagline: "U.S. Business Connections / Strategic Support",
    url: "https://pacifichopellc.com/",
    logo: "/images/partner_pacifichope.jpg",
    region: "U.S.A.",
    // アイコンのみのロゴなので社名テキストを併記
    showName: true,
  },
];

function SectionLabel({ text }) {
  return (
    <motion.div
      className="flex items-center justify-center gap-4 mb-6"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-10 h-px bg-[#0066FF]" />
      <span className="text-[#0066FF] text-xs font-bold tracking-[0.35em] uppercase">
        {text}
      </span>
      <div className="w-10 h-px bg-[#0066FF]" />
    </motion.div>
  );
}

export default function PartnersSection() {
  return (
    <section className="bg-[#F8F9FA] py-24 md:py-32 px-6 md:px-16 font-sans">
      <div className="max-w-5xl mx-auto">

        <SectionLabel text="Partners" />

        <motion.h2
          className="text-center text-2xl md:text-4xl font-extrabold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          Partners Rooted in Local Markets
        </motion.h2>

        <motion.p
          className="text-center text-gray-500 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          By teaming up with partner companies based in the United States,
          we&apos;ve built a support system that lets you expand overseas
          <br className="hidden md:block" />
          with confidence — no local office required.
        </motion.p>

        {/* バナーを左右に配置 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PARTNERS.map((p, i) => (
            <motion.a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center bg-white border border-gray-200 rounded-2xl px-8 py-12 hover:shadow-xl hover:border-[#0066FF]/30 transition-all duration-300"
              initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
            >
              {/* リージョンバッジ */}
              <span className="absolute top-4 right-4 text-[10px] font-bold tracking-[0.2em] text-[#0066FF]/70 bg-[#0066FF]/5 rounded-full px-3 py-1">
                {p.region}
              </span>

              {/* ロゴ */}
              <div className="relative w-full h-24 md:h-28 mb-5">
                <Image
                  src={p.logo}
                  alt={p.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* 社名（アイコンのみのロゴの場合のみ表示） */}
              {p.showName && (
                <h3 className="text-gray-900 font-bold text-lg md:text-xl text-center mb-1">
                  {p.name}
                </h3>
              )}

              <p className="text-gray-500 text-xs md:text-sm text-center">
                {p.tagline}
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-[#0066FF] text-xs font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Visit Website
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">→</span>
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
