"use client";
import Image from "next/image";
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
    <div className="relative border border-paper-200 rounded-none bg-white p-8 md:p-10">
      <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-ink-500 mb-8">
        The deadlock
      </p>

      {/* 2ノード + 円環。モバイルは縦、デスクトップは横 */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6 mb-8">
        <div className="flex-1 border border-paper-200 rounded-none px-6 py-5 text-center bg-paper-50">
          <p className="text-ink-900 font-semibold text-sm md:text-base leading-snug">
            No Japanese sales record
          </p>
        </div>

        <div
          className="flex md:flex-col items-center justify-center gap-1 text-accent-600 text-lg font-semibold select-none flex-shrink-0"
          aria-hidden="true"
        >
          <span className="block h-px w-8 bg-ink-400 md:w-px md:h-8" /><span className="block h-px w-8 bg-ink-400 md:w-px md:h-8" />
        </div>

        <div className="flex-1 border border-paper-200 rounded-none px-6 py-5 text-center bg-paper-50">
          <p className="text-ink-900 font-semibold text-sm md:text-base leading-snug">
            Japanese retail won&apos;t open an account
          </p>
        </div>
      </div>

      <p className="text-ink-700 text-sm md:text-base leading-relaxed">
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
      className="bg-paper-0 scroll-mt-20"
    >
      {/* 日本の小売の棚。「あなたの製品がここに並ぶ」を写真で言う。
          角丸も影も付けず、左右を裁ち落として面として置く */}
      <div className="relative w-full h-[42vh] min-h-[280px] md:h-[56vh] overflow-hidden">
        <Image
          src="/images/retail_shelf_japan.jpg"
          alt="A shelf in a Japanese store, packed with products and Japanese price tags"
          fill
          className="object-cover object-center [filter:saturate(0.86)_contrast(1.05)_brightness(0.98)]"
          sizes="100vw"
          loading="lazy"
        />
      </div>

      <div className="max-w-[1080px] mx-auto px-6 md:px-10 lg:px-16 py-[96px] md:py-[144px]">
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-px bg-accent-600" />
          <span className="text-accent-600 text-xs font-semibold tracking-[0.08em] uppercase">
            What a campaign is actually for
          </span>
        </motion.div>

        <div className="mb-14">
          <WordByWord
            lines={[
              "Crowdfunding in Japan is not a way to raise money.",
              "It is a way to test the market before you commit inventory to it.",
            ]}
            className="font-medium text-ink-900 leading-[1.08] tracking-[-0.020em]"
            style={{ fontSize: "clamp(27px, 3.2vw, 42px)" }}
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
          className="text-ink-900 text-base md:text-lg font-medium leading-relaxed my-14 max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          A campaign is the one entry point that breaks the loop before you own a
          single unit of Japanese inventory.
        </motion.p>

        {/* CFが残す3資産 */}
        <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-ink-500 mb-8">
          What a campaign leaves you holding
        </p>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {ASSETS.map((item, i) => (
            <motion.div
              key={item.number}
              className="border-t-2 border-accent-600 pt-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-accent-600 font-medium text-2xl leading-none mb-3">
                {item.number}
              </div>
              <h3 className="text-ink-900 font-semibold text-base mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-ink-700 text-sm leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-ink-900 text-base md:text-lg font-medium leading-relaxed mt-12 max-w-2xl"
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
          className="mt-20 border-2 border-ink-900 rounded-none p-8 md:p-10 bg-paper-50"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-ink-900 mb-5">
            One thing to unlearn
          </p>
          <p className="text-ink-800 text-base md:text-lg leading-relaxed">
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
