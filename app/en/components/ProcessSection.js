"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import WordByWord from "./WordByWord";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// S9 プロセス
//
// ★アコーディオンにしないこと。プレゼン後に再訪した読者が
//   スクリーンショットで社内共有する主要ブロックのため、閉じていると用をなさない。
//
// ★所要期間は①以外「商品による」と正直に書く。架空の週数を置かない。
//   会期日数もプラットフォームや案件で変わるため断定していない。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const DEPENDS = "Depends on the product";

const STEPS = [
  {
    number: "01",
    title: "Eligibility check",
    duration: "1 business day",
    durationHighlight: true,
    body: "Send us the product and we tell you which category it lands in, what certification it triggers, and whether we think it should go to Japan at all. Sometimes the answer is no.",
    you: "Send a product page, spec sheet or existing campaign link.",
    us: "A written read on category, regulation and fit, within one business day.",
  },
  {
    number: "02",
    title: "Product & platform decision",
    duration: DEPENDS,
    body: "Which SKU goes first, which platform it goes on, what the campaign is meant to prove, and what the price and reward structure should look like for a Japanese buyer.",
    you: "Pricing, margins, production capacity, what you want out of Japan.",
    us: "Platform recommendation, reward structure, and a Japan-side price built for the local market rather than converted from your USD price.",
  },
  {
    number: "03",
    title: "Certification & structure",
    duration: DEPENDS,
    body: "The two things that decide whether a launch date is real: what has to be certified, and who stands where. This is where 05, 06 and the two floor items get designed for your specific product.",
    you: "Technical documentation, samples, factory contact.",
    us: "Certification mapping and process management, and a structure proposal we walk you through line by line before anything is signed.",
  },
  {
    number: "04",
    title: "Page & assets",
    duration: DEPENDS,
    body: "The page is built in Japanese from the product up. Photography and video are shot or re-directed for a Japanese audience. The application goes in and the review begins.",
    you: "Product, materials, and answers to questions from our writers.",
    us: "Japanese copy, art direction, page build, application, review handling.",
  },
  {
    number: "05",
    title: "Live campaign",
    duration: "For the full run",
    body: "Launch timing, PR and paid distribution, project updates, and the comment thread answered daily in Japanese.",
    you: "Production and shipping schedule, and quick answers when a buyer asks something only you can answer.",
    us: "Everything that happens in Japanese, every day, for the full run.",
  },
  {
    number: "06",
    title: "After the campaign",
    duration: "Depends on the result",
    body: "A campaign is an entrance, not an exit. You now have a sales record in yen, Japanese-language assets, and a compliance and fulfillment trail. Those are the three things a retailer, an EC platform or a distributor asks for first.",
    you: "A decision on how far you want to take Japan.",
    us: "Introductions and the next-stage plan — retail, EC, distributors.",
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      data-bg="#FAF9F7"
      className="bg-paper-50 px-6 md:px-10 lg:px-16 py-[96px] md:py-[144px] scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-px bg-accent-600" />
          <span className="text-accent-600 text-xs font-semibold tracking-[0.08em] uppercase">
            How it works
          </span>
        </motion.div>

        <div className="mb-16">
          <WordByWord
            lines={[
              "Six steps. We're honest about",
              "which ones we can put a clock on.",
            ]}
            className="font-medium text-ink-900 leading-[1.08] tracking-[-0.020em]"
            style={{ fontSize: "clamp(27px, 3.2vw, 42px)" }}
          />
        </div>

        {/* 縦タイムライン（常時展開） */}
        <div className="relative w-full aspect-[21/9] overflow-hidden mb-16 -mx-6 md:-mx-10 lg:-mx-16 w-auto">
          <Image
            src="/images/packing_hands.jpg"
            alt="Hands packing a parcel for dispatch"
            fill
            className="object-cover object-center [filter:saturate(0.86)_contrast(1.05)_brightness(0.98)]"
            sizes="100vw"
            loading="lazy"
          />
        </div>

        <ol className="relative border-l-2 border-paper-200 ml-4 md:ml-6">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.number}
              className="relative pl-8 md:pl-12 pb-14 last:pb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              {/* 番号ドット */}
              <span
                className="absolute -left-[15px] top-0 flex items-center justify-center w-7 h-7 rounded-[2px] bg-accent-600 text-white text-[11px] font-medium"
                aria-hidden="true"
              >
                {step.number}
              </span>

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4">
                <h3 className="font-medium text-ink-900 text-lg md:text-xl">
                  {step.title}
                </h3>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    step.durationHighlight
                      ? "bg-accent-600 text-white"
                      : "bg-paper-200 text-ink-700"
                  }`}
                >
                  {step.duration}
                </span>
              </div>

              <p className="text-ink-700 text-sm md:text-base leading-relaxed mb-6">
                {step.body}
              </p>

              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 border-t border-paper-200 pt-5">
                <div>
                  <dt className="text-[10px] font-semibold tracking-[0.08em] uppercase text-ink-500 mb-2">
                    You
                  </dt>
                  <dd className="text-ink-700 text-sm leading-relaxed">
                    {step.you}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold tracking-[0.08em] uppercase text-accent-600 mb-2">
                    Us
                  </dt>
                  <dd className="text-ink-700 text-sm leading-relaxed">
                    {step.us}
                  </dd>
                </div>
              </dl>
            </motion.li>
          ))}
        </ol>

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
            Start with step 1 — it&apos;s free
          </a>
        </motion.div>
      </div>
    </section>
  );
}
