"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { LuArrowUpRight } from "react-icons/lu";
import WordByWord from "./WordByWord";
import { SOURCES } from "./sources";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// S3 要件の壁 + S4 転換
//
// この2つは同一ファイル・同一背景(deep-900)に置く。背景を切り替えると
// 読者が「章が終わった」と認識してそこが離脱点になるため。
//
// 壁は6枚を2グループに畳んである。並列に6枚並べると認知処理しきれないが、
// 2グループなら読者が覚えるべきものは2個になる。
// A→B の順序は入れ替えないこと。Aを読んだ読者は必ず「日本語ができる人を
// 雇えばいい」と考える。Bはその解決策が効かないことを示すために存在する。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const GROUP_A = [
  {
    number: "01",
    quote:
      "The editing and management of the project page must be able to be carried out in Japanese.",
    original: "プロジェクトページの編集・管理作業が日本語で行えること",
    meaning:
      "Every exchange runs in Japanese: the application, the review questions, the revisions they ask for, and every update you post while the campaign is live.",
    source: SOURCES.makuake,
    sourceLabel: "Makuake Help Center",
  },
  {
    number: "02",
    quote: "Customer communication must be able to be handled in Japanese.",
    original: "ユーザーの対応が日本語で行えること",
    meaning:
      "This is not “we have someone on staff who speaks Japanese.” It is answering questions in a public comment thread, in Japanese, every day the campaign is live — and for months after it closes.",
    source: SOURCES.makuake,
    sourceLabel: "Makuake Help Center",
  },
  {
    number: "03",
    quote: "Delivery of rewards must be limited to within Japan.",
    original: "リターンの配送が日本国内のみとなっていること",
    meaning:
      "Shipping direct from overseas to each buyer is not an option. Stock has to land in Japan, and something in Japan has to dispatch it.",
    source: SOURCES.makuake,
    sourceLabel: "Makuake Help Center",
  },
];

const GROUP_B = [
  {
    number: "04",
    quote:
      "The certifications required in Japan must already be obtained, or scheduled to be obtained.",
    original: "日本で必要な認証等を取得している（もしくは取得予定）であること",
    meaning:
      "Radio-emitting products fall under the Radio Act (電波法) and need Technical Conformity certification (技適 / TELEC). AC-powered products and lithium batteries fall under the Electrical Appliance and Material Safety Act (電気用品安全法, “DENAN”) and need PSE marking.",
    tail: "Read that far and it sounds like paperwork.",
    source: SOURCES.makuake,
    sourceLabel: "Makuake Help Center",
  },
  {
    number: "05",
    // 一次ソース(METI 事業届出)で確認できる範囲に表現を留めている。
    // 「海外メーカーは絶対に取得できない」とまでは公式に書かれていないため断定しない。
    headline: "And filing it is not something you can do from outside Japan.",
    meaning:
      "Under DENAN, the business notification and the obligation to apply the PSE mark fall on the party that manufactures the goods or imports them into Japan. The ministry defines the start of an import business by the date the goods are brought into the country. A company sitting outside Japan is not the party bringing them in — so someone inside Japan has to be.",
    source: SOURCES.pse,
    sourceLabel: "METI — Electrical Appliance and Material Safety Act",
  },
  {
    number: "06",
    headline: "And importing is not something you can do alone either.",
    meaning:
      "Under Article 95 of the Customs Act, a non-resident carrying out customs procedures in Japan has to appoint a Customs Administrative Manager (税関事務管理人) — a person or company resident in Japan — and file that appointment with customs. A revision that took effect on 1 October 2023 tightened the filing further: it now has to state the relationship between the importer and the manager.",
    source: SOURCES.acp,
    sourceLabel: "Japan Customs — procedures for non-residents",
    source2: SOURCES.acpRevision,
    source2Label: "Japan Customs — 2023 revision",
  },
];

function SourceLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/src inline-flex items-center gap-2 text-[13px] text-ink-300 hover:text-white transition-colors"
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

