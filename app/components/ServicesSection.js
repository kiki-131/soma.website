"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import CharByChar from "./CharByChar";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// コンテンツ定義 — ここを編集してコンテンツを差し替えてください
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CHALLENGES = [
  {
    label: "言語・文化の壁",
    body: "商品の魅力を現地の言語と文化で正確に伝えることは、思った以上に難しい。直訳では伝わらないニュアンスが、購買意欲を左右します。",
  },
  {
    label: "信頼できるパートナー探し",
    body: "現地の販路・SNS・物流を動かすには、信頼できる現地パートナーが必須。しかし見つけ方がわからず、そこで止まってしまう企業が多い。",
  },
  {
    label: "複雑な法規制と手続き",
    body: "国ごとに異なる輸出入規制・知的財産・税制。一つのミスが大きな損失につながることも。専門知識なしに踏み込むにはリスクが高すぎる。",
  },
  {
    label: "初期投資とリスクの重さ",
    body: "在庫を抱えて海外に打って出るには、大きな先行投資が必要。成功するかどうかわからない段階で、そのリスクを取れる企業は多くない。",
  },
];

const SOLUTIONS = [
  {
    number: "01",
    label: "戦略立案・市場調査",
    body: "現地市場のデータを分析し、ターゲット・訴求・プライシングを設計。「なんとなく海外展開」ではなく、勝ち筋を明確にしてから動きます。",
    image: "/images/naito_strategy2.jpg",
  },
  {
    number: "02",
    label: "クラウドファンディングで\nリスクゼロのテスト販売",
    body: "Kickstarter・Indiegogo・zeczecを活用し、在庫を持たずに市場の反応を確認。売れると分かってから本格展開するため、初期リスクを最小化できます。",
    link: "/crowdfunding",
    image: "/images/stock_crowdfunding.jpg",
  },
  {
    number: "03",
    label: "現地パートナー\nネットワーク",
    body: "SNS運用・現地PR・物流まで、SOMAが持つ現地パートナーネットワークをそのまま活用。ゼロから探す時間とコストを大幅に削減します。",
    image: "/images/stock_handshake.jpg",
  },
  {
    number: "04",
    label: "ワンストップ実行支援",
    body: "翻訳・ページ制作・広告運用・顧客対応・発送まで、すべてSOMAが代行。御社はコアビジネスに集中しながら、海外展開を同時進行できます。",
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

// 初期費用¥0 グロー＋パルスボックス
function CostBox() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative border rounded-2xl p-10 md:p-16 text-center mb-20 cursor-default overflow-hidden"
      style={{
        borderColor: isHovered ? "rgba(0,102,255,0.5)" : "rgba(255,255,255,0.1)",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        boxShadow: isHovered
          ? "0 0 40px rgba(0,102,255,0.2), 0 0 80px rgba(0,102,255,0.08), inset 0 0 40px rgba(0,102,255,0.06)"
          : "none",
      }}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 背景グロー */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(0,102,255,0.12) 0%, transparent 70%)" }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <p className="text-white/30 text-xs tracking-widest uppercase mb-6">Cost Structure</p>
      <div className="flex items-end justify-center gap-3 mb-4">
        <span className="text-white font-extrabold text-2xl md:text-3xl">初期費用</span>
        <motion.span
          className="font-black leading-none"
          style={{ fontSize: "clamp(80px, 14vw, 160px)" }}
          animate={isHovered
            ? { scale: [1, 1.06, 1], color: ["#ffffff", "#4d9eff", "#ffffff"] }
            : { scale: 1, color: "#ffffff" }
          }
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          ¥0
        </motion.span>
      </div>
      <p className="text-white/45 text-sm mb-2">
        成果報酬として集まった支援金の{" "}
        <span className="text-white font-bold">5％〜20％</span> を手数料としていただきます
      </p>
      <p className="text-white/25 text-xs">
        ※適用には条件があります。広告・プロモーション費用は別途。
      </p>
    </motion.div>
  );
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
              {item.link && (
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-1.5 text-[#0066FF] text-xs font-semibold"
                >
                  詳しく見る <span>→</span>
                </Link>
              )}
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
              {item.link && (
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-1.5 text-[#0066FF] text-xs font-semibold mt-3"
                >
                  詳しく見る <span>→</span>
                </Link>
              )}
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
              lines={["海外進出、", "こんな壁に", "ぶつかって", "いませんか？"]}
              className="font-extrabold text-gray-900 leading-[0.88]"
              style={{ fontSize: "clamp(48px, 9vw, 104px)" }}
            />
          </div>

          <motion.p
            className="text-gray-400 text-base md:text-lg mb-20 max-w-xl leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            多くの日本企業が、海外展開の最初の一歩でつまずきます。
            その原因は、ほぼ共通しています。
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
              lines={["その壁を、", "SOMAが", "一緒に越えます。"]}
              className="text-white font-extrabold leading-[1.0]"
              style={{ fontSize: "clamp(36px, 6.5vw, 80px)" }}
            />
          </div>
          <motion.p
            className="text-white/40 text-sm md:text-base mt-8 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            海外展開に必要なすべてのピースを、SOMAはすでに持っています。
            <br />
            戦略・現地ネットワーク・実行力——まとめてお任せください。
          </motion.p>
        </div>
      </section>

      {/* ── Part 2: Our Solution (dark) ── */}
      <section className="bg-[#0A0F1E] pt-4 pb-28 md:pb-40 px-6 md:px-16 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <SectionLabel text="Our Solution" light />

          <div className="mb-16">
            <CharByChar
              lines={["SOMAの", "4つの", "アプローチ"]}
              className="font-extrabold text-white leading-[0.88]"
              style={{ fontSize: "clamp(48px, 9vw, 104px)" }}
            />
          </div>

          {/* ソリューション: デスクトップ=横並びカード / モバイル=縦アコーディオン */}
          <div className="hidden md:block">
            <SolutionCards />
          </div>
          <div className="md:hidden">
            <MobileSolutionCards />
          </div>

          {/* 初期費用0円 */}
          <CostBox />

        </div>
      </section>
    </>
  );
}
