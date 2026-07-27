"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CharByChar from "../../components/CharByChar";

const teamMembers = [
  {
    src: "/images/naito_front.jpg",
    alt: "CEO Takuma Naito",
    name: "Takuma Naito",
    role: "CEO",
    bio: "Graduated from a university in San Francisco with a degree in Hospitality Management. After working as a manager at a U.S. company, he returned to Japan and founded SOMA LLC, using crowdfunding to connect Japan with the world.",
  },
  {
    src: "/images/inoue_front.png",
    alt: "COO Tatsuya Inoue",
    name: "Tatsuya Inoue",
    role: "COO",
    bio: "After graduating from university, he studied in Cambridge, England. Upon returning to Japan, he worked in sales for a renovation company and a telecommunications company before going independent. He then served as Head of Sales for the overseas crowdfunding business at South of Market LLC and was appointed to the board of directors.",
  },
  {
    src: "/images/takata_front.jpg",
    alt: "CMO Sho Takata",
    name: "Sho Takata",
    role: "CMO",
    bio: "After graduating from Waseda University, he worked in B2C/B2B sales at a major telecommunications company before moving into business strategy and planning management. He earned an MBA from Globis University Graduate School of Management and was appointed to the board of directors as Head of Marketing and Promotion.",
  },
];

function SectionLabel({ text, delay = 0 }) {
  return (
    <motion.div
      className="flex items-center gap-4 mb-8"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="w-10 h-px bg-[#0066FF]" />
      <span className="text-[#0066FF] text-xs font-bold tracking-[0.35em] uppercase">
        {text}
      </span>
    </motion.div>
  );
}

export default function AboutUsSection() {
  return (
    <section
      id="about-us"
      className="bg-white py-28 md:py-40 px-6 md:px-16 overflow-hidden font-sans"
    >
      <div className="max-w-5xl mx-auto">

        {/* ─── Mission ─── */}
        <SectionLabel text="About Us" />

        <div className="mb-14">
          <CharByChar
            lines={["Our", "Mission"]}
            className="font-extrabold text-gray-900 leading-[0.9]"
            style={{ fontSize: "clamp(64px, 11vw, 128px)" }}
          />
        </div>

        <motion.div
          className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500 font-extrabold leading-tight mb-16"
          style={{ fontSize: "clamp(22px, 4vw, 52px)" }}
          initial={{ opacity: 0, scale: 0.93 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Creating a world where anyone
          <br />
          can expand globally with ease.
        </motion.div>

        {/* 会社説明 2カラム */}
        <div className="grid md:grid-cols-2 gap-10 mb-28">
          <motion.p
            className="text-gray-600 leading-relaxed text-base"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            SOMA Inc. was founded on the principle of &quot;Solutions for
            Outbound Market Ambitions&quot; — a name that reflects our
            mission to be the partner that helps companies and brands cross
            borders and succeed in global markets.
            <br />
            <br />
            Expanding into global markets holds enormous opportunity, but it
            also brings a wide range of challenges, from cultural differences
            to regulations and competitive landscapes. SOMA Inc. provides
            strategic, hands-on support to help clients overcome these
            challenges and take on the world with confidence.
          </motion.p>
          <motion.p
            className="text-gray-600 leading-relaxed text-base"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.28 }}
          >
            Starting with overseas crowdfunding as an entry point, we provide
            end-to-end support all the way through Faire wholesale,
            cross-border e-commerce, and local distributor development —
            walking alongside our clients from strategy to execution so they
            can take on global markets with confidence.
            <br />
            <br />
            We provide the Solutions that turn our clients&apos; Ambitions
            into reality, growing together as a long-term partner.
          </motion.p>
        </div>

        {/* ─── 会社概要 ─── */}
        <SectionLabel text="Company" delay={0.05} />

        <motion.div
          className="mb-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Company Profile</h3>
          <div className="border border-gray-100 rounded-2xl overflow-hidden">
            {[
              { label: "Company Name", value: "SOMA Inc." },
              { label: "Address", value: "127-9 Naka-Kibogaoka, Asahi-ku, Yokohama, Kanagawa 241-0825, Japan" },
              { label: "Phone", value: "+81 45-567-6969" },
              {
                label: "Founded",
                value: (
                  <>
                    September 9, 2019
                    <br />
                    <span className="text-gray-400 text-sm">(originally founded as South of Market LLC)</span>
                  </>
                ),
              },
              {
                label: "Employees",
                value: (
                  <>
                    20
                    <br />
                    <span className="text-gray-400 text-sm">(including part-time and contract staff)</span>
                  </>
                ),
              },
            ].map(({ label, value }, i) => (
              <div
                key={label}
                className={`flex flex-col sm:flex-row ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <div className="sm:w-44 px-6 py-4 font-semibold text-gray-700 text-sm bg-blue-50 sm:bg-transparent border-b sm:border-b-0 sm:border-r border-gray-100 flex items-start sm:items-center">
                  {label}
                </div>
                <div className="flex-1 px-6 py-4 text-gray-600 text-sm leading-relaxed">
                  {value}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-[#1a3a5c] rounded-xl px-6 py-3 flex items-center justify-center">
            <p className="text-white text-sm font-medium text-center leading-relaxed">
              Application Submitted — METI &quot;DX Certification&quot; Program
            </p>
          </div>
        </motion.div>

        {/* ─── 事業内容 / 沿革 ─── */}
        <div className="grid md:grid-cols-2 gap-6 mb-28">
          <motion.div
            className="border border-gray-100 rounded-2xl p-8 hover:shadow-md transition-shadow"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-5">Business Activities</h3>
            <ul className="text-gray-600 space-y-3">
              {[
                "Overseas Expansion Consulting",
                "Crowdfunding Campaign Management",
                "E-Commerce Store Management",
                "Digital Marketing",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="border border-gray-100 rounded-2xl p-8 hover:shadow-md transition-shadow"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-5">Company History</h3>
            <ul className="text-gray-600 space-y-3">
              {[
                { year: "2019", text: "Founded as South of Market LLC" },
                { year: "2025", text: "Renamed to SOMA Inc." },
              ].map(({ year, text }) => (
                <li key={year} className="flex items-start gap-3">
                  <span className="text-[#0066FF] font-bold text-sm mt-0.5 flex-shrink-0">
                    {year}
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ─── Team ─── */}
        <SectionLabel text="Our Team" delay={0.05} />

        <motion.p
          className="text-gray-500 text-sm mb-14 max-w-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          A team of experts with global experience,
          <br />
          fully dedicated to supporting your overseas expansion.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.14 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 bg-gray-50 mx-auto" style={{ width: 208, height: 208 }}>
                <Image
                  src={member.src}
                  alt={member.alt}
                  fill
                  className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="flex items-baseline gap-3 mb-1">
                <h4 className="font-bold text-gray-900 text-lg">{member.name}</h4>
                <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">
                  {member.role}
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
