"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CharByChar from "./CharByChar";

const teamMembers = [
  {
    src: "/images/naito_front.jpg",
    alt: "CEO Takuma Naito",
    name: "Takuma Naito",
    role: "CEO",
    bio: "サンフランシスコの大学でホスピタリティマネジメントを専攻・卒業。米国企業でマネージャーを経験後、帰国しSOMA LLCを設立。クラウドファンディングを活用し、日本と海外を繋ぐサポートを行う。",
  },
  {
    src: "/images/inoue_front.png",
    alt: "COO Tatsuya Inoue",
    name: "Tatsuya Inoue",
    role: "COO",
    bio: "大学卒業後、英国ケンブリッジへ留学。帰国後はリフォーム業・通信会社での営業を経て独立。サウスオブマーケット合同会社にて海外クラウドファンディング事業の営業責任者を務め、取締役に就任。",
  },
  {
    src: "/images/takata_front.jpg",
    alt: "CMO Sho Takata",
    name: "Sho Takata",
    role: "CMO",
    bio: "早稲田大学卒業後、大手通信会社でtoC/toB営業を経て事業戦略企画マネジメントを担当。グロービス経営大学院でMBAを取得し、マーケティング・プロモーション責任者として取締役に就任。",
  },
];

function SectionLabel({ text, delay = 0 }) {
  return (
    <motion.div
      className="flex items-center gap-4 mb-8"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="w-10 h-px bg-[#0066FF]" />
      <span className="text-[#0066FF] text-xs font-bold tracking-[0.35em] uppercase">
        {text}
      </span>
    </motion.div>
  );
}

export default function AboutUsSection() {
  return (
    <section
      id="about-us"
      className="bg-white py-28 md:py-40 px-6 md:px-16 overflow-hidden font-sans"
    >
      <div className="max-w-5xl mx-auto">

        {/* ─── Mission ─── */}
        <SectionLabel text="About Us" />

        <div className="mb-14">
          <CharByChar
            lines={["Our", "Mission"]}
            className="font-extrabold text-gray-900 leading-[0.9]"
            style={{ fontSize: "clamp(64px, 11vw, 128px)" }}
          />
        </div>

        <motion.div
          className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500 font-extrabold leading-tight mb-16"
          style={{ fontSize: "clamp(22px, 4vw, 52px)" }}
          initial={{ opacity: 0, scale: 0.93 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          誰もが手軽に海外展開できる
          <br />
          世界を創る
        </motion.div>

        {/* 会社説明 2カラム */}
        <div className="grid md:grid-cols-2 gap-10 mb-28">
          <motion.p
            className="text-gray-600 leading-relaxed text-base"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            SOMA株式会社は &quot;Solutions for Outbound Market
            Ambitions&quot;（海外市場志向へのソリューション）を企業理念として設立されました。
            この名前には、企業やブランドが国境を越え、世界市場での成功を目指すためのパートナーとなるという私たちの使命が込められています。
            <br />
            <br />
            グローバル市場への進出は、多くのチャンスを秘めていますが、同時に文化・規制・競争環境など多岐にわたる課題を伴います。SOMA株式会社は、それらの課題を乗り越え、クライアントが自信を持って世界に挑戦できるよう、戦略的かつ実践的なサポートを提供します。
          </motion.p>
          <motion.p
            className="text-gray-600 leading-relaxed text-base"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.28 }}
          >
            さらに近年注目を集めるメタバース分野にも取り組み、デジタル技術を活用した革新的な展示会やイベントを通じて、新しい市場と可能性を開拓しています。リアルとバーチャルの境界を超える取り組みにより、クライアントのグローバルプレゼンスを最大化します。
            <br />
            <br />
            私たちは、企業の志（Ambitions）を実現するためのソリューション（Solutions）を提供し、共に成長し続けるパートナーとして歩みます。
          </motion.p>
        </div>

        {/* ─── 事業内容 / 沿革 ─── */}
        <div className="grid md:grid-cols-2 gap-6 mb-28">
          <motion.div
            className="border border-gray-100 rounded-2xl p-8 hover:shadow-md transition-shadow"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-5">事業内容</h3>
            <ul className="text-gray-600 space-y-3">
              {[
                "海外進出コンサルティング",
                "クラウドファンディング業務委託",
                "EC運営代行",
                "デジタルマーケティング",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="border border-gray-100 rounded-2xl p-8 hover:shadow-md transition-shadow"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-5">沿革</h3>
            <ul className="text-gray-600 space-y-3">
              {[
                { year: "2019", text: "サウスオブマーケット合同会社設立" },
                { year: "2025", text: "SOMA株式会社に社名変更" },
                {
                  year: "2026",
                  text: "B to B プラットフォーム「METAEXPO JAPAN」開業（予定）",
                },
              ].map(({ year, text }) => (
                <li key={year} className="flex items-start gap-3">
                  <span className="text-[#0066FF] font-bold text-sm mt-0.5 flex-shrink-0">
                    {year}
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ─── Team ─── */}
        <SectionLabel text="Our Team" delay={0.05} />

        <motion.p
          className="text-gray-500 text-sm mb-14 max-w-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          グローバルな経験を持つ専門家チームが、
          <br />
          あなたの海外進出を全力でサポートします。
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.14 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 bg-gray-50 mx-auto" style={{ width: 208, height: 208 }}>
                <Image
                  src={member.src}
                  alt={member.alt}
                  fill
                  className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="flex items-baseline gap-3 mb-1">
                <h4 className="font-bold text-gray-900 text-lg">{member.name}</h4>
                <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">
                  {member.role}
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
