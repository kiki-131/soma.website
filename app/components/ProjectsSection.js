"use client";

import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CharByChar from "./CharByChar";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// コンテンツ定義 — ここを編集してコンテンツを差し替えてください
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PROJECTS = [
  {
    src: "/images/project1.jpg",
    name: "プロジェクトA",
    amount: "4,173,860円",
    achievement: "達成率 417%",
    link: "https://www.kickstarter.com/projects/1428053160/a-cap-for-everyone-and-of-course-for-you-too",
  },
  {
    src: "/images/project2.jpg",
    name: "プロジェクトB",
    amount: "4,010,299円",
    achievement: "達成率 401%",
    link: "https://www.kickstarter.com/projects/pluspocket/plus-pocket-the-ultimate-backpack-companion",
  },
  {
    src: "/images/project3.jpg",
    name: "プロジェクトC",
    amount: "2,905,473円",
    achievement: "達成率 290%",
    link: "https://www.kickstarter.com/projects/knifehole/hole-utility-knife-the-ultimate-tool-for-everyday-use",
  },
  {
    src: "/images/project4.jpg",
    name: "プロジェクトD",
    amount: "31,859,645円",
    achievement: "達成率 3185%",
    link: "https://www.kickstarter.com/projects/obeyme-issyo/new-obey-me-app-coming-soon-support-the-project",
  },
  {
    src: "/images/project5.jpg",
    name: "プロジェクトE",
    amount: "3,394,901円",
    achievement: "達成率 1131%",
    link: "https://www.kickstarter.com/projects/recoverypad/experience-deep-sleep-with-japanese-onsen-recovery-pad",
  },
  {
    src: "/images/project6.jpg",
    name: "プロジェクトF",
    amount: "3,636,630円",
    achievement: "達成率 1212%",
    link: "https://www.kickstarter.com/projects/sungran/cloud-blanket-premium-cordless-warmth-anywhere",
  },
];

const STATS = [
  { value: "100+", label: "支援実績" },
  { value: "10", label: "対応プラットフォーム" },
  { value: "¥0", label: "初期費用" },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [totalWidth, setTotalWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const items = [...PROJECTS, ...PROJECTS, ...PROJECTS];

  useEffect(() => {
    const updateWidth = () => {
      if (!containerRef.current) return;
      const firstCard = containerRef.current.children[0];
      if (!firstCard) return;
      const style = window.getComputedStyle(firstCard);
      const w = firstCard.offsetWidth;
      const ml = parseFloat(style.marginLeft);
      const mr = parseFloat(style.marginRight);
      const full = w + ml + mr;
      setCardWidth(full);
      setTotalWidth(full * PROJECTS.length);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useAnimationFrame((_, delta) => {
    if (totalWidth === 0 || isHovered) return;
    let newX = x.get() - 0.045 * delta;
    if (newX <= -totalWidth) newX = 0;
    x.set(newX);
  });

  const handleSlide = (direction) => {
    if (cardWidth === 0) return;
    const currentX = x.get();
    const containerWidth =
      containerRef.current?.parentElement?.offsetWidth || window.innerWidth;
    const center = containerWidth / 2;
    const currentIndex = Math.round(
      (center - currentX - cardWidth / 2) / cardWidth
    );
    const targetIndex =
      direction === "left" ? currentIndex - 1 : currentIndex + 1;
    const targetX = center - (targetIndex * cardWidth + cardWidth / 2);
    animate(x, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
      onUpdate: (v) => {
        if (v <= -totalWidth) x.set(v + totalWidth);
        else if (v > 0) x.set(v - totalWidth);
      },
    });
  };

  return (
    <section
      id="Projects"
      className="bg-[#111827] py-24 md:py-36 overflow-hidden"
    >
      {/* ヘッダー */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 mb-16">
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-px bg-[#0066FF]" />
          <span className="text-[#0066FF] text-xs font-bold tracking-[0.35em] uppercase">
            Projects
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <CharByChar
            lines={["Our", "Work"]}
            className="font-extrabold text-white leading-[0.9]"
            style={{ fontSize: "clamp(56px, 10vw, 112px)" }}
          />

          {/* 統計 */}
          <motion.div
            className="flex gap-10 md:gap-12 mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-white font-black text-3xl md:text-4xl leading-none mb-1">
                  {value}
                </div>
                <div className="text-white/40 text-xs">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.p
          className="text-white/40 text-base mt-8 max-w-xl leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          100件以上の支援実績を持つ経験豊富なチームが、
          貴社の海外進出をスムーズにサポートします。
        </motion.p>
      </div>

      {/* カルーセル */}
      <div
        className="relative w-full overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 矢印ボタン */}
        <button
          onClick={() => handleSlide("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          aria-label="前のプロジェクト"
        >
          <FaChevronLeft size={18} />
        </button>
        <button
          onClick={() => handleSlide("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          aria-label="次のプロジェクト"
        >
          <FaChevronRight size={18} />
        </button>

        <motion.div ref={containerRef} style={{ x }} className="flex w-max">
          {items.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex-shrink-0 mx-3 md:mx-4 rounded-2xl overflow-hidden w-[240px] md:w-[440px] block group/card"
              draggable={false}
              aria-label={`${item.name} ${item.achievement}`}
            >
              {/* 画像 */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                  loading="lazy"
                  draggable={false}
                />
                {/* ダークオーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>

              {/* テキストオーバーレイ */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-white font-bold text-lg md:text-2xl">
                      {item.amount}
                    </p>
                  </div>
                  <div className="bg-[#0066FF] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {item.achievement}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </motion.div>

        {/* 左右グラデーション */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-16 md:w-28 bg-gradient-to-r from-[#111827] to-transparent z-10" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-16 md:w-28 bg-gradient-to-l from-[#111827] to-transparent z-10" />
      </div>
    </section>
  );
}
