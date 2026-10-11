"use client";
import { motion } from "framer-motion";

/**
 * 文字を1文字ずつスタッガーで表示する見出しコンポーネント
 *
 * Props:
 *   lines     string[]  — 行ごとの文字列配列
 *   className string    — h2 に付与するクラス
 *   style     object    — h2 に付与するスタイル
 *   tag       string    — 出力タグ (デフォルト: "h2")
 *   delay     number    — 全体の開始ディレイ (秒)
 *   stagger   number    — 1文字あたりのディレイ (秒, デフォルト: 0.045)
 */
export default function CharByChar({
  lines,
  className = "",
  style = {},
  tag = "h2",
  delay = 0,
  stagger = 0.045,
}) {
  const Tag = tag;

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const charVariant = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {/* 各行は overflow-hidden で「下から現れる」演出をしているが、行の高さ(leading)を
          0.88〜1.0 と詰めているため、日本語の「プ」の半濁点などが枠の上下にはみ出して切れる。
          そこで行の枠を py で上下に 0.1em 広げ、同じ量の負マージンで打ち消して、行間は変えない。
          負マージンは隣り合う行どうしで相殺されるため、h2 を縦の flex にして相殺を防いでいる。 */}
      <Tag className={className} style={{ display: "flex", flexDirection: "column", ...style }}>
        {lines.map((line, li) => (
          <span key={li} className="block overflow-hidden leading-[inherit] whitespace-nowrap py-[0.1em] -my-[0.1em]">
            {[...line].map((char, ci) => (
              <motion.span
                key={ci}
                variants={charVariant}
                className="inline-block"
                style={{ whiteSpace: char === " " || char === "\u3000" ? "pre" : "normal" }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}
