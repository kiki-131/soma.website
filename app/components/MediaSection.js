"use client";
import Image from "next/image";
import { motion } from "framer-motion";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 主要メディア掲載 — バナー付きで大きく見せる枠
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const FEATURED = [
  {
    label: "NewsPicks",
    title:
      "最短15日で米国小売店から初回注文。「現地オフィスなし」で海外卸を実現するSOMAの取り組みが紹介されました。",
    url: "https://newspicks.com/news/16799617/",
    // バナー画像が無いため、ブランドカラーのテキストロゴで表示
    logoType: "newspicks",
  },
  {
    label: "kei-do.com",
    title:
      "海外クラウドファンディング支援のプロが語る、日本企業の海外進出戦略",
    url: "https://kei-do.com/interview2/01732/",
    logoType: "image",
    banner: "/images/keido_banner.jpg",
  },
];

function MediaLogo({ item }) {
  // バナー画像がある媒体は画像、無い媒体はテキストロゴ
  if (item.logoType === "image") {
    return (
      <div className="relative flex-shrink-0 w-24 h-14 bg-white rounded-md overflow-hidden">
        <Image src={item.banner} alt={item.label} fill className="object-contain" />
      </div>
    );
  }
  if (item.logoType === "newspicks") {
    return (
      <div className="flex-shrink-0 w-24 h-14 bg-white rounded-md flex items-center justify-center px-2">
        <span className="text-[15px] font-extrabold tracking-tight leading-none">
          <span className="text-[#0e1a2b]">News</span>
          <span className="text-[#00b285]">Picks</span>
        </span>
      </div>
    );
  }
  return null;
}

export default function MediaSection() {
  return (
    <section className="bg-[#060810] py-12 md:py-16 px-6 md:px-16 border-t border-white/5">
      <div className="max-w-3xl mx-auto">

        {/* ラベル */}
        <motion.p
          className="text-white/60 text-sm font-bold tracking-[0.25em] text-center mb-8"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          メディアで紹介されました
        </motion.p>

        {/* 主要メディア — バナー付きカード */}
        <div className="flex flex-col gap-3">
          {FEATURED.map((item, i) => (
            <motion.a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4 hover:border-white/25 hover:bg-white/[0.04] transition-colors duration-300"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <MediaLogo item={item} />
              <p className="text-white/55 text-xs md:text-sm leading-snug group-hover:text-white/90 transition-colors duration-300">
                {item.title}
              </p>
              <span className="ml-auto flex-shrink-0 text-white/25 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-300">
                →
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
