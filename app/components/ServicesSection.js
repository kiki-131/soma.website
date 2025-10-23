"use client";
import Image from "next/image";
import { motion } from "framer-motion";
const MotionImage = motion(Image);
import { FaGlobeAsia, FaChartLine, FaHandshake, FaRocket } from "react-icons/fa";

export default function ServiceSection() {
  const services = [
    {
      icon: <FaGlobeAsia size={48} className="text-green-500" />,
      title: "海外進出の重要性",
      description:
        "日本市場の縮小が進む中、海外展開は新たな成長の鍵です。円安を活かし、世界のファンにリーチしましょう。",
    image: "/images/service/スライド1.PNG",
    },
    {
      icon: <FaChartLine size={48} className="text-green-500" />,
      title: "現状の課題",
      description:
        "言語の壁や現地マーケティング、法規制など多くのハードルが存在します。私たちはその障壁を一つずつ取り除きます。",
    image: "/images/service/スライド2.PNG",
    },
    {
      icon: <FaHandshake size={48} className="text-green-500" />,
      title: "支援の流れ",
      description:
        "リサーチ・戦略設計からクラウドファンディング実施、販売支援まで。ワンストップで海外展開をサポートします。",
    image: "/images/service/スライド3.PNG",
    },
    {
      icon: <FaRocket size={48} className="text-green-500" />,
      title: "クラウドファンディング活用",
      description:
        "Kickstarterなどを活用し、商品を先行販売。リスクを抑えつつ、世界市場での反応を確かめられます。",
    image: "/images/service/スライド4.PNG",
    },
  ];

  return (
    <section className="bg-white text-gray-800 py-20 px-8 md:px-16 lg:px-32">
      <h2 className="text-4xl font-bold mb-16 text-center text-gray-800">Services</h2>

      <div className="space-y-20">
        {services.map((item, index) => (
          <motion.div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-12 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            {/* アイコンとテキスト */}
            <div className="flex-1 flex flex-col items-start">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* 写真 */}
            {
              // Use next/image wrapped with framer-motion for animations and optimization
            }
            <MotionImage
              src={item.image}
              alt={item.title}
              width={420}
              height={280}
              className="flex-1 w-full md:w-[420px] h-[280px] object-cover rounded-2xl shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
