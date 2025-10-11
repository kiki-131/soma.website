"use client";

import Image from "next/image";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const images = [
  { src: "/images/project1.jpg", amount: "4,173,860円" },
  { src: "/images/project2.jpg", amount: "4,010,299円" },
  { src: "/images/project3.jpg", amount: "2,905,473円" },
  { src: "/images/project4.jpg", amount: "31,859,645円" },
];

export default function ProjectsSection() {
  const controls = useAnimation();

  useEffect(() => {
    const animate = async () => {
      while (true) {
        await controls.start({
          x: "-50%",
          transition: { duration: 100, ease: "linear" },
        });
        controls.set({ x: 0 });
      }
    };
    animate();
  }, [controls]);

  return (
    <section
      id="Projects"
      className="relative bg-gray-200 py-20 px-8 md:px-16 overflow-hidden"
    >
      {/* 上部のProjectsタイトル */}
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Projects</h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex"
          animate={controls}
          style={{ width: `${images.length * 200}%` }}
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