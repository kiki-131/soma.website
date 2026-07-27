"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import CharByChar from "../../components/CharByChar";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// コンテンツ定義 — ここを編集してコンテンツを差し替えてください
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CHALLENGES = [
  {
    label: "Language & Cultural Barriers",
    body: "Conveying your product's appeal accurately in another language and culture is harder than it looks. The nuances lost in a literal translation can make or break a customer's decision to buy.",
  },
  {
    label: "Finding a Trustworthy Partner",
    body: "Running local sales channels, social media, and logistics all depend on having a partner you can trust on the ground. Many companies get stuck simply because they don't know where to find one.",
  },
  {
    label: "Complex Regulations & Procedures",
    body: "Import/export rules, intellectual property, and tax systems all vary by country. A single misstep can turn into a costly mistake — and the risk of going in without expert guidance is simply too high.",
  },
  {
    label: "The Weight of Upfront Investment & Risk",
    body: "Taking inventory overseas requires major upfront capital. Few companies can afford to take that risk before knowing whether the product will actually sell.",
  },
];

const SOLUTIONS = [
  {
    number: "01",
    label: "Overseas Crowdfunding Support\nTest-launch your product with minimal inventory risk",
    body: "Using Kickstarter, Indiegogo, and zeczec, you can gauge market demand without holding inventory. Scale up only once you know it sells — minimizing your upfront risk.",
    link: "/crowdfunding",
    image: "/images/stock_crowdfunding.jpg",
  },
  {
    number: "02",
    label: "Faire Wholesale Support\nA direct channel into U.S. retail stores",
    body: "Using Faire, North America's largest B2B wholesale marketplace, we connect you directly with over 700,000 U.S. retailers — putting your product on American shelves at zero upfront cost.",
    link: "/faire",
    image: "/images/stock_handshake.jpg",
  },
  {
    number: "03",
    label: "Cross-Border E-Commerce Support\nGrow overseas sales through your own online store",
    body: "We build and manage your own e-commerce site to sell directly to customers overseas. Using the track record and fans gained through crowdfunding as a foundation, we set up the systems for consistent, ongoing sales.",
    link: "/cross-border-ec",
    image: "/images/stock_teamwork.jpg",
  },
];


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SectionLabel({ text, light = false }) {
  return (
    <motion.div
      className="flex items-center gap-4 mb-10"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={`w-8 h-px ${light ? "bg-[#0066FF]" : "bg-[#0066FF]"}`} />
      <span className={`text-xs font-bold tracking-[0.35em] uppercase ${light ? "text-[#0066FF]" : "text-[#0066FF]"}`}>
        {text}
      </span>
    </motion.div>
  );
}

// JPページへのリンクに付与する定型バッジ（ダーク背景用）
function JPBadgeDark() {
  return <span className="text-white/35 text-[10px] font-normal tracking-wide">(JP)</span>;
}

