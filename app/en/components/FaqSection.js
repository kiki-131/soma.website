"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import WordByWord from "./WordByWord";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// S11 FAQ
//
// 各回答は「まず事実 → 最後の1文でSOMA」の順で書いてある。
// 前半だけが切り出されても事実として成立するため、AI検索での引用に耐える。
//
// ★FAQPage の JSON-LD は、この同じ配列から生成している。
//   構造化データにだけ存在する回答はガイドライン違反になるため、
//   可視テキストと完全一致させること。文言を変える場合は必ずここ1箇所で変える。
//
// ★料金の質問を空欄にしない。「Contact us」とだけ答えるのは
//   読者の信頼を最も強く損なうパターンなので、課金の「構造」を答えている。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const FAQS = [
  {
    q: "Do I need a Japanese company?",
    a: "Not to start, and not in every case. The platforms don't require the applicant to be a Japanese corporation as such. What they require is that the project can be operated in Japanese, that rewards ship within Japan, and that the seller disclosure under the Act on Specified Commercial Transactions shows a name, address and phone number in Japan. Some of that can be met without incorporating; some of it depends on the product, particularly where certification or importing is involved. We tell you which applies to yours at the eligibility check.",
  },
  {
    q: "Do I need a Japanese bank account?",
    a: "Japanese platforms settle funds to a Japanese bank account held in the project owner's name. There is no overseas payout option. How that account is held is part of the structure decided per project, and it's one of the first things we go through with you.",
  },
  {
    q: "Do I have to speak Japanese?",
    a: "You don't. The project does. The page, the platform review, the updates and the public comment thread all run in Japanese, daily, for the length of the campaign and beyond it. That workload is ours. We work with you in English.",
  },
  {
    q: "Who obtains the certifications (TELEC / PSE)?",
    a: "It splits. Technical Conformity certification under the Radio Act (技適 / TELEC) is granted against the product, and needs technical documentation and test samples only your engineers can produce. Under the Electrical Appliance and Material Safety Act, the business notification and the PSE marking obligation fall on the party that manufactures the goods or imports them into Japan, rather than on an overseas seller. We map which of these your product triggers and run the process; the technical inputs come from you.",
  },
  {
    q: "Who is the importer of record?",
    a: "It depends on the product and on how the launch is structured. Under Article 95 of the Customs Act, a non-resident carrying out customs procedures in Japan has to appoint a Customs Administrative Manager (税関事務管理人) resident in Japan and file that appointment with customs. Past that point, the right answer differs by product, certification and volume, and anyone who gives you a single answer before seeing your product is guessing. We'll tell you plainly what's realistic for yours — before you promise anyone anything.",
  },
  {
    q: "What is an ACP (税関事務管理人), and do I need one?",
    a: "税関事務管理人 — Customs Administrative Manager, often abbreviated ACP — is a person or company resident in Japan that a non-resident importer appoints to carry out customs procedures and receive notices on its behalf. The appointment is filed with the customs office on Customs Form C No. 7500. A revision that took effect on 1 October 2023 also requires the filing to state the relationship between the importer and the manager. Whether your launch involves you importing at all is the prior question, and that's part of what we work out with you.",
  },
  {
    q: "Who handles shipping and backer support in Japan?",
    a: "Rewards have to ship from inside Japan, and buyer questions have to be answered in Japanese. In practice that means domestic warehousing, a domestic dispatch operation, and someone on the comment thread daily. That part of the work we do in-house.",
  },
  {
    q: "How much does this cost?",
    a: "There's no list price, because the work isn't the same twice — the platform, the certifications a product triggers, and how much of the operation sits with us all move it. We quote after the eligibility check, once we know what your product actually requires. The check itself is free and commits you to nothing.",
  },
  {
    q: "What if my product isn't a fit?",
    a: "We say so. In phase 1 we decline cosmetics, supplements, beauty devices and medical devices, all regulated under the Pharmaceuticals and Medical Devices Act (薬機法). We'll also say no to anything else where we don't think a campaign is worth your time. A clear no in one business day is more useful to you than a proposal.",
  },
];

function FaqItem({ item, index, isOpen, onToggle }) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="border-b border-gray-200">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-start justify-between gap-6 text-left py-6 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] rounded"
        >
          <span className="text-gray-900 font-bold text-base md:text-lg leading-snug group-hover:text-[#0066FF] transition-colors">
            {item.q}
          </span>
          <span
            className="flex-shrink-0 text-[#0066FF] text-xl leading-none mt-0.5 select-none"
            aria-hidden="true"
          >
            {isOpen ? "−" : "+"}
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className="pb-7 pr-10"
      >
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section
      id="faq"
      data-bg="#F8F9FA"
      className="bg-[#F8F9FA] py-24 md:py-36 px-6 md:px-16 scroll-mt-20"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-3xl mx-auto">
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-px bg-[#0066FF]" />
          <span className="text-[#0066FF] text-xs font-bold tracking-[0.35em] uppercase">
            Questions we get
          </span>
        </motion.div>

        <div className="mb-12">
          <WordByWord
            lines={["Questions we get", "before the first call."]}
            className="font-extrabold text-gray-900 leading-[1.1]"
            style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
          />
        </div>

        <div className="border-t border-gray-200">
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
