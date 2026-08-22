"use client";
import { motion, useReducedMotion } from "framer-motion";

/**
 * 英語見出し用の単語送りコンポーネント。
 *
 * 共通の CharByChar は1文字ずつ送るため、英語の長い見出しでは
 * 読み始めまでが遅く可読性が落ちる。こちらは単語単位で送る。
 * prefers-reduced-motion 時はアニメーションせず最終状態を即表示する。
 *
 * Props:
 *   lines     string[]  — 行ごとの文字列
 *   className string    — 見出しに付与するクラス
 *   style     object    — 見出しに付与するスタイル
 *   tag       string    — 出力タグ (デフォルト: "h2")
 *   delay     number    — 開始ディレイ (秒)
 *   stagger   number    — 1単語あたりのディレイ (秒)
 */
export default function WordByWord({
  lines,
  className = "",
  style = {},
  tag = "h2",
  delay = 0,
  stagger = 0.055,
}) {
  const Tag = tag;
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <Tag className={className} style={style}>
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
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
          // overflow-hidden は付けない: 英語は行が長く折り返すため、
          // 1行=1spanで隠すと折り返し分が消える
          <span key={li} className="block leading-[inherit]">
            {line.split(" ").map((word, wi) => (
              <motion.span
                key={wi}
                variants={wordVariant}
                className="inline-block"
              >
                {word}
                {wi < line.split(" ").length - 1 ? " " : ""}
              </motion.span>
            ))}
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}
