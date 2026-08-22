"use client";
import Reveal from "./Reveal";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// S8 商標アラート。無償の助言として渡し、ここで有料サービスに繋げない。
// CTA直前に「今日あなたが自分でやるべきこと」を無償で渡すことで返報性が働く。
// 強いCTAを置くと贈与が取引に見えて返報性が消えるため、CTAは弱いまま保つ。
//
// ★以前はダーク面に ⚠ 記号を添えた中央寄せだったが、
//   ダークが4回出ると「特別な場面」であることが失われるため、
//   ダークは S1 / S4 / S12+S13 の3回に絞り、ここは朱の帯に変更した。
//   警告記号は使わず、上端の朱線と NOTE ラベルだけで示す。
//   中央寄せの長文はモバイルで読みにくいので左寄せにしている。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function TrademarkAlert() {
  return (
    <aside
      data-bg="#FBF2ED"
      className="bg-accent-50 border-t-[3px] border-accent-600 px-6 md:px-10 lg:px-16 py-[48px] md:py-[72px]"
    >
      <Reveal className="max-w-[1080px] mx-auto lg:grid lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-3">
          <p className="font-display text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.08em] text-accent-600">
            Note
          </p>
        </div>

        <div className="lg:col-start-5 lg:col-span-8 mt-5 lg:mt-0">
          <p
            className="font-display font-medium text-ink-900 leading-[1.16] tracking-[-0.014em] mb-6"
            style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}
          >
            Japan awards trademark rights to whoever files first, not to whoever
            used the name first.
          </p>

          <p className="text-ink-700 text-[15px] md:text-base leading-[1.7] mb-4 max-w-[680px]">
            If a campaign puts your brand in front of a Japanese audience and
            someone else files it, you can end up unable to sell in Japan under
            your own name — and buying it back is the expensive version of this
            conversation.
          </p>

          <p className="text-ink-700 text-[15px] md:text-base leading-[1.7] max-w-[680px]">
            This has nothing to do with whether you hire us. It&apos;s worth
            doing this month whether you ever launch in Japan or not. If you only
            want to know how it works, ask us that and nothing else.
          </p>

          <a
            href="#contact"
            className="group mt-8 inline-flex items-center gap-3 text-[14px] font-semibold text-ink-900"
          >
            <span className="border-b border-accent-600/40 pb-0.5 transition-colors group-hover:border-ink-900">
              Ask us how — no strings
            </span>
            <span className="rule-grow" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </aside>
  );
}
