"use client";
import { LuArrowUpRight } from "react-icons/lu";
import { motion } from "framer-motion";
import WordByWord from "./WordByWord";
import { SOURCES } from "./sources";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// S6 プラットフォーム比較
//
// ★確認できていない欄は "—" のまま出す。推測で埋めない。
//   空欄があること自体が「調べたことしか書かない」証明として機能し、
//   このページの信頼装置の一部になっている。
//   欄を埋める場合は、必ず各社の公式情報で裏を取ってから。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const LAST_VERIFIED = "2026-08";
const NA = "—";

const ROWS = [
  {
    label: "English-language route for overseas owners",
    makuake: "Conditions published",
    campfire: "Dedicated English page",
    green: "None found",
  },
  {
    label: "Japanese company required?",
    makuake: NA,
    campfire: "States a company registered outside Japan can run a project",
    green: NA,
  },
  {
    label: "Individual or company",
    makuake: NA,
    campfire: "Companies only",
    green: "Legal entity required",
  },
  {
    label: "Run the project in Japanese",
    makuake: "Required",
    campfire: NA,
    green: NA,
  },
  {
    label: "Reward shipping",
    makuake: "Within Japan only",
    campfire: NA,
    green: NA,
  },
  {
    label: "Overseas remittance",
    makuake: NA,
    campfire: "Case by case, discuss in advance",
    green: NA,
  },
  {
    label: "Review",
    makuake: "Three passes · several weeks",
    campfire: NA,
    green: NA,
  },
];

const PLATFORMS = [
  { key: "makuake", name: "Makuake", source: SOURCES.makuake, sourceLabel: "Makuake Help Center" },
  { key: "campfire", name: "CAMPFIRE", source: SOURCES.campfire, sourceLabel: "CAMPFIRE overseas page" },
  { key: "green", name: "GREEN FUNDING", source: null, sourceLabel: null },
];

function Cell({ value }) {
  if (value === NA) {
    return (
      <span className="text-ink-400" aria-label="Not confirmed">
        {NA}
      </span>
    );
  }
  return <span className="text-ink-700">{value}</span>;
}

export default function PlatformComparison() {
  return (
    <section
      id="platforms"
      data-bg="#FAF9F7"
      className="bg-paper-50 px-6 md:px-10 lg:px-16 py-[72px] md:py-[104px] scroll-mt-20"
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
          <span className="text-accent-600 text-xs font-semibold tracking-[0.08em] uppercase">
            Where you can actually launch
          </span>
        </motion.div>

        <div className="mb-12 max-w-3xl">
          <WordByWord
            lines={[
              "Three platforms. They do not accept",
              "the same things on the same terms.",
            ]}
            className="font-semibold text-ink-900 leading-[1.16] tracking-[-0.014em]"
            style={{ fontSize: "clamp(22px, 2.2vw, 30px)" }}
          />
        </div>

        {/* デスクトップ: 比較表 */}
        <div className="hidden md:block bg-white border border-paper-200 rounded-none overflow-hidden">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-paper-50">
                <th scope="col" className="text-left px-5 py-4 font-semibold text-ink-400 text-[10px] tracking-[0.08em] uppercase w-[26%]">
                  &nbsp;
                </th>
                {PLATFORMS.map((p) => (
                  <th
                    key={p.key}
                    scope="col"
                    className="text-left px-5 py-4 font-medium text-ink-900 text-base"
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-t border-paper-200">
                  <th
                    scope="row"
                    className="align-top text-left px-5 py-4 font-semibold text-ink-500 text-xs leading-relaxed"
                  >
                    {row.label}
                  </th>
                  {PLATFORMS.map((p) => (
                    <td key={p.key} className="align-top px-5 py-4 leading-relaxed">
                      <Cell value={row[p.key]} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-paper-200 bg-paper-50/60">
                <th scope="row" className="align-top text-left px-5 py-4 font-semibold text-ink-500 text-xs">
                  Source
                </th>
                {PLATFORMS.map((p) => (
                  <td key={p.key} className="align-top px-5 py-4">
                    {p.source ? (
                      <a
                        href={p.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-600 text-xs font-semibold hover:underline"
                      >
                        {p.sourceLabel}
                        <LuArrowUpRight className="inline-block size-[13px] shrink-0 opacity-60" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className="text-ink-400 text-xs">{NA}</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* モバイル: カード3枚。行の順序を完全に揃えて縦方向の比較を可能にする */}
        <div className="md:hidden space-y-4">
          {PLATFORMS.map((p) => (
            <div key={p.key} className="bg-white border border-paper-200 rounded-none p-6">
              <h3 className="font-medium text-ink-900 text-lg mb-5">
                {p.name}
              </h3>
              <dl className="space-y-3">
                {ROWS.map((row) => (
                  <div key={row.label} className="flex gap-4 text-sm">
                    <dt className="w-[42%] flex-shrink-0 text-ink-500 text-xs leading-relaxed">
                      {row.label}
                    </dt>
                    <dd className="flex-1 leading-relaxed">
                      <Cell value={row[p.key]} />
                    </dd>
                  </div>
                ))}
              </dl>
              {p.source && (
                <a
                  href={p.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-5 pt-4 border-t border-paper-200 w-full text-accent-600 text-xs font-semibold"
                >
                  {p.sourceLabel}
                        <LuArrowUpRight className="inline-block size-[13px] shrink-0 opacity-60" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          ))}
        </div>

        <p className="text-ink-500 text-xs mt-5 leading-relaxed">
          Blank cells are conditions we could not confirm from a primary source,
          so we have left them blank. Platform terms change — confirm current
          conditions on each platform&apos;s own site before you decide. Last
          checked {LAST_VERIFIED}.
        </p>

        <motion.p
          className="text-ink-700 text-base md:text-lg leading-relaxed mt-12 max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          It isn&apos;t as simple as CAMPFIRE to test and Makuake to scale. What
          fits depends on the product and on what you want the campaign to
          prove.
        </motion.p>

        {/* 比較表が「抜け道探し」に使われるのを防ぎ、S3との接続を保つ */}
        <motion.div
          className="mt-8 border-l-2 border-ink-900 pl-6 py-1 max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-ink-900 font-semibold text-base md:text-lg leading-relaxed">
            Wherever you launch, the three requirements in Group B don&apos;t go
            away. Choosing a platform is choosing operating terms. It isn&apos;t
            a way around the law.
          </p>
        </motion.div>

        <a
          href="#contact"
          className="inline-block mt-10 text-accent-600 text-sm font-semibold hover:underline"
        >
          Not sure which one fits?</a>
      </div>
    </section>
  );
}
