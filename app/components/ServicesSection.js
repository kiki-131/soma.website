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
      description: "信頼できる現地パートナーの発掘と関係構築に時間とコストがかかる",
      image: "/images/service/challenge-partner.png"
    },
    {
      title: "法規制・手続き",
      description: "各国の法規制や輸出入手続きの複雑さが参入障壁に",
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
      description: "プロジェクト開始から販売後まで、全フェーズで伴走型サポート",
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

  const CardItem = ({ item, index }) => (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
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
      {/* パート1: 課題とソリューション (大きな円形背景) */}
      <section className="relative bg-white py-20 px-8 overflow-hidden">
        {/* 大きな円形グラデーション背景 (左上青→右下赤、画面から大きく見切れる) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250vw] h-[250vw] rounded-full bg-gradient-to-br from-blue-400 to-red-400 opacity-15 pointer-events-none" />
        
        <div className="relative z-10">
          {/* 課題 */}
          <div className="max-w-7xl mx-auto mb-32">
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
                <CardItem key={i} item={item} index={i} />
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
          <div className="max-w-7xl mx-auto">
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
      <section className="bg-white py-20">
        {/* Projects */}
        <div className="max-w-7xl mx-auto px-8 mb-32">
          <ProjectsSection />
        </div>

        {/* サポート詳細 */}
        <div className="max-w-7xl mx-auto px-8">
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
            className="text-center text-gray-600 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            企画から実行まで、すべてをお任せください
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.map((item, i) => (
              <CardItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
