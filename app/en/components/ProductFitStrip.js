"use client";
import { motion } from "framer-motion";

// ヒーロー直下に置く帯。記号だけで商材の自己判定を完結させ、
// 対象外の読者（薬機法アウト商材）にここで帰ってもらう。
// ✗ を隠さないことがこの帯の存在意義（＝断る会社であることの初期証明）。
const READY = ["EDC & Tools", "Outdoor", "Stationery", "Bags", "Kitchen"];
const POSSIBLE = ["Wireless (Wi-Fi / BT)", "AC-powered · Li-ion", "Food & Beverage"];
const DECLINED = ["Cosmetics", "Supplements", "Beauty & medical devices"];

function Row({ mark, markClass, items }) {
  return (
    <div className="flex items-start gap-3">
      <span className={`font-bold text-base leading-6 flex-shrink-0 ${markClass}`} aria-hidden="true">
        {mark}
      </span>
      <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-gray-700 text-sm md:text-[15px] leading-6">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProductFitStrip() {
  return (
    <section
      data-bg="#F8F9FA"
      className="bg-[#F8F9FA] border-y border-gray-200 py-10 px-6 md:px-16"
    >
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-[#0066FF] text-[11px] font-bold tracking-[0.3em] uppercase mb-5">
          What we take to Japan — Phase 1
        </h2>

        <div className="space-y-3">
          <Row mark="✓" markClass="text-[#0066FF]" items={READY} />
          <Row mark="▲" markClass="text-amber-600" items={POSSIBLE} />
          <Row mark="✗" markClass="text-gray-500" items={DECLINED} />
        </div>

        <div className="mt-6 pt-5 border-t border-gray-200 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500">
          <span><span className="text-[#0066FF] font-bold">✓</span> ready to go</span>
          <span><span className="text-amber-600 font-bold">▲</span> possible, needs certification &amp; lead time</span>
          <span><span className="text-gray-500 font-bold">✗</span> not in phase 1</span>
          <a
            href="#eligibility"
            className="ml-auto text-[#0066FF] font-semibold hover:underline"
          >
            See the full breakdown →
          </a>
        </div>
      </motion.div>
    </section>
  );
}
