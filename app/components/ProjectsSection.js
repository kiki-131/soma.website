"use client";

import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  { src: "/images/project1.jpg", amount: "4,173,860円", name: "プロジェクトA", achievement: "達成率 417%" },
  { src: "/images/project2.jpg", amount: "4,010,299円", name: "プロジェクトB", achievement: "達成率 401%" },
  { src: "/images/project3.jpg", amount: "2,905,473円", name: "プロジェクトC", achievement: "達成率 290%" },
  { src: "/images/project4.jpg", amount: "31,859,645円", name: "プロジェクトD", achievement: "達成率 3185%" },
  { src: "/images/project5.jpg", amount: "3,394,901円", name: "プロジェクトE", achievement: "達成率 1131%" },
  { src: "/images/project6.jpg", amount: "3,636,630円", name: "プロジェクトF", achievement: "達成率 1212%" },
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
    
    const currentX = x.get();
    // direction: -1 (prev/left), 1 (next/right)
    // 左(prev)へ押すと、コンテンツは右へ移動するので x はプラス
    // 右(next)へ押すと、コンテンツは左へ移動するので x はマイナス
    const targetX = currentX + (direction === "left" ? cardWidth : -cardWidth);
    
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
           className="flex w-max cursor-grab active:cursor-grabbing"
           drag="x"
           dragConstraints={{ left: -totalWidth * 2, right: 0 }} // 簡易的なドラッグ対応
           onDragStart={() => setIsHovered(true)}
           onDragEnd={() => setIsHovered(false)}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 mx-2 md:mx-6 rounded-xl overflow-hidden shadow-xl w-[200px] md:w-[500px]"
              role="article"
              aria-label={`${item.name} ${item.achievement} ${item.amount}達成`}
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
            </div>
          ))}
        </motion.div>

        {/* 左右のグラデーション */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-12 md:w-24 bg-gradient-to-r from-gray-200 to-transparent z-10"></div>
        <div className="pointer-events-none absolute top-0 right-0 h-full w-12 md:w-24 bg-gradient-to-l from-gray-200 to-transparent z-10"></div>
      </div>
    </section>
  );
}
