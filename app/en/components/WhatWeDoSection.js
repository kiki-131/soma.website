"use client";
import { motion } from "framer-motion";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// S5 対応表 — 本ページで最も重要なブロック。
//
// 左列は S3 の壁と「同じ番号・同じ順序・同じ文言」で並べる。
// 読者は視線を左右に往復させるだけで負債の回収を確認できる。
// この対応の完全性が、実績の代替物として機能する。
//
// A行が3つ連続で SOMA と埋まることで先に勢いと安心が生まれ、
// その後に来るB行の「case by case」が逃げではなく区別に見える。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CASE_BY_CASE = "Structured case by case";

const MAPPING = [
  {
    group: "A",
    number: "01",
    requirement:
      "The editing and management of the project page must be able to be carried out in Japanese.",
    owner: "SOMA",
    detail:
      "Our Japanese team writes and runs the page, and handles the platform review correspondence.",
  },
  {
    group: "A",
    number: "02",
    requirement:
      "Customer communication must be able to be handled in Japanese.",
    owner: "SOMA",
    detail:
      "Every comment, every day the campaign is live, and after it closes.",
  },
  {
    group: "A",
    number: "03",
    requirement: "Delivery of rewards must be limited to within Japan.",
    owner: "SOMA",
    detail: "Domestic warehousing and dispatch arranged inside Japan.",
  },
  {
    group: "B",
    number: "04",
    requirement:
      "The certifications required in Japan must already be obtained, or scheduled to be obtained.",
    owner: "Joint",
    detail:
      "We identify what your product triggers and sequence the work. The technical documentation and test samples come from your engineers.",
  },
  {
    group: "B",
    number: "05",
    requirement:
      "The DENAN obligation sits with the party that imported the goods.",
    owner: CASE_BY_CASE,
  },
  {
    group: "B",
    number: "06",
    requirement:
      "A non-resident importer has to appoint a Customs Administrative Manager in Japan.",
    owner: CASE_BY_CASE,
  },
  {
    group: "FLOOR",
    number: "—",
    requirement: "Project owner of record + Japanese bank account",
    owner: CASE_BY_CASE,
  },
  {
    group: "FLOOR",
    number: "—",
    requirement:
      "特定商取引法 disclosure: business name, Japanese address, Japanese phone number",
    owner: CASE_BY_CASE,
  },
];

const SCOPE = [
  {
    title: "Platform selection & application",
    body: "Which of the three platforms suits the product, the price point and the timing. We prepare the application and handle the review in Japanese.",
  },
  {
    title: "Page build & Japanese copy (not translation)",
    body: "The page is written in Japanese from the product up, not translated from your Kickstarter page. Photography, video and layout are directed for a Japanese buyer.",
  },
  {
    title: "Certification mapping (TELEC / PSE / labeling)",
    body: "Exactly which certifications and label markings your product triggers, what each one takes, and the order they have to happen in.",
  },
  {
    title: "Campaign ops & promotion",
    body: "Launch timing, Japanese PR and paid distribution, project updates, and the daily comment thread for the full run.",
  },
  {
    title: "Backer support & fulfillment",
    body: "Japanese-language support before, during and after the campaign, and dispatch to buyers from inside Japan.",
  },
  {
    title: "After the campaign: retail / EC / distributors",
    body: "The campaign leaves you a sales record, Japanese assets and a compliance trail. We use them to open the next conversation.",
  },
];

const GROUP_LABEL = {
  A: "Group A",
  B: "Group B",
  FLOOR: "The floor",
};

function OwnerCell({ owner, detail }) {
  const isCaseByCase = owner === CASE_BY_CASE;
  return (
    <>
      <span
        className={
          isCaseByCase
            ? "inline-block text-ink-300 text-xs font-semibold border border-deep-700 rounded-full px-3 py-1"
            : "block text-accent-400 font-semibold text-sm mb-1.5"
        }
      >
        {isCaseByCase ? owner : owner}
      </span>
      {detail && (
        <span className="block text-white/80 text-sm leading-relaxed">
          {detail}
        </span>
      )}
    </>
  );
}

