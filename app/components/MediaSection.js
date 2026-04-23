"use client";
import Image from "next/image";
import { motion } from "framer-motion";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// メディア掲載情報 — ここを編集してください
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const MEDIA = [
  {
    label: "keido.com",
    title: "海外クラウドファンディング支援のプロが語る、日本企業の海外進出戦略",
    url: "https://kei-do.com/interview2/01732/",
    banner: "/images/keido_banner.jpg",
  },
];
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function MediaSection() {
  return (
    <section className="bg-[#060810] py-5 md:py-6 px-6 md:px-16 border-t border-white/5">
      <div className="max-w-5xl mx-auto">

        {/* ラベル */}
        <motion.p
          className="text-white/60 text-sm font-bold tracking-[0.2em] text-center mb-6"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          メディアで紹介されました
        </motion.p>

        {/* バナー + タイトル 一列・中央揃え */}
        <div className="flex flex-col items-center gap-3">
          {MEDIA.map((item, i) => (
            <motion.a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* バナー画像（小さめ） */}
              <div className="relative flex-shrink-0 w-20 h-12 bg-white rounded overflow-hidden">
                <Image
                  src={item.banner}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* タイトルリンク */}
              <p className="text-white/45 text-xs leading-snug group-hover:text-white/80 transition-colors duration-300">
                {item.title}
              </p>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
