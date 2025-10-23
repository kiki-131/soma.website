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
            className="w-full overflow-hidden service-image flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            viewport={{ once: true }}
          >
            <Image
              src={src}
              alt={`service-${i + 1}`}
              width={900}
              height={600}
              className="w-full max-w-[900px] h-auto object-cover block"
              style={{ transform: "translateY(-2%)" }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
