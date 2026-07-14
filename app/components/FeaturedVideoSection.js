"use client";
import { motion } from "framer-motion";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 動画紹介セクション — メディア掲載とOur Workの間に配置
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const VIDEO_ID = "-1sDU4bAtPA";

export default function FeaturedVideoSection() {
  return (
    <section className="bg-[#060810] py-12 md:py-20 px-6 md:px-16 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <motion.p
          className="text-white/60 text-sm font-bold tracking-[0.25em] text-center mb-8"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          動画で見るSOMA
        </motion.p>

        <motion.div
          className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
          style={{ aspectRatio: "16 / 9" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${VIDEO_ID}`}
            title="SOMA紹介動画"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}
