"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGlobeAsia, FaChartLine, FaHandshake, FaRocket } from "react-icons/fa";

export default function ServiceSection() {
  const images = [
    "/images/service/スライド1.PNG",
    "/images/service/スライド2.PNG",
    "/images/service/スライド3.PNG",
    "/images/service/スライド4.PNG",
    "/images/service/スライド5.PNG",
    "/images/service/スライド6.PNG",
    "/images/service/スライド7.PNG",
    "/images/service/スライド8.PNG",
    "/images/service/スライド9.PNG",
    "/images/service/スライド10.PNG",
  ];

  return (
    <section className="bg-white text-gray-800 py-20 px-8 md:px-16 lg:px-32">
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Services</h2>

      <div className="flex flex-col gap-6">
        {images.map((src, i) => (
          <motion.div
            key={i}
            className="w-full overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            viewport={{ once: true }}
          >
            <Image
              src={src}
              alt={`service-${i + 1}`}
              width={1200}
              height={800}
              className="w-full h-auto object-cover block"
              style={{ transform: "translateY(-2%)" }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
