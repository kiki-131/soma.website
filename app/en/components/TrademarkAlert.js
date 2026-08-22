"use client";
import { motion } from "framer-motion";

// S8 商標アラート。無償の助言として提示し、ここで有料サービスに繋げない。
// CTA直前に「今日あなたが自分でやるべきこと」を無償で渡すことで返報性が働く。
// 強いCTAを置くと贈与が取引に見え、返報性が消えるためCTAは弱く保つ。
export default function TrademarkAlert() {
  return (
    <section
      data-bg="#111827"
      className="bg-[#111827] py-16 md:py-24 px-6 md:px-16"
    >
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-amber-400 text-[11px] font-bold tracking-[0.3em] uppercase mb-6 md:text-center">
          ⚠ Before you do anything
        </p>

        <p className="text-white text-lg md:text-2xl font-bold leading-relaxed mb-6 md:text-center">
          Japan awards trademark rights to whoever files first, not to whoever
          used the name first.
        </p>

        <p className="text-white/70 text-sm md:text-base leading-relaxed mb-5 md:text-center">
          If a campaign puts your brand in front of a Japanese audience and
          someone else files it, you can end up unable to sell in Japan under
          your own name — and buying it back is the expensive version of this
          conversation.
        </p>

        <p className="text-white/70 text-sm md:text-base leading-relaxed md:text-center">
          This has nothing to do with whether you hire us. It&apos;s worth doing
          this month whether you ever launch in Japan or not. If you only want to
          know how it works, ask us that and nothing else.
        </p>

        <div className="mt-8 md:text-center">
          <a
            href="#contact"
            className="text-[#7db3ff] text-sm font-semibold hover:text-white transition-colors"
          >
            Ask us how — no strings →
          </a>
        </div>
      </motion.div>
    </section>
  );
}
