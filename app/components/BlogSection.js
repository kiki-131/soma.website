"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CharByChar from "./CharByChar";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// フォールバック用プレースホルダー記事
// APIから取得できた場合はそちらが優先されます
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const PLACEHOLDER_POSTS = [
  {
    id: "placeholder-1",
    title: "Kickstarterで成功するための7つのポイント",
    date: null,
    thumbnail: null,
    excerpt: "海外クラウドファンディングで成果を出すために押さえておきたいポイントを解説します。",
  },
  {
    id: "placeholder-2",
    title: "海外進出で失敗しないための市場調査方法",
    date: null,
    thumbnail: null,
    excerpt: "グローバル展開を成功させるには、現地市場への深い理解が欠かせません。",
  },
  {
    id: "placeholder-3",
    title: "Indiegogoとは？Kickstarterとの違いを徹底比較",
    date: null,
    thumbnail: null,
    excerpt: "2大クラウドファンディングプラットフォームの特徴と使い分けを解説します。",
  },
];

function PostCard({ post, index }) {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Link href={`/blog/${post.id}`} className="block">
        {/* サムネイル */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-5 bg-gray-100">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gray-300 opacity-60" />
            </div>
          )}
        </div>

        {/* テキスト */}
        {formattedDate && (
          <p className="text-gray-400 text-xs mb-2">{formattedDate}</p>
        )}
        <h3 className="text-gray-900 font-bold text-lg leading-snug mb-3 group-hover:text-[#0066FF] transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-2 mt-4 text-[#0066FF] text-sm font-semibold">
          <span>読む</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogSection() {
  const [posts, setPosts] = useState(PLACEHOLDER_POSTS);

  // ブログAPIから最新3件を取得（失敗時はプレースホルダーを使用）
  useEffect(() => {
    fetch("/api/posts?limit=3")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setPosts(data.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  return (
    <section id="blog" className="bg-[#F8F9FA] py-28 md:py-40 px-6 md:px-16 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* ヘッダー */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-px bg-[#0066FF]" />
          <span className="text-[#0066FF] text-xs font-bold tracking-[0.35em] uppercase">
            Blog
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <CharByChar
            lines={["Latest", "News"]}
            className="font-extrabold text-gray-900 leading-[0.9]"
            style={{ fontSize: "clamp(56px, 10vw, 112px)" }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 text-sm font-semibold text-gray-900 border-b border-gray-900 pb-1 hover:text-[#0066FF] hover:border-[#0066FF] transition-colors"
            >
              すべての記事を見る
              <span>→</span>
            </Link>
          </motion.div>
        </div>

        {/* カードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