// ソリューションカードセクション全体
// ホバーしたカードが横方向に拡張し、他は縮む
function SolutionCards() {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      className="flex gap-3 mb-20"
      style={{ height: "clamp(360px, 50vh, 520px)" }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {SOLUTIONS.map((item, i) => (
        <motion.div
          key={i}
          className="relative overflow-hidden rounded-2xl bg-white cursor-default flex-shrink-0 shadow-sm"
          // スクロール時: 右から左へワイプ
          variants={{
            hidden: { clipPath: "inset(0 0 0 100%)" },
            show: {
              clipPath: "inset(0 0 0 0%)",
              transition: { duration: 0.85, delay: i * 0.13, ease: [0.76, 0, 0.24, 1] },
            },
          }}
          // ホバーで横幅を伸縮
          animate={{
            flex: hovered === i ? 3 : hovered !== null ? 0.65 : 1,
            borderColor: hovered === i ? "rgba(0,102,255,0.4)" : "rgba(0,0,0,0.06)",
          }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ border: "1px solid transparent" }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* 写真 — imageがある場合のみ、ホバーでフェードイン（上部のみ） */}
          {item.image && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-[62%] pointer-events-none overflow-hidden rounded-t-2xl"
              animate={{ opacity: hovered === i ? 1 : 0 }}
              transition={{ duration: 0.45, delay: hovered === i ? 0.2 : 0 }}
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover object-center"
              />
              {/* 下端をフェードアウト */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
            </motion.div>
          )}

          {/* コンテンツ */}
          <motion.div
            className="absolute inset-0 p-6 flex flex-col"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.65 + i * 0.13 }}
          >
            {/* 番号 */}
            <div className="text-[#0066FF] font-black leading-none mb-auto select-none text-4xl md:text-5xl">
              {item.number}
            </div>

            {/* 区切り線 — ホバーで青く */}
            <div className="relative h-px bg-gray-200 mb-4 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 h-full bg-[#0066FF]"
                animate={{ width: hovered === i ? "100%" : "0%" }}
                transition={{ duration: 0.5, delay: hovered === i ? 0.5 : 0, ease: "easeOut" }}
              />
            </div>

            {/* タイトル — 常時表示 */}
            <h3 className="text-gray-900 font-bold text-sm md:text-base leading-snug whitespace-pre-line mb-3 min-w-[80px]">
              {item.label}
            </h3>

            {/* 詳細 — ホバーで出現 */}
            <motion.div
              animate={{
                opacity: hovered === i ? 1 : 0,
                y: hovered === i ? 0 : 8,
              }}
              transition={{ duration: 0.3, delay: hovered === i ? 0.1 : 0 }}
            >
              <p className="text-gray-500 text-xs leading-relaxed mb-3">
                {item.body}
              </p>
              {item.link ? (
                <Link
                  href={item.link}
                  className="inline-flex items-baseline gap-1.5 text-[#0066FF] text-xs font-semibold"
                >
                  Learn More
                  <span className="text-gray-400 text-[10px] font-normal tracking-wide">(JP)</span>
                  <span>→</span>
                </Link>
              ) : null}
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// モバイル用: タップで縦に開閉するアコーディオン
function MobileSolutionCards() {
  const [active, setActive] = useState(null);

  return (
    <div className="flex flex-col mb-20 border-t border-white/10">
      {SOLUTIONS.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="border-b border-white/10"
        >
          <button
            className="w-full flex items-center gap-4 py-5 text-left"
            style={{ minHeight: 0, minWidth: 0 }}
            onClick={() => setActive(active === i ? null : i)}
          >
            <span className="text-[#0066FF] font-black text-2xl w-10 flex-shrink-0">{item.number}</span>
            <h3 className="text-white font-bold text-base flex-1 leading-snug whitespace-pre-line">{item.label}</h3>
            <span className="text-white/40 text-lg flex-shrink-0">{active === i ? "−" : "+"}</span>
          </button>
          <motion.div
            initial={false}
            animate={active === i ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="pb-5 pl-14 pr-2">
              <p className="text-white/60 text-sm leading-relaxed">{item.body}</p>
              {item.link ? (
                <Link
                  href={item.link}
                  className="inline-flex items-baseline gap-1.5 text-[#0066FF] text-xs font-semibold mt-3"
                >
                  Learn More
                  <JPBadgeDark />
                  <span>→</span>
                </Link>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default function ServicesSection() {
  return (
    <>
      {/* ── Part 1: The Challenge (light) ── */}
      <section className="bg-white py-28 md:py-40 px-6 md:px-16 overflow-x-hidden">
        <div className="max-w-5xl mx-auto">
          <SectionLabel text="Services" />

          <div className="mb-8">
            <CharByChar
              lines={["Hitting Roadblocks", "in Global Expansion?"]}
              className="font-extrabold text-gray-900 leading-[0.96]"
              style={{ fontSize: "clamp(23px, 6vw, 80px)" }}
            />
          </div>

          <motion.p
            className="text-gray-400 text-base md:text-lg mb-20 max-w-xl leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Most Japanese companies stumble at the very first step of going
            global — and the reasons are almost always the same.
          </motion.p>

          {/* 課題リスト */}
          <div className="divide-y divide-gray-100">
            {CHALLENGES.map((item, i) => (
              <motion.div
                key={i}
                className="grid md:grid-cols-[64px_220px_1fr] gap-4 md:gap-8 py-10 items-start"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <span className="font-black text-gray-400 text-5xl leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 pt-1 leading-snug">
                  {item.label}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ブリッジ: 転換点 ── */}
      <section className="bg-[#0A0F1E] py-20 md:py-28 px-6 md:px-16 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            className="text-white/30 text-xs tracking-[0.4em] uppercase mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            That&apos;s where we come in.
          </motion.p>
          <div className="mb-0">
            <CharByChar
              lines={["We'll Clear That", "Roadblock With You."]}
              className="text-white font-extrabold leading-[1.04]"
              style={{ fontSize: "clamp(23px, 6vw, 80px)" }}
            />
          </div>
          <motion.p
            className="text-white/40 text-sm md:text-base mt-8 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            SOMA already has every piece you need for global expansion —
            strategy, local networks, and hands-on execution. Leave it all to
            us.
          </motion.p>
        </div>
      </section>

      {/* ── Part 2: Our Solution (dark) ── */}
      <section className="bg-[#0A0F1E] pt-4 pb-28 md:pb-40 px-6 md:px-16 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <SectionLabel text="Our Solution" light />

          <div className="mb-16">
            <CharByChar
              lines={["Three Ways We", "Take You Global"]}
              className="font-extrabold text-white leading-[0.96]"
              style={{ fontSize: "clamp(23px, 6vw, 80px)" }}
            />
          </div>

          {/* ソリューション: デスクトップ=横並びカード / モバイル=縦アコーディオン */}
          <div className="hidden md:block">
            <SolutionCards />
          </div>
          <div className="md:hidden">
            <MobileSolutionCards />
          </div>

          {/* 初期費用 ¥0 */}
          <motion.div
            className="bg-[#0d1526] border border-white/10 rounded-2xl p-10 md:p-16 text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-6">Cost Structure</p>
            <div className="flex items-end justify-center gap-3 mb-5">
              <span className="text-white font-extrabold text-2xl md:text-3xl">Upfront Cost</span>
              <span className="text-white font-black leading-none" style={{ fontSize: "clamp(72px, 13vw, 150px)" }}>¥0</span>
            </div>
            <p className="text-white/60 text-sm md:text-base mb-3">
              Most engagements are performance-based, so you can get started
              with zero upfront cost.
            </p>
            <p className="text-white/35 text-xs leading-relaxed max-w-xl mx-auto">
              *Pricing and terms vary depending on the service — overseas
              crowdfunding, Faire wholesale, cross-border e-commerce, and
              more. Please check the relevant service page for details, or
              feel free to contact us.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-7">
              <Link href="/crowdfunding" className="inline-flex items-baseline gap-1 text-[#0066FF] text-xs font-semibold hover:underline">
                Overseas Crowdfunding <JPBadgeDark /> →
              </Link>
              <Link href="/faire" className="inline-flex items-baseline gap-1 text-[#0066FF] text-xs font-semibold hover:underline">
                Faire Wholesale <JPBadgeDark /> →
              </Link>
              <Link href="/cross-border-ec" className="inline-flex items-baseline gap-1 text-[#0066FF] text-xs font-semibold hover:underline">
                Cross-Border E-Commerce <JPBadgeDark /> →
              </Link>
              <a href="#contact" className="text-white/70 text-xs font-semibold hover:text-white transition-colors">Contact Us →</a>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
