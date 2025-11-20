"use client";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function LikeButton({ postId, initialLikes = 0 }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ローカルストレージでいいね状態を確認
  useState(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    setIsLiked(likedPosts.includes(postId));
  }, [postId]);

  const handleLike = async () => {
    if (isLoading) return;

    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    const alreadyLiked = likedPosts.includes(postId);

    if (alreadyLiked) {
      // いいね取り消し
      setIsLoading(true);
      try {
        const res = await fetch("/api/likes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId, action: "unlike" }),
        });

        if (res.ok) {
          const data = await res.json();
          setLikes(data.likes);
          setIsLiked(false);
          const updated = likedPosts.filter((id) => id !== postId);
          localStorage.setItem("likedPosts", JSON.stringify(updated));
        }
      } catch (error) {
        console.error("Unlike failed:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // いいね追加
      setIsLoading(true);
      try {
        const res = await fetch("/api/likes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId, action: "like" }),
        });

        if (res.ok) {
          const data = await res.json();
          setLikes(data.likes);
          setIsLiked(true);
          likedPosts.push(postId);
          localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
        }
      } catch (error) {
        console.error("Like failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 ${
        isLiked
          ? "bg-red-50 border-red-500 text-red-600"
          : "bg-white border-gray-300 text-gray-600 hover:border-red-400 hover:bg-red-50"
      } ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
    >
      {isLiked ? (
        <FaHeart className="text-xl text-red-500" />
      ) : (
        <FaRegHeart className="text-xl" />
      )}
      <span className="font-semibold">{likes}</span>
    </button>
  );
}
