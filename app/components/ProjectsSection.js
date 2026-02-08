"use client";

import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  { src: "/images/project1.jpg", amount: "4,173,860円", name: "プロジェクトA", achievement: "達成率 417%", link: "https://www.kickstarter.com/projects/1428053160/a-cap-for-everyone-and-of-course-for-you-too" },
  { src: "/images/project2.jpg", amount: "4,010,299円", name: "プロジェクトB", achievement: "達成率 401%", link: "https://www.kickstarter.com/projects/pluspocket/plus-pocket-the-ultimate-backpack-companion" },
  { src: "/images/project3.jpg", amount: "2,905,473円", name: "プロジェクトC", achievement: "達成率 290%", link: "https://www.kickstarter.com/projects/knifehole/hole-utility-knife-the-ultimate-tool-for-everyday-use" },
  { src: "/images/project4.jpg", amount: "31,859,645円", name: "プロジェクトD", achievement: "達成率 3185%", link: "https://www.kickstarter.com/projects/obeyme-issyo/new-obey-me-app-coming-soon-support-the-project" },
  { src: "/images/project5.jpg", amount: "3,394,901円", name: "プロジェクトE", achievement: "達成率 1131%", link: "https://www.kickstarter.com/projects/recoverypad/experience-deep-sleep-with-japanese-onsen-recovery-pad" },
  { src: "/images/project6.jpg", amount: "3,636,630円", name: "プロジェクトF", achievement: "達成率 1212%", link: "https://www.kickstarter.com/projects/sungran/cloud-blanket-premium-cordless-warmth-anywhere" },
];

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0); // 1枚の幅(margin含む)
  const [totalWidth, setTotalWidth] = useState(0); // images 1セット分の幅
  const [isHovered, setIsHovered] = useState(false);

  // MotionValueでX座標を管理
  const x = useMotionValue(0);

  // 3セット用意して無限スクロールに見せる
  const items = [...images, ...images, ...images];

  useEffect(() => {
    const updateWidth = () => {
      if (!containerRef.current) return;
      const firstCard = containerRef.current.children[0];
      if (!firstCard) return;

      const style = window.getComputedStyle(firstCard);
      const w = firstCard.offsetWidth;
      const ml = parseFloat(style.marginLeft);
      const mr = parseFloat(style.marginRight);
      const fullCardWidth = w + ml + mr;
      
      setCardWidth(fullCardWidth);
      setTotalWidth(fullCardWidth * images.length);
    };

    updateWidth();
    // 画像読み込み完了などを待つ必要がある場合もあるが、とりあえずresizeで対応
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // アニメーションループ
  useAnimationFrame((t, delta) => {
    if (totalWidth === 0) return;

    // ホバー中は自動スクロール停止
    if (!isHovered) {
      // 60fpsで約1px進むくらいの速度調整 (deltaは前回フレームからの経過時間ms)
      // 小さいほど遅い。0.05 * delta くらいで試す
      const moveBy = -0.05 * delta; 
      
      let newX = x.get() + moveBy;
      
      // ループ判定
      // xが -totalWidth (1セット分) より左に行ったら、0に戻す
      if (newX <= -totalWidth) {
        newX = 0;
      }
      
      x.set(newX);
    }
  });

  // ボタン操作
  const handleSlide = (direction) => {
    if (cardWidth === 0) return;
    
    // スナップして現在のカードインデックスを特定してから次/前へ移動
    const currentX = x.get();
    const containerWidth = containerRef.current?.parentElement?.offsetWidth || window.innerWidth;
    const containerCenter = containerWidth / 2;
    
    // 現在センターに一番近いカードのindex
    const currentIndex = Math.round((containerCenter - currentX - cardWidth / 2) / cardWidth);

    const targetIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;
    const targetX = containerCenter - (targetIndex * cardWidth + cardWidth / 2);

    // アニメーションでスムーズに移動
    animate(x, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
      onUpdate: (v) => {
        // 移動中もループ境界チェック
        if (v <= -totalWidth) {
          x.set(v + totalWidth); // 位置をリセットしてシームレスに
        } else if (v > 0) {
           x.set(v - totalWidth);
        }
      }
    });
  };

  // 指定のインデックスのカードを中央に持ってくる関数
  const snapToCard = (index) => {
    if (!cardWidth || !containerRef.current) return;
    
    const containerWidth = containerRef.current.parentElement?.offsetWidth || window.innerWidth;
    const containerCenter = containerWidth / 2;
    
    // 現在のxとの位置関係を考慮して、ターゲット位置を計算
    // 現在のx値からループ補正を考慮する必要があるが、
    // ここではシンプルに「現在のx周辺でそのindexに相当する位置」を探す
    
    // 現在のxにおける「見かけ上の先頭index」
    const currentX = x.get();
    const currentBaseIndex = Math.floor(-currentX / totalWidth) * images.length; 
    
    // クリックされたindexは 0 ~ items.length-1 (18枚分)
    // しかし moveBy で動いている x はマイナス無限へ行くので、
    // items配列上のindexと、現在のスクロール位置でのindexを合わせる必要がある。
    
    // 簡易実装として、「現在見えているそのカード」を中央にする
    // itemのmap内で呼び出すので、その時の絶対的なindexを使う
    
    const targetX = containerCenter - (index * cardWidth + cardWidth / 2);
    
    animate(x, targetX, {
      type: "spring",
      stiffness: 200,
      damping: 25,
    });
  };

  return (
    <section
      id="Projects"
      className="relative bg-transparent py-8 md:py-20 px-4 md:px-16 overflow-hidden"
    >
      {/* 上部のProjectsタイトル */}
      <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-center text-gray-800">Projects</h2>

      <p
        className="text-center text-sm md:text-base text-gray-600 max-w-4xl mx-auto mb-4 md:mb-8 leading-relaxed px-2"
      >
        これまでに100件以上の支援実績を持つ経験豊富なチームが、貴社の海外進出をスムーズにサポートします。
      </p>

      <div 
        className="relative w-full overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 左矢印ボタン */}
        <button
          onClick={() => handleSlide("left")}
          className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 focus:outline-none"
          aria-label="前のプロジェクト"
        >
          <FaChevronLeft size={20} />
        </button>

        {/* 右矢印ボタン */}
        <button
          onClick={() => handleSlide("right")}
          className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 focus:outline-none"
          aria-label="次のプロジェクト"
        >
          <FaChevronRight size={20} />
        </button>

        <motion.div
           ref={containerRef}
           style={{ x }}
           className="flex w-max"
        >
          {items.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex-shrink-0 mx-2 md:mx-6 rounded-xl overflow-hidden shadow-xl w-[200px] md:w-[500px] block transition-transform duration-300 hover:scale-105 hover:z-10"
              role="article"
              aria-label={`${item.name} ${item.achievement} ${item.amount}達成`}
              draggable={false}
            >
              <Image
                src={item.src}
                alt={`${item.name}の成功事例 ${item.amount}達成`}
                width={500}
                height={300}
                className="w-full h-auto object-contain"
                loading="lazy"
                draggable={false} // 画像ドラッグ防止
              />
              <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 text-right bg-white/90 backdrop-blur-sm px-2 py-1 md:px-3 md:py-2 rounded-lg shadow-lg border border-gray-200">
                <div className="text-black text-[10px] md:text-2xl font-bold mb-0.5 md:mb-1">
                  {item.amount}
                </div>
                <div className="text-gray-700 text-[8px] md:text-lg font-semibold">
                  {item.achievement}
                </div>
              </div>
            </a>
          ))}
        </motion.div>

        {/* 左右のグラデーション */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-12 md:w-24 bg-gradient-to-r from-gray-200 to-transparent z-10"></div>
        <div className="pointer-events-none absolute top-0 right-0 h-full w-12 md:w-24 bg-gradient-to-l from-gray-200 to-transparent z-10"></div>
      </div>
    </section>
  );
}
