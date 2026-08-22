"use client";
import { LuArrowUpRight } from "react-icons/lu";
import Image from "next/image";
import { motion } from "framer-motion";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// S10 Who we are
//
// このセクションを意図的に後半に置いている。実績のない無名の日本企業のCEOの
// 顔写真には、初期状態では価値がない。「この会社は正確なことを言う」と
// 読者が判断した後に顔を出すことで、情報への信頼が人格への信頼に変換される。
//
// ★実績の見せ方に注意。カルーセルや金額の大文字表示は使わない。
//   ここに挙げている実績はすべて海外プラットフォーム(Kickstarter/Indiegogo/zeczec)
//   のもので、日本のクラファンでの実績ではない。本文の
//   "on overseas platforms — Kickstarter, Indiegogo and zeczec" は
//   その事実関係を保つための記述なので、短縮・削除しないこと。
//
// ★キャンペーン名は匿名のまま（クライアントへの掲載許諾が未確認のため）。
//   リンク先は実際のKickstarterページなので、クリックすれば検証はできる。
//   許諾が取れたら実名・実タイトルに差し替えると検証性がさらに上がる。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CAMPAIGNS = [
  "https://www.kickstarter.com/projects/1428053160/a-cap-for-everyone-and-of-course-for-you-too",
  "https://www.kickstarter.com/projects/pluspocket/plus-pocket-the-ultimate-backpack-companion",
  "https://www.kickstarter.com/projects/knifehole/hole-utility-knife-the-ultimate-tool-for-everyday-use",
  "https://www.kickstarter.com/projects/obeyme-issyo/new-obey-me-app-coming-soon-support-the-project",
  "https://www.kickstarter.com/projects/recoverypad/experience-deep-sleep-with-japanese-onsen-recovery-pad",
  "https://www.kickstarter.com/projects/sungran/cloud-blanket-premium-cordless-warmth-anywhere",
  "https://www.kickstarter.com/projects/tholl/tholl-full-metal-5-blade-razor-with-magnetic-swap",
  "https://www.kickstarter.com/projects/scientifictowel/scientific-towel-healing-noto-with-japanese-innovation",
];

const COMPANY = [
  { label: "Legal name", value: "SOMA Inc." },
  {
    label: "Address in Japan",
    value: "127-9 Naka-Kibogaoka, Asahi-ku, Yokohama, Kanagawa 241-0825, Japan",
  },
  { label: "Phone in Japan", value: "+81 45-567-6969" },
  { label: "Founded", value: "September 9, 2019" },
  { label: "Team", value: "20 (including part-time and contract staff)" },
];

export default function WhoWeAreSection() {
  return (
    <section
      id="about"
      data-bg="#FFFFFF"
      className="bg-paper-0 px-6 md:px-10 lg:px-16 pt-[132px] pb-[132px] md:pt-[200px] md:pb-[200px] scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-px bg-accent-600" />
          <span className="text-accent-600 text-xs font-semibold tracking-[0.08em] uppercase">
            Who you&apos;d be working with
          </span>
        </motion.div>

        {/* 人物 */}
        <motion.div
          className="flex flex-col sm:flex-row gap-8 md:gap-10 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-[200px] h-[200px] flex-shrink-0 rounded-none overflow-hidden bg-paper-50 mx-auto sm:mx-0">
            <Image
              src="/images/naito_front.jpg"
              alt="Takuma Naito, CEO of SOMA Inc."
              fill
              className="object-contain object-center"
              loading="lazy"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-display font-medium text-ink-900 leading-[1.02] tracking-[-0.026em] mb-2" style={{ fontSize: "clamp(32px, 4.4vw, 60px)" }}>
              Takuma Naito
            </h3>
            <p className="text-accent-600 text-xs font-semibold tracking-widest uppercase mb-5">
              CEO, SOMA Inc.
            </p>
            <p className="text-ink-700 text-sm md:text-base leading-relaxed mb-4">
              Graduated in Hospitality Management from a university in San
              Francisco, worked as a manager at a U.S. company, then returned to
              Japan and founded SOMA.
            </p>
            <p className="text-ink-900 text-sm md:text-base leading-relaxed font-medium">
              He handles overseas clients himself, in English. No interpreter, no
              lag between your question and the answer.
            </p>
          </div>
        </motion.div>

        {/* 一人称ステートメント */}
        <motion.blockquote
          className="border-l-4 border-accent-600 pl-7 py-2 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-ink-800 text-base md:text-lg leading-relaxed mb-4">
            &ldquo;I spent enough years in the States to know how a product
            person there thinks about a launch. I&apos;ve since sat through
            enough Japanese platform reviews to know which of those instincts get
            you rejected here.
          </p>
          <p className="text-ink-800 text-base md:text-lg leading-relaxed">
            Most of what I do is translating between those two things — and most
            of it isn&apos;t language.&rdquo;
          </p>
        </motion.blockquote>

        {/* 実績（正確な表現が最重要） */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-ink-500 mb-6">
            What we&apos;ve actually done
          </p>
          <p className="text-ink-800 text-base md:text-lg leading-relaxed mb-8">
            The same team has run more than 100 crowdfunding campaigns on
            overseas platforms — Kickstarter, Indiegogo and zeczec. Eight of them
            are still live on Kickstarter, comments and all.
          </p>

          <p className="text-ink-500 text-sm font-semibold mb-4">
            Verify for yourself:
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 mb-20">
            {CAMPAIGNS.map((href, i) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-600 text-sm font-semibold hover:underline"
                >
                  Campaign {String(i + 1).padStart(2, "0")}
                  <LuArrowUpRight className="inline-block size-[12px] ml-1 shrink-0 opacity-60" aria-hidden="true" />
                  <span className="sr-only">
                    {" "}
                    on Kickstarter (opens in a new tab)
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* 会社概要 — S3「床」の伏線回収。一般的な会社概要を、
            特商法が求める表示への直接の回答として提示する */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-ink-500 mb-6">
            We are a real company in Japan
          </p>
          <p className="text-ink-800 text-base md:text-lg leading-relaxed mb-8">
            Remember the floor under all six requirements — a business name, an
            address in Japan, a phone number in Japan.{" "}
            <span className="font-semibold text-ink-900">Here is ours.</span>
          </p>

          <dl className="border border-paper-200 rounded-none overflow-hidden">
            {COMPANY.map(({ label, value }, i) => (
              <div
                key={label}
                className={`flex flex-col sm:flex-row ${
                  i % 2 === 0 ? "bg-white" : "bg-paper-50"
                }`}
              >
                <dt className="sm:w-52 px-6 py-4 font-semibold text-ink-700 text-sm border-b sm:border-b-0 sm:border-r border-paper-200 flex items-center">
                  {label}
                </dt>
                <dd className="flex-1 px-6 py-4 text-ink-700 text-sm leading-relaxed">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
