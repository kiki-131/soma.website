"use client";
import { LuArrowUpRight } from "react-icons/lu";
import WordByWord from "./WordByWord";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { SOURCES } from "./sources";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// S7 商材別の規制マトリクス。
// お断りする商材を隠さず、理由まで書くことが本ページで最も信頼を生むブロックのひとつ。
//
// ★ ✓ ▲ ✗ の記号は使わない。可否は「左罫の色」と「文字の濃度」で表す。
//    可     → 濃い罫 (ink-900)
//    条件付 → 朱の罫 (accent-600)
//    不可   → 薄い罫 (paper-300) ＋ 文字を落とす
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const TIERS = [
  {
    rule: "border-ink-900",
    tone: "text-ink-900",
    label: "Ready",
    items: "General goods — EDC and tools, outdoor, stationery, bags, kitchen.",
    body: "Mostly a labeling question. The easiest way in, and the fastest to move on.",
  },
  {
    rule: "border-accent-600",
    tone: "text-ink-900",
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
    rule: "border-accent-600/40",
    tone: "text-ink-900",
    label: "Conditional — phase 2",
    rules: [
      {
        trigger: "Food and beverage",
        law: "the Food Sanitation Act (食品衛生法), the Food Labeling Act (食品表示法)",
      },
    ],
  },
  {
    rule: "border-paper-300",
    tone: "text-ink-400",
    label: "We decline",
    items:
      "Cosmetics, supplements, beauty devices, medical devices. Regulated under the Pharmaceuticals and Medical Devices Act (薬機法).",
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

function SourceLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/src inline-flex items-center gap-1.5 text-[13px] text-ink-500 hover:text-ink-900 transition-colors whitespace-nowrap"
    >
      {label}
      <LuArrowUpRight
        className="inline-block size-[13px] shrink-0 opacity-60 transition-transform group-hover/src:translate-x-px group-hover/src:-translate-y-px"
        aria-hidden="true"
      />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export default function ProductEligibility() {
  return (
    <section
      id="eligibility"
      data-bg="#FFFFFF"
      className="bg-paper-0 px-6 md:px-10 lg:px-16 py-[72px] md:py-[104px] scroll-mt-20"
    >
      <div className="max-w-[1080px] mx-auto">
        <Reveal>
          <SectionLabel index="S07">Will your product clear Japan?</SectionLabel>

          <div className="mt-5 mb-14 max-w-[860px]">
            <WordByWord
              lines={[
                "Regulation follows the product category.",
                "This is the first fork in the road.",
              ]}
              className="font-semibold text-ink-900 leading-[1.16] tracking-[-0.014em]"
              style={{ fontSize: "clamp(22px, 2.2vw, 30px)" }}
            />
          </div>
        </Reveal>

        <div className="space-y-10">
          {TIERS.map((tier) => (
            <div key={tier.label} className={`border-l-2 pl-6 md:pl-8 ${tier.rule}`}>
              <h3
                className={`font-display text-[17px] md:text-[20px] font-semibold leading-[1.32] tracking-[-0.010em] mb-4 ${tier.tone}`}
              >
                {tier.label}
              </h3>

              {tier.items && (
                <p className={`text-[15px] md:text-base leading-[1.7] mb-3 ${tier.tone}`}>
                  {tier.items}
                </p>
              )}

              {tier.rules && (
                <ul className="space-y-3 mb-3">
                  {tier.rules.map((rule) => (
                    <li key={rule.trigger} className="text-[15px] md:text-base leading-[1.7]">
                      <span className="font-semibold text-ink-900">
                        {rule.trigger}
                      </span>
                      <span className="text-ink-700">
                        {" "}— {rule.law}
                      </span>
                      {rule.source && (
                        <span className="ml-2 inline-block">
                          <SourceLink href={rule.source} label={rule.sourceLabel} />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {tier.body && (
                <p className="text-ink-500 text-[15px] leading-[1.7] max-w-[680px]">
                  {tier.body}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* 横断リスク */}
        <div className="mt-16 pt-12 border-t border-paper-200">
          <p className="font-display text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-500 mb-8">
            Also applies to everyone
          </p>
          <ul className="space-y-6 max-w-[860px]">
            {CROSS_CUTTING.map((item) => (
              <li key={item.law} className="flex gap-4">
                <span
                  className="mt-[0.62em] h-px w-4 shrink-0 bg-accent-600"
                  aria-hidden="true"
                />
                <p className="text-[15px] md:text-base leading-[1.7]">
                  <span className="font-semibold text-ink-900">{item.law}</span>
                  <span className="text-ink-700"> — {item.note}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="#contact"
          className="group mt-14 inline-flex items-center gap-4 bg-accent-600 px-8 py-[18px] rounded-[2px] text-paper-0 text-[14px] font-semibold hover:bg-accent-500 transition-colors tap"
        >
          Product not listed here? Tell us what it is
          <span className="rule-grow" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
