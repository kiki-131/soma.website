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
      <Tag className={className} style={style}>
        {lines.map((line, li) => (
          <span key={li} className="block overflow-hidden leading-[inherit]">
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
