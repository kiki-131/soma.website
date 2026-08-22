"use client";
import { motion } from "framer-motion";
import WordByWord from "./WordByWord";

// キャンペーンが残す3つの資産。日本の流通が取引口座を開く前に必ず要求するもの。
// 03 は S3 GroupB / S5 対応表への伏線。ここで「法令クリアの証跡」を
// 価値として先に立てておくと、壁が「障害」ではなく
// 「これから手に入れる資産の要件リスト」としても読めるようになる。
const ASSETS = [
  {
    number: "01",
    title: "A real sales record",
    body: "Units sold in yen to Japanese customers, with names and shipping addresses attached. Not survey interest. Orders.",
  },
  {
    number: "02",
    title: "Japanese content and Japanese voices",
    body: "A product page written in Japanese, photography and video shot for a Japanese buyer, and comments and reviews from Japanese customers you can quote later.",
  },
  {
    number: "03",
    title: "A compliance and fulfillment trail",
    body: "Certification on file, labeling done, and a record of orders shipped and supported from inside Japan.",
  },
];

function DeadlockDiagram() {
  return (
    <div className="relative border border-gray-200 rounded-2xl bg-white p-8 md:p-10">
      <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-gray-500 mb-8">
        The deadlock
      </p>

      {/* 2ノード + 円環。モバイルは縦、デスクトップは横 */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6 mb-8">
        <div className="flex-1 border border-gray-200 rounded-xl px-6 py-5 text-center bg-[#F8F9FA]">
          <p className="text-gray-900 font-bold text-sm md:text-base leading-snug">
            No Japanese sales record
          </p>
        </div>

        <div
          className="flex md:flex-col items-center justify-center gap-1 text-[#0066FF] text-lg font-bold select-none flex-shrink-0"
          aria-hidden="true"
        >
          <span className="md:rotate-0 rotate-90">→</span>
          <span className="md:rotate-0 rotate-90">←</span>
        </div>

        <div className="flex-1 border border-gray-200 rounded-xl px-6 py-5 text-center bg-[#F8F9FA]">
          <p className="text-gray-900 font-bold text-sm md:text-base leading-snug">
            Japanese retail won&apos;t open an account
          </p>
        </div>
      </div>

      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
        Japanese retailers, EC platforms and wholesalers ask for the same thing
        before they will open a trading account: evidence that the product
        already sells in Japan. You can&apos;t produce that evidence without
        being on sale. You can&apos;t get on sale without the evidence. The loop
        closes on itself.
      </p>
    </div>
  );
}

export default function WhyJapanSection() {
  return (
    <section
      id="why-japan"
      data-bg="#FFFFFF"
      className="bg-white py-24 md:py-36 px-6 md:px-16 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-px bg-[#0066FF]" />
          <span className="text-[#0066FF] text-xs font-bold tracking-[0.35em] uppercase">
            What a campaign is actually for
          </span>
        </motion.div>

        <div className="mb-14">
          <WordByWord
            lines={[
              "Crowdfunding in Japan is not a way to raise money.",
              "It is a way to test the market before you commit inventory to it.",
            ]}
            className="font-extrabold text-gray-900 leading-[1.15]"
            style={{ fontSize: "clamp(26px, 3.6vw, 46px)" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <DeadlockDiagram />
        </motion.div>

        <motion.p
          className="text-gray-900 text-base md:text-lg font-medium leading-relaxed my-14 max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          A campaign is the one entry point that breaks the loop before you own a
          single unit of Japanese inventory.
        </motion.p>

        {/* CFが残す3資産 */}
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-gray-500 mb-8">
          What a campaign leaves you holding
        </p>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {ASSETS.map((item, i) => (
            <motion.div
              key={item.number}
              className="border-t-2 border-[#0066FF] pt-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-[#0066FF] font-black text-2xl leading-none mb-3">
                {item.number}
              </div>
              <h3 className="text-gray-900 font-bold text-base mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-gray-900 text-base md:text-lg font-medium leading-relaxed mt-12 max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Japanese distribution asks for all three before it opens an account. A
          campaign is where you make them.
        </motion.p>

        {/* 実績を必要とせずに専門性を証明する最短経路。視覚的に浮かせる */}
        <motion.div
          className="mt-20 border-2 border-[#0A0F1E] rounded-2xl p-8 md:p-10 bg-[#F8F9FA]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#0A0F1E] mb-5">
            ⚠ One thing to unlearn
          </p>
          <p className="text-gray-800 text-base md:text-lg leading-relaxed">
            In Japan the people who buy are not backers. The category is called{" "}
            <span className="font-semibold">応援購入</span> (ōen kōnyū) —
            &ldquo;supportive purchase&rdquo; — and in practice it is a
            pre-order, not a pledge. A three-month delay or a late spec change
            reads on Kickstarter as part of the adventure. Here it reads as a
            seller failing to deliver what was sold, and it stays in the public
            comment thread under your project, permanently.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
