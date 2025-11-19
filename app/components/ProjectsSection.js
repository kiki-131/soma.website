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
          animate={singleWidth ? { x: [0, -singleWidth] } : { x: 0 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear", repeatType: "loop" }}
        >
          {images.concat(images).concat(images).map((item, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 mx-2 md:mx-6 rounded-xl overflow-hidden shadow-xl w-[200px] md:w-[500px]"
            >
              <Image
                src={item.src}
                alt={`project-${i}`}
                width={500}
                height={300}
                className="w-full h-auto object-contain"
              />
              {/* 右下の金額ラベル */}
              <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-black/60 text-white text-[8px] md:text-2xl px-1.5 md:px-3 py-0.5 md:py-1 rounded-lg">
                {item.amount}
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