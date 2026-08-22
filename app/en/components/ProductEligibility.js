"use client";
import { motion } from "framer-motion";
import WordByWord from "./WordByWord";
import { SOURCES } from "./sources";

// S7 商材別の規制マトリクス。
// ✗（お断りする商材）を隠さず、理由まで書くことが本ページで最も信頼を生むブロックのひとつ。
const TIERS = [
  {
    mark: "✓",
    markClass: "text-[#0066FF]",
    borderClass: "border-[#0066FF]/30",
    label: "Ready",
    items: "General goods — EDC and tools, outdoor, stationery, bags, kitchen.",
    body: "Mostly a labeling question. The easiest way in, and the fastest to move on.",
  },
  {
    mark: "▲",
    markClass: "text-amber-600",
    borderClass: "border-amber-300",
    label: "Possible — needs certification and lead time",
    rules: [
      {
        trigger: "Wi-Fi or Bluetooth",
        law: "the Radio Act (電波法), Technical Conformity certification (技適 / TELEC)",
        source: SOURCES.telec,
        sourceLabel: "MIC — Radio Equipment certification",
      },
      {
        trigger: "AC power or lithium battery",
        law: "the Electrical Appliance and Material Safety Act (電気用品安全法), PSE marking",
        source: SOURCES.pse,
        sourceLabel: "METI — DENAN notification",
      },
    ],
    body: "This is where the higher price points are. It also needs a schedule built backwards from the certification lead time, not forwards from your launch date.",
  },
  {
    mark: "▲",
    markClass: "text-amber-600",
    borderClass: "border-amber-200",
    label: "Conditional — phase 2",
    rules: [
      {
        trigger: "Food and beverage",
        law: "the Food Sanitation Act (食品衛生法), the Food Labeling Act (食品表示法)",
      },
    ],
  },
  {
    mark: "✗",
    markClass: "text-gray-500",
    borderClass: "border-gray-300",
    label: "We decline",
    items:
      "Cosmetics, supplements, beauty devices, medical devices → the Pharmaceuticals and Medical Devices Act (薬機法)",
    body: "The Act controls what can be manufactured, imported, labeled and claimed, and it puts all of it on a licensed party in Japan. We aren’t licensed for it, and we’re not going to learn it on your campaign. In phase 1 the answer is no.",
  },
];

const CROSS_CUTTING = [
  {
    law: "Act against Unjustifiable Premiums and Misleading Representations (景品表示法)",
    note: "a struck-through “regular price” needs a reasonable basis behind it.",
  },
  {
    law: "Stealth marketing rules (ステマ規制), in force since October 2023",
    note: "paid or incentivized posts must be labeled as advertising.",
  },
  {
    law: "Product Liability Act (製造物責任法)",
    note: "the importer of a product carries the same liability as its manufacturer.",
  },
  {
    law: "Trademark",
    note: "Japan is first to file. Having used a name first gives you nothing.",
  },
];

export default function ProductEligibility() {
  return (
    <section
      id="eligibility"
      data-bg="#FFFFFF"
      className="bg-white py-24 md:py-36 px-6 md:px-16 scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-px bg-[#0066FF]" />
          <span className="text-[#0066FF] text-xs font-bold tracking-[0.35em] uppercase">
            Will your product clear Japan?
          </span>
        </motion.div>

        <div className="mb-14">
          <WordByWord
            lines={[
              "Regulation follows the product category.",
              "This is the first fork in the road.",
            ]}
            className="font-extrabold text-gray-900 leading-[1.15]"
            style={{ fontSize: "clamp(26px, 3.6vw, 46px)" }}
          />
        </div>

        <div className="space-y-5">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.label}
              className={`border-l-4 ${tier.borderClass} bg-[#F8F9FA] rounded-r-2xl p-7 md:p-8`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className={`font-bold text-lg ${tier.markClass}`} aria-hidden="true">
                  {tier.mark}
                </span>
                <h3 className="font-extrabold text-gray-900 text-base md:text-lg uppercase tracking-wide">
                  {tier.label}
                </h3>
              </div>

              {tier.items && (
                <p className="text-gray-800 text-sm md:text-base leading-relaxed mb-3 font-medium">
                  {tier.items}
                </p>
              )}

              {tier.rules && (
                <ul className="space-y-2.5 mb-3">
                  {tier.rules.map((rule) => (
                    <li key={rule.trigger} className="text-sm md:text-base leading-relaxed">
                      <span className="font-semibold text-gray-900">
                        {rule.trigger}
                      </span>
                      <span className="text-gray-400 mx-2" aria-hidden="true">→</span>
                      <span className="text-gray-700">{rule.law}</span>
                      {rule.source && (
                        <a
                          href={rule.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-[#0066FF] text-xs font-semibold hover:underline whitespace-nowrap"
                        >
                          ↗ {rule.sourceLabel}
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {tier.body && (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tier.body}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* 横断リスク */}
        <motion.div
          className="mt-14 pt-10 border-t border-gray-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-gray-500 mb-7">
            Also applies to everyone
          </p>
          <ul className="space-y-5">
            {CROSS_CUTTING.map((item) => (
              <li key={item.law} className="flex gap-4">
                <span className="text-[#0066FF] flex-shrink-0 mt-0.5" aria-hidden="true">▸</span>
                <p className="text-sm md:text-base leading-relaxed">
                  <span className="font-semibold text-gray-900">{item.law}</span>
                  <span className="text-gray-400 mx-1.5" aria-hidden="true">—</span>
                  <span className="text-gray-600">{item.note}</span>
                </p>
              </li>
            ))}
          </ul>
        </motion.div>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 mt-12 px-7 py-4 bg-[#0066FF] text-white font-bold text-sm rounded-full hover:bg-[#0052cc] transition-colors"
        >
          Product not listed here? Tell us what it is
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
