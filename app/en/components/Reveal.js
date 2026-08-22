"use client";
import { motion, useReducedMotion } from "framer-motion";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// スクロール出現の共通ラッパー。
//
// 以前は whileInView が38箇所に散らばり、そのすべてが
// 「下からふわっと」の同一フェードだった。全部が動くということは
// 何も強調していないのと同じなので、3種類に絞って使う。
//
//   block … セクション導入（ラベル＋見出し＋リードを1つにまとめて1回だけ）
//   seq   … 順序に意味がある列（Processのステップ、要件リスト）。y移動はしない
//   media … 裁ち落とし写真。y移動ではなく scale で寄る
//
// カード群・表の行・FAQ項目・箇条書きには付けないこと。
// prefers-reduced-motion では素通しで最終状態を返す。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const EASE = [0.22, 0.61, 0.36, 1];

const VARIANTS = {
  block: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    duration: 0.55,
    ease: EASE,
  },
  seq: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    duration: 0.45,
    ease: EASE,
  },
  media: {
    initial: { opacity: 0, scale: 1.04 },
    animate: { opacity: 1, scale: 1 },
    duration: 0.9,
    ease: "easeOut",
  },
};

export default function Reveal({
  children,
  variant = "block",
  className = "",
  delay = 0,
  as: Tag = "div",
}) {
  const reduce = useReducedMotion();
  if (reduce) return <Tag className={className}>{children}</Tag>;

  const v = VARIANTS[variant] || VARIANTS.block;
  const MotionTag = motion[Tag] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: v.duration, ease: v.ease, delay }}
    >
      {children}
    </MotionTag>
  );
}
