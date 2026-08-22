"use client";
import Reveal from "./Reveal";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ヒーロー直下の帯。商材の自己判定をここで完結させ、
// 対象外の読者（薬機法アウト商材）には早い段階で帰ってもらう。
// 「断る会社である」ことを最初に示すブロックでもあるので、不可も隠さない。
//
// ★ ✓ ▲ ✗ の文字記号は使わない。あれは Markdown の語彙であって
//   グラフィックの語彙ではなく、そのまま「AIの出力」に見える。
//   ここでは可否を「行頭の罫の色」と「文字の濃度」で表している。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const TIERS = [
  {
    key: "ready",
    rule: "bg-ink-900",
    text: "text-ink-900",
    legend: "ready to go",
    items: ["EDC & Tools", "Outdoor", "Stationery", "Bags", "Kitchen"],
  },
  {
    key: "possible",
    rule: "bg-accent-600",
    text: "text-ink-700",
    legend: "possible, needs certification & lead time",
    items: ["Wireless (Wi-Fi / BT)", "AC-powered · Li-ion", "Food & Beverage"],
  },
  {
    key: "declined",
    rule: "bg-paper-300",
    text: "text-ink-400",
    legend: "not in phase 1",
    items: ["Cosmetics", "Supplements", "Beauty & medical devices"],
  },
];

// mt-[0.62em] で罫が1行目の x-height の中央に来る
function Rule({ className }) {
  return (
    <span
      className={`mt-[0.62em] h-px w-5 shrink-0 ${className}`}
      aria-hidden="true"
    />
  );
}

export default function ProductFitStrip() {
  return (
    <section
      data-bg="#FAF9F7"
      className="bg-paper-50 border-y border-paper-200 px-6 md:px-10 lg:px-16 py-[48px] md:py-[64px]"
    >
      <Reveal className="max-w-[1080px] mx-auto">
        <h2 className="font-display text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-500 mb-8">
          What we take to Japan — Phase 1
        </h2>

        <div className="space-y-4">
          {TIERS.map((tier) => (
            <div key={tier.key} className="flex items-start gap-4">
              <Rule className={tier.rule} />
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {tier.items.map((item) => (
                  <li
                    key={item}
                    className={`text-[15px] leading-6 ${tier.text}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-9 pt-6 border-t border-paper-200 flex flex-wrap items-center gap-x-8 gap-y-3">
          {TIERS.map((tier) => (
            <span
              key={tier.key}
              className="flex items-center gap-2.5 text-[13px] text-ink-500"
            >
              <span className={`h-px w-5 ${tier.rule}`} aria-hidden="true" />
              {tier.legend}
            </span>
          ))}

          <a
            href="#eligibility"
            className="group ml-auto flex items-center gap-3 text-[13px] font-semibold text-ink-900"
          >
            <span className="border-b border-paper-300 pb-0.5 transition-colors group-hover:border-ink-900">
              See the full breakdown
            </span>
            <span className="rule-grow" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
