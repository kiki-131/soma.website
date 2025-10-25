"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGlobeAsia, FaChartLine, FaHandshake, FaRocket } from "react-icons/fa";

export default function ServiceSection() {
  const images = [
  "/images/service/slide1.png",
  "/images/service/slide2.png",
  "/images/service/slide3.png",
  "/images/service/slide4.png",
  "/images/service/slide5.png",
  "/images/service/slide6.png",
  "/images/service/slide7.png",
  "/images/service/slide8.png",
  "/images/service/slide9.png",
  "/images/service/slide10.png",
  ];

  return (
    <section className="bg-white text-gray-800 py-20 px-8 md:px-16 lg:px-32">
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Services</h2>

      <div className="flex flex-col gap-6">
        {images.map((src, i) => (
          <motion.div
            key={i}
            className="relative w-full overflow-hidden service-image h-64 md:h-[420px] flex justify-center bg-white rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            viewport={{ once: true }}
          >
            <Image
              src={src}
              alt={`service-${i + 1}`}
              fill
              className="object-contain object-center w-full h-full"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
