"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutUsSection() {
  return (
    <section id="about-us" className="bg-[#FAF9F6] py-20 px-8 md:px-16 font-sans">
      {/* Vision */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >


        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gray-800">
          About us
        </h2>

{/* ✅ ① Missionを追加：About us の後に配置、少し強調 */}
<div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500 font-bold text-xl md:text-5xl p-4">
  誰もが手軽に海外展開できる世界を創る
</div>

        {/* ✅ ② 左揃え & 幅を少し広げた会社紹介文 */}
        <p className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed text-left">
          SOMA株式会社は &quot;Solutions for Outbound Market Ambitions&quot;
          （海外市場志向へのソリューション）を企業理念として設立されました。
          この名前には、企業やブランドが国境を越え、
          世界市場での成功を目指すためのパートナーとなるという
          私たちの使命が込められています。
          <br /><br />
          グローバル市場への進出は、多くのチャンスを秘めていますが、
          同時に文化・規制・競争環境など多岐にわたる課題を伴います。
          SOMA株式会社は、それらの課題を乗り越え、
          クライアントが自信を持って世界に挑戦できるよう、
          戦略的かつ実践的なサポートを提供します。
          <br /><br />
          さらに近年注目を集めるメタバース分野にも取り組み、
          デジタル技術を活用した革新的な展示会やイベントを通じて、
          新しい市場と可能性を開拓しています。
          リアルとバーチャルの境界を超える取り組みにより、
          クライアントのグローバルプレゼンスを最大化します。
          <br /><br />
          私たちは、企業の志（Ambitions）を実現するための
          ソリューション（Solutions）を提供し、
          共に成長し続けるパートナーとして歩みます。
        </p>
      </motion.div>

      {/* Company Overview + History */}
      <div className="grid grid-cols-2 md:flex md:flex-row mb-16 gap-2 md:gap-12">
        {/* Company Overview */}
        <motion.div
          className="md:w-1/2 bg-white p-2 md:p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-sm md:text-2xl font-bold mb-2 md:mb-4 text-gray-800">
            事業内容
          </h3>
          <ul className="text-[9px] md:text-base text-gray-700 list-disc list-inside space-y-1 md:space-y-2">
            <li>海外進出コンサルティング</li>
            <li>クラウドファンディング業務委託</li>
            <li>EC運営代行</li>
            <li>デジタルマーケティング</li>
          </ul>
        </motion.div>

        {/* History */}
        <motion.div
          className="md:w-1/2 bg-white p-2 md:p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-sm md:text-2xl font-bold mb-2 md:mb-4 text-gray-800">沿革</h3>
          <ul className="text-[9px] md:text-base text-gray-700 list-disc list-inside space-y-1 md:space-y-2">
            <li>2025年：SOMA株式会社に社名変更</li>
            <li>2026年：海外展開をDXで実現する、B to B のプラットフォーム「METAEXPO JAPAN」開業（予定）</li>
          </ul>
        </motion.div>
      </div>

      {/* Team */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
          Our Team
        </h3>

        <div className="grid grid-cols-3 md:flex md:flex-row justify-center gap-2 md:gap-8">
          {/* CEO */}
          <motion.div
            className="bg-white rounded-xl shadow-md p-2 md:p-4 max-w-xs"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/images/naito.jpg"
              alt="CEO"
              width={400}
              height={192}
              className="w-full h-20 md:h-48 object-contain bg-white rounded-lg mb-1 md:mb-4"
            />
            <h4 className="font-semibold text-[10px] md:text-xl">内藤 拓馬</h4>
            <p className="text-[8px] md:text-base text-gray-500 mb-1 md:mb-2">CEO</p>
            {/* ✅ 改行を整理 */}
            <p className="text-gray-700 text-[7px] md:text-sm leading-tight md:leading-relaxed">
              サンフランシスコの大学でホスピタリティマネジメントを専攻・卒業。米国企業でマネージャーを経験後、帰国し、
              コンサルティング会社・ブライダル会社・大手通信会社を経てSOMA LLCを設立。
              クラウドファンディングを活用し、日本と海外を繋ぐサポートを行う。
            </p>
          </motion.div>

          {/* COO */}
          <motion.div
            className="bg-white rounded-xl shadow-md p-2 md:p-4 max-w-xs"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/images/inoue.jpg"
              alt="COO"
              width={400}
              height={192}
              className="w-full h-20 md:h-48 object-contain bg-white rounded-lg mb-1 md:mb-4"
            />
            <h4 className="font-semibold text-[10px] md:text-xl">井上 龍也</h4>
            <p className="text-[8px] md:text-base text-gray-500 mb-1 md:mb-2">COO</p>
            <p className="text-gray-700 text-[7px] md:text-sm leading-tight md:leading-relaxed">
              大学卒業後、英国ケンブリッジへ留学。帰国後はリフォーム業・通信会社での営業を経て独立し、飲食店を経営。
              その後、サウスオブマーケット合同会社にて海外クラウドファンディング事業の営業責任者を務め、取締役に就任。
            </p>
          </motion.div>

          {/* CMO */}
          <motion.div
            className="bg-white rounded-xl shadow-md p-2 md:p-4 max-w-xs"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/images/takata.jpg"
              alt="CMO"
              width={400}
              height={192}
              className="w-full h-20 md:h-48 object-contain bg-white rounded-lg mb-1 md:mb-4"
            />
            <h4 className="font-semibold text-[10px] md:text-xl">高田 翔</h4>
            <p className="text-[8px] md:text-base text-gray-500 mb-1 md:mb-2">CMO</p>
            <p className="text-gray-700 text-[7px] md:text-sm leading-tight md:leading-relaxed">
              早稲田大学卒業後、大手通信会社でtoC/toB営業を経て、事業戦略企画マネジメントを担当。
              グロービス経営大学院でMBAを取得。
              現在はマーケティング施策およびプロモーション責任者として取締役に就任。
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
