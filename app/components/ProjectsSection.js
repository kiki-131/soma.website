"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const images = [
  { src: "/images/project1.jpg", amount: "4,173,860円" },
  { src: "/images/project2.jpg", amount: "4,010,299円" },
  { src: "/images/project3.jpg", amount: "2,905,473円" },
  { src: "/images/project4.jpg", amount: "31,859,645円" },
];

export default function ProjectsSection() {
  const trackRef = useRef(null);
  const [singleWidth, setSingleWidth] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // total scrollWidth contains two copies; single set width is half
    const total = el.scrollWidth;
    setSingleWidth(total / 2);
    // Recompute on resize
    const onResize = () => {
      const t = el.scrollWidth;
      setSingleWidth(t / 2);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section
      id="Projects"
      className="relative bg-gray-200 py-20 px-8 md:px-16 overflow-hidden"
    >
      {/* 上部のProjectsタイトル */}
      <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">Projects</h2>

      <p
        className="text-center text-base text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed"
        style={{ wordBreak: "keep-all" }}
      >
        これまでに100件以上の支援実績を持つ経験豊富なチームが、貴社の海外進出をスムーズにサポートします。
      </p>

      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex"
          animate={singleWidth ? { x: [0, -singleWidth] } : { x: 0 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {images.concat(images).map((item, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 mx-6 rounded-xl overflow-hidden shadow-xl"
              style={{ width: "500px", height: "auto" }}
            >
              <Image
                src={item.src}
                alt={`project-${i}`}
                width={500}
                height={300}
                className="w-full h-auto object-contain"
              />
              {/* 右下の金額ラベル */}
              <div className="absolute bottom-4 right-4 bg-black/60 text-white text-lg md:text-2xl px-3 py-1 rounded-lg">
                {item.amount}
              </div>
            </div>
          ))}
        </motion.div>

        {/* 左右のグラデーション */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-gray-200 to-transparent z-10"></div>
        <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-gray-200 to-transparent z-10"></div>
      </div>
    </section>
  );
}