function WallCard({ item }) {
  return (
    <div className="h-full flex flex-col">
      <div className="font-display-xx text-[13px] font-semibold tracking-[0.06em] text-ink-300 mb-5">
        {item.number}
      </div>

      {item.quote ? (
        <blockquote className="mb-6 border-l-2 border-white/25 pl-5">
          <p className="font-quote text-white text-[19px] md:text-[21px] leading-[1.55]">
            &ldquo;{item.quote}&rdquo;
          </p>
          <cite className="not-italic block text-ink-300 text-[12px] leading-relaxed mt-3">
            {item.original}
          </cite>
        </blockquote>
      ) : (
        <p className="text-white text-[15px] md:text-base font-semibold leading-relaxed mb-4">
          {item.headline}
        </p>
      )}

      {item.quote && (
        <p className="text-ink-300 text-[10px] font-semibold tracking-[0.08em] uppercase mb-2">
          What this means in practice
        </p>
      )}
      <p className="text-white/80 text-sm leading-relaxed">{item.meaning}</p>

      {item.tail && (
        <p className="text-white/80 text-sm leading-relaxed mt-3 italic">
          {item.tail}
        </p>
      )}

      <div className="mt-auto pt-5 flex flex-col gap-1.5">
        <SourceLink href={item.source} label={item.sourceLabel} />
        {item.source2 && (
          <SourceLink href={item.source2} label={item.source2Label} />
        )}
      </div>
    </div>
  );
}

