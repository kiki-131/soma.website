"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const images = [
  { src: "/images/project1.jpg", amount: "4,173,860円", name: "プロジェクトA", achievement: "達成率 417%" },
  { src: "/images/project2.jpg", amount: "4,010,299円", name: "プロジェクトB", achievement: "達成率 401%" },
  { src: "/images/project3.jpg", amount: "2,905,473円", name: "プロジェクトC", achievement: "達成率 290%" },
  { src: "/images/project4.jpg", amount: "31,859,645円", name: "プロジェクトD", achievement: "達成率 3185%" },
  { src: "/images/project5.jpg", amount: "3,394,901円", name: "プロジェクトE", achievement: "達成率 1131%" },
  { src: "/images/project6.jpg", amount: "3,636,630円", name: "プロジェクトF", achievement: "達成率 1212%" },
];

export default function ProjectsSection() {
  const trackRef = useRef(null);
  const [singleWidth, setSingleWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // Calculate single set width (first 4 images)
    const children = el.children;
    if (children.length === 0) return;
    
    let width = 0;
    // Sum up width of first 4 images (one complete set)
    for (let i = 0; i < Math.min(4, children.length); i++) {
      width += children[i].offsetWidth;
      // Add margin (mx-2 = 8px on each side for mobile, mx-6 = 24px for desktop)
      const style = window.getComputedStyle(children[i]);
      width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }
    
    setSingleWidth(width);
    
    // Recompute on resize
    const onResize = () => {
      let w = 0;
      for (let i = 0; i < Math.min(4, children.length); i++) {
        w += children[i].offsetWidth;
        const style = window.getComputedStyle(children[i]);
        w += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      }
      setSingleWidth(w);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex"
          animate={singleWidth && !isPaused ? { x: [0, -singleWidth] } : { x: isPaused ? undefined : 0 }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear", repeatType: "loop" }}
        >
          {images.concat(images).concat(images).map((item, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 mx-2 md:mx-6 rounded-xl overflow-hidden shadow-xl w-[200px] md:w-[500px] group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
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
              />
              {/* プロジェクト情報（金額・達成率）- 右下に黒色で表示 */}
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