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

  const CardItem = ({ item, index, isChallenge, showTitlePlate }) => (
    <motion.div
      className="relative flex flex-col items-center text-center p-1 md:p-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* 課題の場合のみ薄い赤の丸角背景 */}
      {isChallenge && (
        <div className="absolute inset-0 bg-red-50 rounded-[32px] opacity-50 -z-10" />
      )}
      <div className="relative w-16 h-16 md:w-48 md:h-48 mb-1 md:mb-4 group">
        <div className="absolute inset-0 rounded-full overflow-hidden border-[1.5px] md:border-4 border-gray-800 group-hover:border-blue-600 transition-colors duration-300">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="192px"
          />
        </div>
        {/* 課題項目の左上にもやもやアイコン（一筆書き竜巻） */}
        {isChallenge && (
          <div className="absolute -top-1 -left-1 md:-top-3 md:-left-3 z-20">
            <svg className="w-6 h-7 md:w-[70px] md:h-[90px]" viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
              <g transform="rotate(-28 60 75)">
                <path
                  d="M 100 28 Q 75 20, 50 24 Q 25 28, 18 34 Q 15 38, 22 44 Q 35 52, 55 52 Q 75 52, 88 48 Q 94 46, 90 54 Q 82 62, 65 64 Q 48 66, 35 62 Q 28 60, 32 68 Q 40 76, 55 78 Q 70 80, 78 76 Q 82 74, 78 82 Q 70 90, 58 92 Q 46 94, 40 90 Q 38 88, 42 94 Q 48 100, 58 102 Q 68 104, 72 100 Q 74 98, 70 104 Q 64 110, 56 110 Q 50 110, 48 106"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
        )}
        {/* ソリューション項目の右上に電球アイコン */}
        {!isChallenge && !showTitlePlate && (
          <div className="absolute -top-0.5 -right-0.5 md:-top-2 md:-right-2 z-20">
            <svg className="w-6 h-7 md:w-[70px] md:h-[80px]" viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">
              {/* 光線 */}
              <line x1="50" y1="4" x2="50" y2="12" stroke="#FDB813" strokeWidth="4" strokeLinecap="round"/>
              <line x1="79" y1="14" x2="72" y2="21" stroke="#FDB813" strokeWidth="4" strokeLinecap="round"/>
              <line x1="21" y1="14" x2="28" y2="21" stroke="#FDB813" strokeWidth="4" strokeLinecap="round"/>
              <line x1="90" y1="38" x2="81" y2="38" stroke="#FDB813" strokeWidth="4" strokeLinecap="round"/>
              <line x1="10" y1="38" x2="19" y2="38" stroke="#FDB813" strokeWidth="4" strokeLinecap="round"/>
              {/* 電球 */}
              <path d="M 50 18 Q 33 18, 33 33 Q 33 48, 41 56 L 41 63 L 59 63 L 59 56 Q 67 48, 67 33 Q 67 18, 50 18" fill="none" stroke="#FDB813" strokeWidth="5"/>
              {/* コイル */}
              <path d="M 42 30 Q 42 34, 45 34 Q 48 34, 48 30 Q 48 26, 52 26 Q 55 26, 55 30 Q 55 34, 58 34" fill="none" stroke="#FDB813" strokeWidth="2.5"/>
              {/* 底部 */}
              <line x1="39" y1="68" x2="61" y2="68" stroke="#FDB813" strokeWidth="5"/>
              <line x1="41" y1="74" x2="59" y2="74" stroke="#FDB813" strokeWidth="5"/>
            </svg>
          </div>
        )}
        {/* タイトルプレート（サポート項目用） */}
        {showTitlePlate && (
          <div className="absolute -top-3 -left-4 md:-top-2 md:-left-4 z-10">
            <div className="relative">
              {/* 黒い台形のプレート */}
              <svg className="w-16 h-6 md:w-[140px] md:h-[50px]" viewBox="0 0 140 50" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0 L130 0 L140 50 L0 50 Z" fill="#1F2937" stroke="#000" strokeWidth="2"/>
              </svg>
              {/* テキスト */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-[7px] md:text-sm px-1 md:px-2">{item.title}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {!showTitlePlate && <h3 className="text-[11px] md:text-xl font-bold mb-0.5 md:mb-2">{item.title}</h3>}
      <p className="text-[10px] md:text-sm text-gray-600 max-w-xs leading-tight">{item.description}</p>
    </motion.div>
  );

  return (
    <>
      {/* パート1: 課題とソリューション (波形背景) */}
      <section className="relative bg-white py-20 px-8 overflow-visible">
        {/* セクション冒頭 */}
        <div className="relative z-10 max-w-4xl mx-auto mb-20">
          <motion.h1
            className="text-2xl md:text-4xl font-extrabold mb-4 text-center text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Services
          </motion.h1>
          <motion.p
            className="text-sm md:text-base text-center text-gray-600 leading-relaxed px-2"
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
          <div className="relative max-w-7xl mx-auto mb-8 md:mb-32">
            <motion.h2
              className="text-xl md:text-3xl font-extrabold mb-2 text-center text-gray-900"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              海外進出を阻む3つの壁
            </motion.h2>
            <motion.p
              className="text-xs md:text-base text-center text-gray-600 mb-8 px-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              多くの日本企業が海外進出で直面する課題
            </motion.p>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-12">
              {challenges.map((item, i) => (
                <CardItem key={i} item={item} index={i} isChallenge={true} />
              ))}
            </div>
            <motion.div
              className="flex justify-center mt-4 md:mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <FaArrowDown className="text-2xl md:text-5xl text-blue-600 animate-bounce" />
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
            
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-base md:text-3xl font-extrabold text-gray-900 border-2 md:border-4 border-black px-2 py-1 md:px-6 md:py-3">
                私たちのソリューション
              </h2>
            </motion.div>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-12">
              {solutions.map((item, i) => (
                <CardItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* パート2: Projects + サポート詳細 */}
      <section className="relative bg-white py-20 overflow-hidden">
        {/* 大きな丸のグラデーション背景 (青→赤) */}
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            width="1800"
            height="1800"
            viewBox="0 0 1800 1800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="blueToRedGradient" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0.25" />
              </radialGradient>
            </defs>
            <circle
              cx="900"
              cy="900"
              r="850"
              fill="url(#blueToRedGradient)"
            />
          </svg>
        </div>

        {/* Projects */}
        <div className="max-w-7xl mx-auto px-8 mb-32 relative z-10">
          <ProjectsSection />
        </div>

        {/* サポート詳細 */}
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div
            className="flex flex-col items-center mb-4 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* 台形のタイトル */}
            <div className="relative mb-2 md:mb-4">
              <svg className="w-64 h-16 md:w-96 md:h-20" viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 0 L375 0 L400 80 L0 80 Z" fill="white" stroke="#1F2937" strokeWidth="3"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-base md:text-3xl font-bold text-gray-800">ワンストップでサポート</h2>
              </div>
            </div>

            {/* 初期費用0円セクション */}
            <motion.div
              className="flex flex-col items-center my-4 md:my-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm md:text-2xl font-bold text-gray-700 mb-1 md:mb-2">初期費用</h3>
              <div className="text-5xl md:text-8xl font-extrabold text-blue-600 mb-2 md:mb-4">
                0円
              </div>
              <div className="text-[9px] md:text-xs text-gray-500 text-center space-y-0.5 md:space-y-1 mb-3 md:mb-6">
                <p>*適用には条件がありますのでご相談ください。</p>
                <p>*広告・プロモーション費用は別料金となります。</p>
              </div>
              <p className="text-xs md:text-lg text-gray-700 font-semibold text-center px-4">
                成果報酬として集まった支援金の<span className="text-blue-600 font-bold">5％～20％</span> を手数料として頂きます
              </p>
            </motion.div>

            <p className="text-[10px] md:text-base text-center text-gray-600 px-2 mt-4 md:mt-6">
              企画から実行まで、すべてをお任せください
            </p>
          </motion.div>
          
          {/* ハニカム構造 (デスクトップ: ダイヤモンド型配置、モバイル: 2列グリッド) */}
          <div className="relative max-w-5xl mx-auto py-4 md:py-12">
            {/* モバイル: 2列×3行のグリッド */}
            <div className="grid grid-cols-2 gap-4 md:hidden">
              {services.map((item, i) => (
                <CardItem key={i} item={item} index={i} showTitlePlate={true} />
              ))}
            </div>
            
            {/* デスクトップ: ダイヤモンド型配置 */}
            <div className="hidden md:block">
              {/* 1段目: 2個 */}
              <div className="relative z-10 flex justify-center gap-16 mb-2">
                <CardItem item={services[0]} index={0} showTitlePlate={true} />
                <CardItem item={services[1]} index={1} showTitlePlate={true} />
              </div>
              
              {/* 2段目: 2個 (左右にずらして配置) */}
              <div className="relative z-10 flex justify-center gap-80 mb-2">
                <CardItem item={services[2]} index={2} showTitlePlate={true} />
                <CardItem item={services[3]} index={3} showTitlePlate={true} />
              </div>
              
              {/* 3段目: 2個 */}
              <div className="relative z-10 flex justify-center gap-16">
                <CardItem item={services[4]} index={4} showTitlePlate={true} />
                <CardItem item={services[5]} index={5} showTitlePlate={true} />
              </div>
            </div>
          </div>

          {/* ステップフロー */}
          <motion.div
            className="max-w-6xl mx-auto mt-12 md:mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* モバイル: 縦並び */}
            <div className="flex flex-col items-center gap-3 md:hidden">
              {/* Step 1 */}
              <div className="relative w-full max-w-xs">
                <svg viewBox="0 0 200 120" className="w-full h-auto">
                  <defs>
                    <linearGradient id="gradient1-mobile" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                  <path d="M 10 20 Q 10 10, 20 10 L 160 10 Q 180 10, 190 30 L 190 90 Q 190 100, 180 100 L 100 100 L 90 110 L 100 100 L 20 100 Q 10 100, 10 90 Z" fill="url(#gradient1-mobile)" />
                  <text x="100" y="40" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">STEP 01</text>
                  <text x="100" y="70" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">相談する</text>
                </svg>
              </div>

              {/* Step 2 */}
              <div className="relative w-full max-w-xs">
                <svg viewBox="0 0 200 120" className="w-full h-auto">
                  <defs>
                    <linearGradient id="gradient2-mobile" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                  <path d="M 10 20 Q 10 10, 20 10 L 160 10 Q 180 10, 190 30 L 190 90 Q 190 100, 180 100 L 100 100 L 90 110 L 100 100 L 20 100 Q 10 100, 10 90 Z" fill="url(#gradient2-mobile)" />
                  <text x="100" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">STEP 02</text>
                  <text x="100" y="65" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">プロジェクト</text>
                  <text x="100" y="85" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">スタート</text>
                </svg>
              </div>

              {/* Step 3 */}
              <div className="relative w-full max-w-xs">
                <svg viewBox="0 0 200 120" className="w-full h-auto">
                  <defs>
                    <linearGradient id="gradient3-mobile" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#1D4ED8" />
                    </linearGradient>
                  </defs>
                  <path d="M 10 20 Q 10 10, 20 10 L 160 10 Q 180 10, 190 30 L 190 90 Q 190 100, 180 100 L 100 100 L 90 110 L 100 100 L 20 100 Q 10 100, 10 90 Z" fill="url(#gradient3-mobile)" />
                  <text x="100" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">STEP 03</text>
                  <text x="100" y="65" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">支援金を</text>
                  <text x="100" y="85" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">手に入れる</text>
                </svg>
              </div>
            </div>

            {/* デスクトップ: 横並び */}
            <div className="hidden md:flex items-center justify-center gap-0">
              {/* Step 1 */}
              <div className="relative">
                <svg viewBox="0 0 280 140" className="w-64 h-auto">
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                  <path d="M 20 20 Q 10 20, 10 30 L 10 110 Q 10 120, 20 120 L 220 120 L 250 70 L 220 20 Z" fill="url(#gradient1)" />
                  <text x="110" y="55" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">STEP 01</text>
                  <text x="110" y="90" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">相談する</text>
                </svg>
              </div>

              {/* Step 2 */}
              <div className="relative -ml-6">
                <svg viewBox="0 0 320 140" className="w-72 h-auto">
                  <defs>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                  <path d="M 50 20 L 20 70 L 50 120 L 260 120 L 290 70 L 260 20 Z" fill="url(#gradient2)" />
                  <text x="155" y="55" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">STEP 02</text>
                  <text x="155" y="90" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">プロジェクトスタート</text>
                </svg>
              </div>

              {/* Step 3 */}
              <div className="relative -ml-6">
                <svg viewBox="0 0 320 140" className="w-72 h-auto">
                  <defs>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#1D4ED8" />
                    </linearGradient>
                  </defs>
                  <path d="M 50 20 L 20 70 L 50 120 L 280 120 Q 290 120, 290 110 L 290 30 Q 290 20, 280 20 Z" fill="url(#gradient3)" />
                  <text x="160" y="55" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">STEP 03</text>
                  <text x="160" y="90" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">支援金を手に入れる</text>
                </svg>
              </div>
            </div>

            <motion.p
              className="text-xs md:text-base text-center text-gray-700 mt-6 md:mt-10 font-semibold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              御社は業務負担・リスクを負うことなく支援金を手に入れることが出来ます。
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