function Group({ label, title, subline, items, showChain }) {
  return (
    <div className="relative pl-5 md:pl-7 border-l-2 border-accent-600/40">
      <p className="text-accent-400 text-[11px] font-semibold tracking-[0.08em] uppercase mb-2">
        {label}
      </p>
      <h3 className="text-white font-medium text-xl md:text-2xl leading-snug mb-1.5">
        {title}
      </h3>
      <p className="text-ink-300 text-sm mb-8">{subline}</p>

      <div className="grid md:grid-cols-3 gap-4 md:gap-5">
        {items.map((item, i) => (
          <motion.div
            key={item.number}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <WallCard item={item} />
            {/* 04→05→06 が独立した箇条書きではなく1本の論理であることを示す */}
            {showChain && i < items.length - 1 && (
              <div className="flex md:hidden justify-center py-3" aria-hidden="true"><span className="block h-10 w-px bg-white/25" /></div>
            )}
            {showChain && i < items.length - 1 && (
              <div
                className="hidden md:flex absolute top-1/2 -right-[13px] -translate-y-1/2 z-10 text-accent-400 text-lg"
                aria-hidden="true"
              >
               
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function RequirementsWall() {
  return (
    <>
      {/* ━━━━━━━━ S3 THE REQUIREMENTS WALL ━━━━━━━━ */}
      <section
        id="requirements"
        data-bg="#0D1A24"
        className="bg-deep-900 px-6 md:px-10 lg:px-16 pt-[132px] pb-[132px] md:pt-[200px] md:pb-[200px] scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-px bg-accent-600" />
            <span className="text-accent-400 text-xs font-semibold tracking-[0.08em] uppercase">
              The requirements wall
            </span>
          </motion.div>

          <div className="mb-8 max-w-4xl">
            <WordByWord
              lines={[
                "What Japanese platforms — and Japanese law —",
                "require of an overseas project owner.",
              ]}
              className="font-medium text-white leading-[1.02] tracking-[-0.026em]"
              style={{ fontSize: "clamp(32px, 4.4vw, 60px)" }}
            />
          </div>

          <motion.p
            className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            None of this is our opinion. It is written in published platform
            rules and published statutes. We&apos;ve linked all of it. Go check.
          </motion.p>

          <Group
            label="Group A"
            title="The operating wall"
            subline="A question of who does the work."
            items={GROUP_A}
          />

          {/* このブリッジが壁6枚構成の背骨。読者の「通訳を雇えばいい」という
              初期仮説を明示的に潰してからGroup Bに入る */}
          <motion.div
            className="my-14 md:my-16 flex items-center gap-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="h-px flex-1 bg-white/15" />
            <p className="text-white/80 text-sm md:text-base text-center max-w-xl leading-relaxed">
              Everything above still looks solvable by hiring someone who speaks
              Japanese.{" "}
              <span className="text-white font-semibold">
                The next three are not.
              </span>
            </p>
            <div className="h-px flex-1 bg-white/15" />
          </motion.div>

          <Group
            label="Group B"
            title="The legal-identity wall"
            subline="A question of who you are."
            items={GROUP_B}
            showChain
          />

          {/* THE FLOOR — 壁と並列にせず「全部の下に敷かれた前提」として1ブロックに。
              ここでは解決策を一切書かない。S10の会社概要で回収する */}
          <motion.div
            className="mt-16 md:mt-20 border border-deep-700 rounded-none p-8 md:p-10 bg-deep-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent-400 text-[11px] font-semibold tracking-[0.08em] uppercase mb-4">
              The floor under all six
            </p>
            <p className="text-white font-semibold text-lg md:text-xl mb-7">
              And all six of them stand on the same floor.
            </p>

            <ul className="space-y-5 mb-7">
              <li className="flex gap-4">
                <span className="text-accent-400 flex-shrink-0" aria-hidden="true">—</span>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  A project owner of record, and a bank account at a Japanese
                  bank held in that name.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="text-accent-400 flex-shrink-0" aria-hidden="true">—</span>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  The seller disclosure required by the Act on Specified
                  Commercial Transactions (特定商取引法): the name of the
                  business, an address in Japan, and a phone number in Japan,
                  published on the page where the product is sold.
                </p>
              </li>
            </ul>

            <p className="text-white font-semibold text-base md:text-lg leading-relaxed">
              An address and a phone number outside Japan do not satisfy this.
              There is no overseas version of it.
            </p>
          </motion.div>

          {/* 審査フロー（補足扱い） */}
          <motion.div
            className="mt-12 pt-8 border-t border-deep-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-ink-300 text-[10px] font-semibold tracking-[0.08em] uppercase mb-3">
              For reference — how review runs
            </p>
            <p className="text-ink-300 text-sm leading-relaxed max-w-2xl">
              Three passes: does the business exist, can the product actually be
              delivered, and is it legal to sell in Japan. Budget several weeks,
              and expect questions in Japanese at each pass.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━ S4 THE TURN（背景を切らない） ━━━━━━━━ */}
      <section
        data-bg="#0D1A24"
        className="relative bg-deep-900 px-6 md:px-10 lg:px-16 py-[96px] md:py-[152px] overflow-hidden"
      >
        {/* 倉庫を背景に敷く。読ませる面ではないので彩度を落として沈める */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/warehouse_racks.jpg"
            alt=""
            fill
            className="object-cover object-center grayscale opacity-[0.28]"
            sizes="100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-deep-900/70" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* 6→2→1 の収束。S3で膨らんだ認知負荷が目に見えて縮む */}
          <motion.div
            className="flex items-center justify-center gap-4 md:gap-8 mb-12 text-[10px] md:text-xs font-semibold tracking-[0.08em] uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col items-center gap-2.5">
              <div className="flex gap-1" aria-hidden="true">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="block w-1 h-7 bg-white/30" />
                ))}
              </div>
              <span className="text-ink-300">6 requirements</span>
            </div>
            <span className="block h-px w-6 bg-white/25" aria-hidden="true" />
            <div className="flex flex-col items-center gap-2.5">
              <div className="flex gap-1.5" aria-hidden="true">
                {[...Array(2)].map((_, i) => (
                  <span key={i} className="block w-2 h-7 bg-white/50" />
                ))}
              </div>
              <span className="text-ink-300">2 walls</span>
            </div>
            <span className="block h-px w-6 bg-white/25" aria-hidden="true" />
            <div className="flex flex-col items-center gap-2.5">
              <span className="block w-5 h-7 bg-accent-600" aria-hidden="true" />
              <span className="text-accent-400">1 question</span>
            </div>
          </motion.div>

          <div className="mb-10">
            <WordByWord
              lines={[
                "The six requirements are not six problems.",
                "They are one question asked six ways:",
                "who, inside Japan, is answerable for this product?",
              ]}
              className="font-medium text-white leading-[1.08] tracking-[-0.020em]"
              style={{ fontSize: "clamp(27px, 3.2vw, 42px)" }}
            />
          </div>

          <motion.p
            className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            That party — the one those six requirements keep pointing at — is
            what people actually mean when they say &ldquo;a partner in
            Japan.&rdquo; It is the entire job, and it is the job we do.
          </motion.p>
        </div>
      </section>
    </>
  );
}