export default function WhatWeDoSection() {
  return (
    <>
      {/* ── 対応表（ダーク継続） ── */}
      <section
        id="what-we-do"
        data-bg="#0D1A24"
        className="bg-deep-900 px-6 md:px-10 lg:px-16 pt-4 pb-[96px] md:pb-[144px] scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-px bg-accent-600" />
            <span className="text-accent-400 text-xs font-semibold tracking-[0.08em] uppercase">
              What we actually do
            </span>
          </motion.div>

          <motion.p
            className="text-white text-lg md:text-2xl font-semibold leading-relaxed max-w-3xl mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            So here are the same six, in the same order and the same words, with
            the only column that matters added: who does it.
          </motion.p>

          {/* デスクトップ: テーブル */}
          <div className="hidden md:block border border-deep-700 rounded-none overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-deep-800">
                  <th scope="col" className="text-left px-5 py-4 text-ink-300 text-[10px] font-semibold tracking-[0.08em] uppercase w-16">
                    #
                  </th>
                  <th scope="col" className="text-left px-5 py-4 text-ink-300 text-[10px] font-semibold tracking-[0.08em] uppercase w-[46%]">
                    The requirement
                  </th>
                  <th scope="col" className="text-left px-5 py-4 text-ink-300 text-[10px] font-semibold tracking-[0.08em] uppercase">
                    Who does it
                  </th>
                </tr>
              </thead>
              <tbody>
                {MAPPING.map((row, i) => {
                  const prev = MAPPING[i - 1];
                  const isNewGroup = !prev || prev.group !== row.group;
                  return (
                    <tr
                      key={`${row.group}-${row.number}-${i}`}
                      className={`${isNewGroup ? "border-t-2 border-accent-600/40" : "border-t border-deep-700"}`}
                    >
                      <th
                        scope="row"
                        className="align-top px-5 py-5 text-left text-accent-400 font-medium text-sm"
                      >
                        {row.number}
                        {isNewGroup && (
                          <span className="block text-ink-300 text-[9px] font-semibold tracking-[0.08em] uppercase mt-1.5">
                            {GROUP_LABEL[row.group]}
                          </span>
                        )}
                      </th>
                      <td className="align-top px-5 py-5 text-white/80 text-sm leading-relaxed">
                        {row.requirement}
                      </td>
                      <td className="align-top px-5 py-5">
                        <OwnerCell owner={row.owner} detail={row.detail} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* モバイル: カード縦積み（横スクロールテーブルは使わない） */}
          <div className="md:hidden space-y-3">
            {MAPPING.map((row, i) => {
              const prev = MAPPING[i - 1];
              const isNewGroup = !prev || prev.group !== row.group;
              return (
                <div key={`${row.group}-${row.number}-${i}`}>
                  {isNewGroup && (
                    <p className="text-accent-400 text-[10px] font-semibold tracking-[0.08em] uppercase mt-7 mb-3">
                      {GROUP_LABEL[row.group]}
                    </p>
                  )}
                  <div
                    className={`border rounded-none p-5 ${
                      row.owner === CASE_BY_CASE
                        ? "border-deep-700 bg-deep-800"
                        : "border-accent-600/30 bg-deep-800"
                    }`}
                  >
                    <p className="text-ink-300 text-xs leading-relaxed mb-3">
                      <span className="text-accent-400 font-medium mr-2">
                        {row.number}
                      </span>
                      {row.requirement}
                    </p>
                    <div className="pt-3 border-t border-deep-700">
                      <OwnerCell owner={row.owner} detail={row.detail} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ◇注記 — 曖昧さを誤魔化さずに明言することが、断定する競合との差別化になる */}
          <motion.div
            className="mt-8 border border-deep-700 rounded-none p-7 md:p-9 bg-deep-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4">
              Those last four do not have one answer, and we are not going to
              pretend they do. The right structure changes with the product, the
              certifications involved and what you already have in place, so it
              gets designed per project. If something isn&apos;t realistic for
              your product, you&apos;ll hear it at the eligibility check — before
              you&apos;ve committed to anything.
            </p>
            <p className="text-white font-semibold text-sm md:text-base leading-relaxed">
              We&apos;d rather name that openly than hand you a clean answer that
              doesn&apos;t survive contact with your product.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SCOPE OF WORK（ここでライトへ） ── */}
      <section
        data-bg="#FFFFFF"
        className="bg-paper-0 px-6 md:px-10 lg:px-16 py-[96px] md:py-[144px]"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-ink-500 mb-10">
            Scope of work
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {SCOPE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              >
                <h3 className="text-ink-900 font-semibold text-base mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-ink-700 text-sm leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-4 bg-accent-600 text-white font-semibold text-sm rounded-[2px] hover:bg-accent-500 transition-colors"
            >
              Check if my product qualifies
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
