"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import ProjectsSection from "./ProjectsSection";

export default function ServiceSection() {
  const challenges = [
    {
      title: "言葉・文化の壁",
      description: "海外市場の言語や文化の違いにより、現地ニーズの把握や効果的なコミュニケーションが困難",
      image: "/images/service/challenge-language.png"
    },
    {
      title: "現地パートナー探し",
      description: "現地での販売チャネルやマーケティングには現地パートナーが不可欠だが、信頼できる相手を見つけるのが難しい",
      image: "/images/service/challenge-partner.png"
    },
    {
      title: "法規制・手続き",
      description: "各国の法規制や輸出入手続きの複雑さが参入障壁に。思わぬ落とし穴も多い",
      image: "/images/service/challenge-legal.png"
    }
  ];

  const solutions = [
    {
      title: "SNS活用でファン獲得",
      description: "現地SNSを活用した戦略的なファンベース構築で、市場参入前から顧客との関係を構築",
      image: "/images/service/solution-sns.png"
    },
    {
      title: "低リスクなテストマーケティング",
      description: "クラウドファンディングを活用し、大量在庫リスクなしで市場性を検証",
      image: "/images/service/solution-crowdfunding.png"
    },
    {
      title: "継続的なサポート",
      description: "成功後の展開オプションで、さらなる収益拡大を目指します",
      image: "/images/service/solution-support.png"
    }
  ];

  const services = [
    {
      title: "事業計画",
      description: "市場調査から戦略立案まで、データに基づいた事業計画を策定",
      image: "/images/service/service-planning.png"
    },
    {
      title: "サイト作成",
      description: "魅力的なプロジェクトページや販売サイトを現地言語で制作",
      image: "/images/service/service-website.png"
    },
    {
      title: "運用代行",
      description: "SNSやプラットフォームの運用を現地事情に精通したチームが代行",
      image: "/images/service/service-operation.png"
    },
    {
      title: "顧客対応",
      description: "多言語での問い合わせ対応やコミュニティマネジメントを実施",
      image: "/images/service/service-customer.png"
    },
    {
      title: "発送サポート",
      description: "国際物流の手配から通関手続きまでワンストップでサポート",
      image: "/images/service/service-shipping.png"
    },
    {
      title: "プラットフォーム登録",
      description: "各種プラットフォームへの登録申請やアカウント管理を代行",
      image: "/images/service/service-registration.png"
    }
  ];

  const CardItem = ({ item, index, isChallenge }) => (
    <motion.div
      className="relative flex flex-col items-center text-center p-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* 課題の場合のみ薄い赤の丸角背景 */}
      {isChallenge && (
        <div className="absolute inset-0 bg-red-50 rounded-[32px] opacity-50 -z-10" />
      )}
      <div className="relative w-48 h-48 mb-4 group">
        <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-gray-800 group-hover:border-blue-600 transition-colors duration-300">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="192px"
          />
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
      <p className="text-sm text-gray-600 max-w-xs">{item.description}</p>
    </motion.div>
  );

  return (
    <>
      {/* パート1: 課題とソリューション (波形背景) */}
      <section className="relative bg-white py-20 px-8 overflow-visible">
        {/* セクション冒頭 */}
        <div className="relative z-10 max-w-4xl mx-auto mb-20">
          <motion.h1
            className="text-5xl font-bold mb-6 text-center text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Services
          </motion.h1>
          <motion.p
            className="text-lg text-center text-gray-700 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            日本の中小企業の海外進出を、確実な成果へと導くトータルサポート。クラウドファンディングとSNSを活用し、低リスクで世界市場へ進出できます。
          </motion.p>
        </div>

        {/* 波形SVG背景 (Optemo風) */}
        <div className="absolute inset-0 pointer-events-none overflow-visible -z-10">
          <svg
            className="absolute bottom-0 w-full h-auto"
            viewBox="0 0 1440 600"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,450 C240,500 480,400 720,450 C960,500 1200,400 1440,450 L1440,600 L0,600 Z"
              fill="#0066FF"
              opacity="0.8"
            />
            <ellipse
              cx="300"
              cy="250"
              rx="200"
              ry="200"
              fill="#E6F0FF"
              opacity="0.5"
            />
            <ellipse
              cx="1100"
              cy="300"
              rx="250"
              ry="250"
              fill="#E6F0FF"
              opacity="0.4"
            />
          </svg>
        </div>
        
        <div className="relative z-10">
          {/* 課題 */}
          <div className="relative max-w-7xl mx-auto mb-32">
            <motion.h2
              className="text-4xl font-bold mb-4 text-center text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              海外進出を阻む3つの壁
            </motion.h2>
            <motion.p
              className="text-center text-gray-600 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              多くの日本企業が海外進出で直面する課題
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {challenges.map((item, i) => (
                <CardItem key={i} item={item} index={i} isChallenge={true} />
              ))}
            </div>
            <motion.div
              className="flex justify-center mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <FaArrowDown className="text-5xl text-blue-600 animate-bounce" />
            </motion.div>
          </div>

          {/* ソリューション */}
          <div className="relative max-w-7xl mx-auto">
            {/* ソリューション用の波型背景 */}
            <div className="absolute inset-0 pointer-events-none overflow-visible -z-10">
              <svg
                className="absolute bottom-0 left-0 w-full h-auto"
                viewBox="0 0 1440 400"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0,250 C240,300 480,200 720,250 C960,300 1200,200 1440,250 L1440,400 L0,400 Z"
                  fill="#0066FF"
                  opacity="0.6"
                />
                {/* 大きい水色の丸 */}
                <circle
                  cx="320"
                  cy="120"
                  r="140"
                  fill="#E6F0FF"
                  opacity="0.6"
                />
                {/* 小さい水色の丸 */}
                <circle
                  cx="1120"
                  cy="140"
                  r="90"
                  fill="#E6F0FF"
                  opacity="0.5"
                />
              </svg>
            </div>
            
            <motion.h2
              className="text-4xl font-bold mb-4 text-center text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              私たちのソリューション
            </motion.h2>
            <motion.p
              className="text-center text-gray-600 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              課題を解決する3つのアプローチ
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {solutions.map((item, i) => (
                <CardItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* パート2: Projects + サポート詳細 */}
      <section className="relative bg-white py-20 overflow-hidden">
        {/* 波形SVG背景 (下部) */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute top-0 w-full h-auto"
            viewBox="0 0 1440 600"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,150 C240,100 480,200 720,150 C960,100 1200,200 1440,150 L1440,0 L0,0 Z"
              fill="#F0F9FF"
              opacity="0.7"
            />
            <ellipse
              cx="200"
              cy="450"
              rx="180"
              ry="180"
              fill="#DBEAFE"
              opacity="0.4"
            />
            <ellipse
              cx="1200"
              cy="500"
              rx="200"
              ry="200"
              fill="#DBEAFE"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* Projects */}
        <div className="max-w-7xl mx-auto px-8 mb-32 relative z-10">
          <ProjectsSection />
        </div>

        {/* サポート詳細 */}
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-4 text-center text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            ワンストップでサポート
          </motion.h2>
          <motion.p
            className="text-center text-gray-600 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            企画から実行まで、すべてをお任せください
          </motion.p>
          
          {/* ハニカム構造 (ダイヤモンド型配置) */}
          <div className="relative max-w-6xl mx-auto py-16">
            {/* ダイヤモンド型背景 */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible -z-10">
              <div className="w-[1000px] h-[1000px] bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100 opacity-60 transform rotate-45 rounded-[80px]" />
            </div>
            
            {/* 1段目: 2個 */}
            <div className="relative z-10 flex justify-center gap-24 mb-6">
              <CardItem item={services[0]} index={0} />
              <CardItem item={services[1]} index={1} />
            </div>
            
            {/* 2段目: 2個 (左右にずらして配置) */}
            <div className="relative z-10 flex justify-center gap-80 mb-6">
              <CardItem item={services[2]} index={2} />
              <CardItem item={services[3]} index={3} />
            </div>
            
            {/* 3段目: 2個 */}
            <div className="relative z-10 flex justify-center gap-24">
              <CardItem item={services[4]} index={4} />
              <CardItem item={services[5]} index={5} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
