"use client";
import { useScroll, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none drop-shadow-md">
      <svg width="52" height="52" viewBox="0 0 52 52" className="-rotate-90">
        <circle
          cx="26" cy="26" r="20"
          fill="rgba(255,255,255,0.9)"
          stroke="#e2e8f0"
          strokeWidth="3.5"
        />
        <motion.circle
          cx="26" cy="26" r="20"
          fill="none"
          stroke="#0066FF"
          strokeWidth="3.5"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-[#0066FF]" />
      </div>
    </div>
  );
}
