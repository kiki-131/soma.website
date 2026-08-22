"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// セクションラベル。
//
// 以前は「w-8 h-px の短い罫線 + tracking-[0.35em] の極小大文字」が
// 9箇所で1文字違わず反復していた。0.35em の字送りは Bootstrap 由来の
// 小見出しの記号で、一目でテンプレだと分かる。
//
// ここでは罫線を捨て、字送りを 0.08em に詰め、代わりに S01〜S12 の
// 連番を与えた。同じ形が繰り返されても「章立ての目次」として読めるため、
// 反復が事故ではなく意図に見える。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function SectionLabel({ index, children, tone = "light" }) {
  const numClass = tone === "dark" ? "text-ink-300" : "text-ink-400";
  const slashClass = tone === "dark" ? "text-deep-700" : "text-paper-300";
  const textClass = tone === "dark" ? "text-ink-300" : "text-ink-500";

  return (
    <div className="flex items-baseline gap-3">
      <span
        className={`font-display-xx text-[12px] font-semibold tracking-[0.06em] ${numClass}`}
      >
        {index}
      </span>
      <span className={slashClass} aria-hidden="true">
        /
      </span>
      <span
        className={`font-display text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.08em] ${textClass}`}
      >
        {children}
      </span>
    </div>
  );
}
